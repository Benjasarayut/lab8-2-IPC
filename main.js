const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  console.log('🖥️ [MAIN] กำลังสร้าง window...');
  
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,      // ✅ ปิดเพื่อความปลอดภัย
      contextIsolation: true,      // ✅ เปิดเพื่อความปลอดภัย  
      preload: path.join(__dirname, 'preload.js')  // ✅ ใช้ preload
    }
  });

  mainWindow.loadFile('index.html');
  
  // เปิด DevTools เพื่อดู console
  mainWindow.webContents.openDevTools();
  
  console.log('✅ [MAIN] สร้าง window สำเร็จ');
}

app.whenReady().then(() => {
  console.log('⚡ [MAIN] Electron พร้อมทำงาน');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// เพิ่มส่วนนี้ใน main.js หลังจาก createWindow()

// ===== IPC HANDLERS =====

// 📨 Handler สำหรับรับข้อความ
ipcMain.handle('send-message', (event, message) => {
  console.log('📨 [MAIN] ได้รับข้อความ:', message);
  
  // ประมวลผลข้อความ
  const response = {
    original: message,
    reply: `Server ได้รับ: "${message}"`,
    timestamp: new Date().toISOString(),
    status: 'success'
  };
  
  console.log('📤 [MAIN] ส่งกลับ:', response);
  return response;
});

// 👋 Handler สำหรับคำทักทาย
ipcMain.handle('say-hello', (event, name) => {
  console.log('👋 [MAIN] ทักทายกับ:', name);
  
  const greetings = [
    `สวัสดี ${name}! ยินดีต้อนรับสู่ Agent Wallboard`,
    `หวัดดี ${name}! วันนี้พร้อมทำงานแล้วหรือยัง?`,
    `Hello ${name}! มีความสุขในการทำงานนะ`,
  ];
  
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  return {
    greeting: randomGreeting,
    name: name,
    time: new Date().toLocaleString('th-TH'),
    agentCount: 3  // จำลองจำนวน agents ที่ online
  };
});

console.log('🔧 [MAIN] IPC Handlers ตั้งค่าเสร็จแล้ว');