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
    }

}