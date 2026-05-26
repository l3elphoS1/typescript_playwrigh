import type {
  Reporter, TestCase, TestResult, FullResult
} from '@playwright/test/reporter';

// Helper สร้าง ADF format สำหรับ Jira v3
function buildADF(title: string, errorMessage: string, errorStack: string, isComment = false) {
  const header = isComment
    ? `❌ Test failed again: ${title}`
    : `🐛 Test Failure: ${title}`;

  return {
    type: "doc",
    version: 1,
    content: [
      // Header
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: header }]
      },
      // Info table
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Environment: ", marks: [{ type: "strong" }] },
          { type: "text", text: "Playwright Automation" },
          { type: "hardBreak" },
          { type: "text", text: "Severity: ", marks: [{ type: "strong" }] },
          { type: "text", text: "Medium" }
        ]
      },
      // Error message header
      {
        type: "paragraph",
        content: [{ type: "text", text: "Error Message:", marks: [{ type: "strong" }] }]
      },
      // Error code block
      {
        type: "codeBlock",
        attrs: { language: "text" },
        content: [{ type: "text", text: errorMessage }]
      },
      // Stack trace header
      {
        type: "paragraph",
        content: [{ type: "text", text: "Stack Trace:", marks: [{ type: "strong" }] }]
      },
      // Stack code block
      {
        type: "codeBlock",
        attrs: { language: "text" },
        content: [{ type: "text", text: errorStack || "No stack trace available" }]
      }
    ]
  };
}

class JiraReporter implements Reporter {
  // เก็บ promise ทั้งหมดไว้รอใน onEnd
  private pendingRequests: Promise<void>[] = [];

  private getConfig() {
    const host = process.env.JIRA_HOST?.replace(/\/$/, '');
    const email = process.env.JIRA_EMAIL;
    const token = process.env.JIRA_API_TOKEN;
    const projectKey = process.env.JIRA_PROJECT_KEY;

    if (!host || !email || !token || !projectKey) {
      return null;
    }

    const auth = Buffer.from(`${email}:${token}`).toString('base64');
    return {
      host,
      projectKey,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
  }

  private async handleFailedTest(test: TestCase, result: TestResult): Promise<void> {
    const config = this.getConfig();
    if (!config) {
      console.warn('[Jira] Missing credentials in .env — skipping');
      return;
    }

    const { host, projectKey, headers } = config;
    const errorMessage = result.error?.message ?? 'Unknown error';
    const errorStack   = result.error?.stack   ?? '';
    const BASE = `${host}/rest/api/3`;

    try {
      // 1. ค้นหา ticket เดิมที่ยังไม่ Done
      const jql = `project = "${projectKey}" AND summary ~ "\\"${test.title}\\"" AND statusCategory != Done`;
      const searchRes = await fetch(`${BASE}/search/jql`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ jql, maxResults: 1, fields: ['id', 'key', 'summary'] })
      });

      if (!searchRes.ok) {
        console.error('[Jira] Search failed:', await searchRes.json());
        return;
      }

      const { issues = [] } = await searchRes.json();

      if (issues.length > 0) {
        // 2. มี ticket อยู่แล้ว → เพิ่ม comment
        const { id, key } = issues[0];
        const commentRes = await fetch(`${BASE}/issue/${id}/comment`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            body: buildADF(test.title, errorMessage, errorStack, true)
          })
        });

        if (commentRes.ok) {
          console.log(`[Jira] ✅ Added comment to ${key} — "${test.title}"`);
        } else {
          console.error(`[Jira] ❌ Failed to comment on ${key}:`, await commentRes.json());
        }

      } else {
        // 3. ไม่มี ticket → สร้างใหม่
        const createRes = await fetch(`${BASE}/issue`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            fields: {
              project:     { key: projectKey },
              summary:     `[Test Failure] ${test.title}`,
              description: buildADF(test.title, errorMessage, errorStack),
              issuetype:   { name: 'Bug' }
            }
          })
        });

        const createData = await createRes.json();
        if (createRes.ok) {
          console.log(`[Jira] ✅ Created ${createData.key} — "${test.title}"`);
        } else {
          console.error('[Jira] ❌ Failed to create ticket:', createData);
        }
      }

    } catch (err) {
      console.error('[Jira] Exception:', err);
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      // เก็บ promise ไว้ก่อน อย่า await ตรงนี้ เพราะ onTestEnd ไม่รองรับ async จริงๆ
      this.pendingRequests.push(this.handleFailedTest(test, result));
    }
  }

  async onEnd(_result: FullResult) {
    // รอทุก Jira request เสร็จก่อนที่ Playwright จะปิด
    await Promise.allSettled(this.pendingRequests);
    console.log('[Jira] All requests completed.');
  }
}

export default JiraReporter;