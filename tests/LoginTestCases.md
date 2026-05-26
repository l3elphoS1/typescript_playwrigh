# Login Test Cases

| TC-ID | Title | Precondition | Steps | Expected Result | Priority | Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-LOGIN-001** | Login สำเร็จด้วย credentials ถูกต้อง | มี account Furina / password ถูกต้อง (`Furina` / `PaimonNotEmergencyFood`) | 1. เปิดหน้า Form<br>2. กรอก Username<br>3. กรอก Password<br>4. กด Submit | เข้าสู่ระบบสำเร็จ แสดง welcome message | High | Positive |
| **TC-LOGIN-002** | Login ไม่สำเร็จเมื่อ password ผิด | มี account Furina แต่ใช้ password ผิด | 1. เปิดหน้า Form<br>2. กรอก Username<br>3. กรอก Password ผิด<br>4. กด Submit | แสดง error message แจ้งว่า password ผิด | High | Negative |
| **TC-LOGIN-003** | Login ไม่สำเร็จเมื่อปล่อยว่างทั้งคู่ | ไม่มี precondition | 1. เปิดหน้า Form<br>2. ปล่อยว่าง Username และ Password<br>3. กด Submit | แสดง error message แจ้งว่า username ไม่ถูกต้อง | High | Negative |
| **TC-LOGIN-004** | Login สำเร็จแม้ username มี space นำหน้า | มี account Furina / password ถูกต้อง | 1. เปิดหน้า Form<br>2. กรอก Username โดยมี space ด้านหน้า/หลัง<br>3. กรอก Password<br>4. กด Submit | เข้าสู่ระบบสำเร็จ (ระบบมีการ trim space ออก) | Medium | Edge case |
| **TC-LOGIN-005** | กด Enter แทน Submit button | มี account Furina / password ถูกต้อง | 1. เปิดหน้า Form<br>2. กรอก Username<br>3. กรอก Password<br>4. กด Enter ที่ช่อง Password | เข้าสู่ระบบสำเร็จ ทำงานได้เหมือนปุ่ม Submit | Medium | Edge case |
