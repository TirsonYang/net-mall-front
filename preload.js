// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const os = require('os'); // 引入 Node.js 的 os 模块

// --- 核心函数：获取本机局域网 IP ---
function getLocalIP() {
    try {
        const networkInterfaces = os.networkInterfaces();

        // 遍历所有网络接口
        for (const interfaceName in networkInterfaces) {
            const interfaces = networkInterfaces[interfaceName];
            for (const iface of interfaces) {
                // 只找 IPv4 地址，并且排除内部回环地址 (127.0.0.1)
                if (iface.family === 'IPv4' && !iface.internal) {
                    // 找到了就返回第一个符合条件的 IP
                    return iface.address;
                }
            }
        }
    } catch (error) {
        console.error('获取IP地址失败:', error);
    }
    return '127.0.0.1'; // 如果没找到，返回一个默认值，避免程序报错
}
// --- 函数结束 ---

// --- 通过 contextBridge 安全暴露 API 给渲染进程 (你的Vue应用) ---
contextBridge.exposeInMainWorld('electronAPI', {
    // 暴露一个名为 'getLocalIP' 的方法
    getLocalIP: () => getLocalIP(),

    // 发送 IPC 消息到主进程（仅允许特定通道）
    send: (channel, data) => {
        // 允许发送的通道白名单
        const validSendChannels = ['open-payment-window'];
        if (validSendChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },

    // 监听来自主进程的 IPC 消息（仅允许特定通道）
    on: (channel, func) => {
        // 允许接收的通道白名单
        const validReceiveChannels = ['payment-completed', 'payment-window-closed'];
        if (validReceiveChannels.includes(channel)) {
            // 订阅消息，当收到消息时调用传入的函数
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});