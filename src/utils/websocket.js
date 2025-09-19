import SockJS from 'sockjs-client'
import Stomp from 'stompjs'


export default {
    stompClient: null,
    connected: false,


    connect(onMessageReceived){
        const userRole = Number(localStorage.getItem('userRole'));
        if (userRole!==3) {
            console.log("开始执行WebSocket连接逻辑");
            const socket = new SockJS('http://localhost:17818' + '/ws');
            this.stompClient=Stomp.over(socket);
            this.stompClient.connect({}, () => {
                    this.connected = true;
                    console.log('WebSocket连接成功');
                    this.stompClient.subscribe('/topic/send', (message) => {
                        if (message.body) {
                            const orderMessage = JSON.parse(message.body);
                            onMessageReceived(orderMessage);
                        }
                    })
                }, (err => {
                    this.connected = false;
                    console.error('WebSocket连接失败', err);
                    setTimeout(() => {
                        this.connect(onMessageReceived)
                    }, 3000)
                })
            )
        }
    },

    disconnect(){
        if (this.stompClient && this.connected){
            this.stompClient.disconnect();
            this.connected=false;
            console.log("WebSocket已断开");
        }
    },

    // 1. 请求桌面通知授权（在mounted中执行）
    requestNotificationPermission() {
        // 检查浏览器是否支持Notification
        if (!('Notification' in window)) {
            this.$message.warning('您的浏览器不支持桌面通知');
            return;
        }
        // 请求授权
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.$message.success('桌面通知已启用，最小化也能收到提醒');
                } else {
                    this.$message.warning('请允许桌面通知，否则无法实时提醒');
                }
            });
        }
    },

    showDesktopNotification(orderMessage) {
        // 检查是否已授权
        if (Notification.permission !== 'granted') return;

        // 创建桌面通知
        const notification = new Notification('新订单提醒', {
            body: '来单了',
            icon: '/static/icons/order-icon.png', // 通知图标(设为logo)
            sound: '/assets/audio/orderAudio.mp3' // 通知伴随的提示音
        });

        // 点击通知时，跳转到管理端订单页面
        notification.onclick = () => {
            window.focus(); // 激活浏览器窗口
            this.$router.push('/order/detail/' + orderMessage.orderId); // 跳转到订单详情
            notification.close(); // 关闭通知
        };

        // 3秒后自动关闭通知
        setTimeout(() => notification.close(), 3000);
    }

}