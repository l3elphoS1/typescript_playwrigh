# 🎭 Playwright Learning Journey

## 📖 About This Repository
This repository contains my personal learning journey and experiments with **Playwright** (using TypeScript). The goal of this project is to build a strong foundation in modern web automation, testing best practices, and CI/CD integrations.

## 🚀 Learning Roadmap

Here is the path I am following to master Playwright:

### 1. Basics & Fundamentals (In Progress)
- [x] Setting up Playwright with TypeScript.
- [x] Basic element locators (`getByRole`, `getByText`, etc.).
- [x] Writing simple assertions (`toBeVisible()`, etc.).
- [ ] Understanding Auto-waiting and Action execution.

### 2. Intermediate Concepts
- [ ] Handling multiple pages and pop-ups.
- [ ] Interacting with iframes & Shadow DOM.
- [ ] Taking screenshots & recording videos.
- [ ] Testing upload/download mechanics.

### 3. Advanced Automation
- [ ] Network interception (Mocking and stubbing API calls).
- [ ] Using the Playwright Page Object Model (POM) for clean code architecture.
- [ ] Handling authentication (Saving state for faster tests).
- [ ] Emulating devices and geolocation.

### 4. Integration & CI/CD
- [ ] Running tests in GitHub Actions.
- [ ] Generating static HTML reports for test runs.
- [ ] Running parallel testing efficiently.

## 📁 Recommended Folder Structure
As the project grows, I'm organizing files as follows:

```text
├── tests/
│   ├── basics/         # Basic locator and interaction tests
│   ├── api/            # API related automation
│   ├── advanced/       # Iframes, Shadow DOM, file handling
│   └── e2e/            # Full End-to-End user journeys
├── utils/              # Custom helper functions
├── pages/              # Page Object Model (POM) classes
├── playwright.config.ts # Global configurations
└── package.json        
```

## 💻 Running the Tests
To run all tests locally in headless mode:
```bash
npx playwright test
```

To run with UI mode (highly recommended for debugging):
```bash
npx playwright test --ui
```

---
*Created as part of my continuous learning journey. Feel free to explore the code!*
