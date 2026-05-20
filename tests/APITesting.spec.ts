import { test, expect } from '@playwright/test';

// ใช้ test.describe.serial เพื่อให้รันเรียงตามลำดับ (เพราะบางเทสต์ต้องใช้ ID จากเทสต์ก่อนหน้า)
test.describe.serial('API Testing CRUD Flow with MockAPI', () => {
    const apiBaseUrl = 'https://6a05889baa826ca75c0a10c8.mockapi.io';
    
    // ตัวแปรสำหรับเก็บ ID ของ User ที่สร้างใหม่ เพื่อนำไปใช้อัปเดตและลบ
    let createdUserId: string;

    test('1. GET: Fetch all users (Read)', async ({ request }) => {
        // ยิง Request แบบ GET ไปที่ Endpoint
        const response = await request.get(`${apiBaseUrl}/users`);
        
        // ตรวจสอบ Status Code (ควรจะได้ 200 OK)
        expect(response.ok()).toBeTruthy(); // ok() จะเช็คว่า Status อยู่ในช่วง 200-299 หรือไม่
        expect(response.status()).toBe(200);
        
        // ตรวจสอบว่า Data ที่ได้กลับมาเป็น Array (เพราะเราดึง list users ทั้งหมด)
        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
        
        console.log(`Fetched ${users.length} users from the API.`);
    });

    test('2. POST: Create a new user (Create)', async ({ request }) => {
        // ข้อมูลที่เราต้องการสร้างใหม่
        const newUser = {
            name: "QA Automator Portfolio",
            avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1.jpg",
            role: "SDET" // เพิ่มฟิลด์สมมติ
        };

        // ยิง Request แบบ POST พร้อมแนบข้อมูล (Payload)
        const response = await request.post(`${apiBaseUrl}/users`, {
            data: newUser
        });
        
        // ตรวจสอบ Status Code (ควรจะได้ 201 Created)
        expect(response.status()).toBe(201);
        
        // ตรวจสอบว่า Response สะท้อนข้อมูลที่เราส่งไปถูกต้อง และมี ID สร้างขึ้นมาใหม่
        const responseBody = await response.json();
        expect(responseBody.name).toBe(newUser.name);
        expect(responseBody).toHaveProperty('id'); // ต้องมีคอลัมน์ id โผล่มา
        
        // เก็บ ID ไว้ใช้ในเทสต์ถัดไป
        createdUserId = responseBody.id;
        console.log(`Successfully created new user with ID: ${createdUserId}`);
    });

    test('3. GET: Fetch specific user by ID (Read 1 item)', async ({ request }) => {
        // ต้องมั่นใจว่ามี ID จากข้อที่แล้วก่อน
        expect(createdUserId).toBeDefined();

        // นำ ID มาต่อท้าย URL
        const response = await request.get(`${apiBaseUrl}/users/${createdUserId}`);
        
        expect(response.status()).toBe(200);
        const user = await response.json();
        
        // ตรวจสอบว่าดึงข้อมูลได้ถูกคน
        expect(user.id).toBe(createdUserId);
        expect(user.name).toBe("QA Automator Portfolio");
    });

    test('4. PUT: Update user data (Update)', async ({ request }) => {
        expect(createdUserId).toBeDefined();

        // ข้อมูลที่ต้องการอัปเดต
        const updatedData = {
            name: "Senior QA Automator",
            role: "Test Architect"
        };

        const response = await request.put(`${apiBaseUrl}/users/${createdUserId}`, {
            data: updatedData
        });
        
        expect(response.status()).toBe(200);
        const user = await response.json();
        
        // ตรวจสอบว่าข้อมูลเปลี่ยนไปตามที่ตั้งใจแล้ว
        expect(user.name).toBe(updatedData.name);
        expect(user.role).toBe(updatedData.role);
    });

    test('5. DELETE: Remove the user (Delete)', async ({ request }) => {
        expect(createdUserId).toBeDefined();

        // ยิง Request สั่งลบ
        const response = await request.delete(`${apiBaseUrl}/users/${createdUserId}`);
        
        // MockAPI จะตอบกลับ 200 เมื่อลบสำเร็จ
        expect(response.status()).toBe(200); 
        
        // --- Verification Step (ขั้นสุดของการเทสต์คือการตรวจสอบซ้ำว่ามันลบไปจริงๆ) ---
        const fetchDeleted = await request.get(`${apiBaseUrl}/users/${createdUserId}`);
        
        // ควรจะได้ 404 Not Found เพราะโดนลบไปแล้ว
        expect(fetchDeleted.status()).toBe(404); 
        console.log(`Verified user ${createdUserId} was completely deleted.`);
    });
});
