'use strict'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path';
const isDevelopment = process.env.NODE_ENV !== 'production'
import { app, protocol, BrowserWindow, nativeImage, Menu, ipcMain } from 'electron'  // 添加 ipcMain


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {

  const appIcon = nativeImage.createFromPath(path.join(__dirname, 'assets/image/logo.ico'))
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: appIcon,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, '../preload.js'),
    }
  })
  Menu.setApplicationMenu(null);

  if(process.platform==='win32'){
    app.setAppUserModelId('com.example.app')
  }

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

  // 在这里注册 ipcMain 监听器
  ipcMain.on('open-payment-window', (event, htmlContent) => {
    // 获取当前聚焦的窗口（作为父窗口）
    const parentWindow = BrowserWindow.getFocusedWindow();

    // 创建支付窗口
    const paymentWindow = new BrowserWindow({
      width: 800,
      height: 600,
      parent: parentWindow,          // 设为父窗口，使支付窗口始终在父窗口之上
      modal: false,                  // 非模态，允许用户同时操作父窗口
      webPreferences: {
        nodeIntegration: false,      // 支付页面不需要 node 能力，保持安全
        contextIsolation: true,
        // 如果不需要预加载，可以省略 preload
      }
    });

    // 加载支付宝返回的 HTML 表单（使用 data URI）
    paymentWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);

    // 可选：监听窗口内导航，当跳转到 return_url 时表示支付完成
    paymentWindow.webContents.on('did-navigate', (event, url) => {
      // 判断是否跳转到了你的 return_url（例如包含 /user/getOrder）
      if (url.includes('/user/getOrder')) {
        // 关闭支付窗口
        paymentWindow.close();
        // 通知渲染进程支付已完成（可选）
        event.sender.send('payment-completed'); // 注意：此处的 event.sender 是 paymentWindow 的 webContents，不能直接通知主窗口
        // 改为通知父窗口
        if (parentWindow) {
          parentWindow.webContents.send('payment-completed');
        }
      }
    });

    // 当支付窗口关闭时，也可以清理
    paymentWindow.on('closed', () => {
      // 可选：通知父窗口支付窗口已关闭
      if (parentWindow) {
        parentWindow.webContents.send('payment-window-closed');
      }
    });
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
