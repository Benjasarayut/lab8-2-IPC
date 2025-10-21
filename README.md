สรุป Lab 8.2: IPC Communication
🎯 จุดประสงค์

เรียนรู้การสื่อสารระหว่าง Main Process (ฝั่งระบบ) และ Renderer Process (ฝั่ง UI) ใน Electron.js ผ่าน IPC (Inter-Process Communication) เพื่อใช้ในระบบ Agent Wallboard

🔑 แนวคิดหลัก

Main Process → ควบคุม window, จัดการ logic, อ่าน/เขียนไฟล์

Renderer Process → แสดง UI และรับ input จากผู้ใช้

IPC Communication → ช่องทางส่งข้อมูลระหว่างสองฝั่งอย่างปลอดภัย

📂 ใช้ไฟล์ preload.js เป็นตัวกลาง (contextBridge) เพื่อเชื่อม ipcRenderer ↔ ipcMain

⚙️ โครงสร้างโปรเจกต์
```
lab8-2-ipc/
├── main.js
├── preload.js
├── index.html
├── package.json
└── agent-data.json
```
📘 ขั้นตอนสำคัญ

ตั้งค่า project และ Electron
```
npm init -y

npm install electron --save-dev
```
main.js

สร้าง BrowserWindow

ปิด nodeIntegration และเปิด contextIsolation

ใช้ ipcMain.handle() รับข้อมูลจาก Renderer

preload.js

ใช้ contextBridge.exposeInMainWorld()

เปิดเผยฟังก์ชัน sendMessage, sayHello, getAgents, changeAgentStatus

index.html

มีปุ่มส่งข้อความ, ทักทาย, โหลดข้อมูล agent, เปลี่ยนสถานะ

ใช้ window.electronAPI เรียกฟังก์ชันจาก preload

agent-data.json

เก็บข้อมูล agent จำลองและสถิติ

🧪 การทดสอบ
```
npm start
```

กดปุ่ม "ส่งข้อความ" → ข้อมูลส่งไป Main แล้วตอบกลับ

กด "เข้าสู่ระบบ" → ระบบทักทาย

กด "โหลดข้อมูล Agents" → แสดง agent ทั้งหมด

กด "เปลี่ยนสถานะ" → อัปเดตในไฟล์ JSON

🧭 Assignment

สร้างระบบ Login Agent (ID + Password)

แสดง Dashboard ส่วนตัว

เพิ่ม Notification / Alert เมื่อมี agent เปลี่ยนสถานะ

🏆 สิ่งที่ได้เรียนรู้

✅ ใช้ IPC ในการเชื่อม Renderer ↔ Main

✅ ใช้ preload.js เพื่อความปลอดภัย

✅ อ่าน/เขียนไฟล์ JSON ผ่าน IPC

✅ เข้าใจ flow ของ Electron App

✅ วางรากฐานสำหรับระบบ Agent Wallboard
