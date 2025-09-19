<script>
import AdminTopHeader from "@/components/admin/TopHeader.vue";
import BossTopHeader from "@/components/boss/TopHeader.vue";
import UserTopHeader from '@/components/user/TopHeader.vue'
import websocket from "@/utils/websocket";

export default {
    name: 'LayOut',
    components: {
        AdminTopHeader: AdminTopHeader,
        BossTopHeader: BossTopHeader,
        UserTopHeader: UserTopHeader
    },
    data(){
        return {
            orderNotification: []
        }
    },
    computed:{
        headerComponent(){
            const userRole = localStorage.getItem("userRole");
            if (Number(userRole)===1){
                return "BossTopHeader";
            }else if (Number(userRole)===2){
                return "AdminTopHeader";
            }else{
                return "UserTopHeader";
            }
        }
    },
    mounted() {
        console.log("组件挂载，准备连接websocket")
        websocket.connect(message=>{
            this.handleNewOrder(message);
        })
        // 1. 初始化WebSocket连接（管理端登录后）
        this.initWebSocket();

        // 2. 请求桌面通知授权（页面加载时触发）
        this.requestNotificationPermission();
    },
    beforeDestroy() {
        websocket.disconnect();
    },
    methods:{

        // 初始化WebSocket连接
        initWebSocket() {
            const userToken = localStorage.getItem('token');
            const userRole = localStorage.getItem('userRole');

            if (userToken && userRole && ['BOSS', 'ADMIN'].includes(userRole)) {
                websocket.connect(userToken, userRole, (orderMessage) => {
                    // 收到新订单消息时，触发通知
                    this.handleNewOrder(orderMessage);
                });
            }
        },

        playNoticeSound(){
            const audio = new Audio(require("@/assets/audio/orderAudio.mp3"));
            audio.play().catch(err=>{
                console.log('提示音播放失败',err);
            })
        },

        handleNewOrder(message) {
            // 1. 显示Element UI弹窗提示（视觉提醒）
            this.$notify({
                title: '新订单提醒',
                message: message.content,
                type: 'success',
                duration: 0
            });

            // 2. 播放提示音（听觉提醒，可配合方案1/2优化）
            this.playNoticeSound();

            // 3. 触发桌面通知（即使窗口最小化也能收到）
            this.showDesktopNotification();
        },



        // 方案三核心：请求桌面通知授权
        requestNotificationPermission() {
            // 检查浏览器是否支持Notification API
            if (!('Notification' in window)) {
                this.$message.warning('您的浏览器不支持桌面通知，无法使用实时提醒功能');
                return;
            }

            // 已授权：直接使用
            if (Notification.permission === 'granted') {
                this.$message.success('桌面通知已启用，最小化窗口也能收到提醒');
            }
            // 未授权：请求用户授权
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        this.$message.success('桌面通知已启用，最小化窗口也能收到提醒');
                    } else {
                        this.$message.warning('您已拒绝桌面通知，可能无法及时收到新订单提醒');
                    }
                });
            }
        },

        // 方案三核心：显示桌面通知
        showDesktopNotification() {
            // 检查是否已获得授权
            if (Notification.permission !== 'granted') {
                return; // 未授权则不显示
            }

            // 创建桌面通知实例
            const notification = new Notification('新订单提醒', {
                body: `新订单提醒！`,
                icon: '/static/icons/order-notify.png', // 通知图标（可选，放在public/static/icons下）
                sound: '/static/sounds/notice.mp3' // 提示音（部分浏览器支持，如Chrome）
            });

            // 点击通知时，切换到浏览器并跳转到订单详情页
            notification.onclick = () => {
                window.focus(); // 激活浏览器窗口
                notification.close(); // 关闭通知
            };

            // 5秒后自动关闭通知
            setTimeout(() => notification.close(), 5000);
        },
    },
}
</script>

<template>
    <div class="app-container">

        <component :is="headerComponent"/>
        <main class="main-container">
            <router-view></router-view>
        </main>
    </div>
</template>

<style scoped>

</style>