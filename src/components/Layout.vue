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
          const isLoggedIn = !!localStorage.getItem("token");

          // 如果未登录，显示用户头部
          if (!isLoggedIn) {
            return "UserTopHeader";
          }

          // 根据角色显示对应头部
          if (Number(userRole) === 1){
            return "BossTopHeader";
          } else if (Number(userRole) === 2){
            return "AdminTopHeader";
          } else {
            return "UserTopHeader";
          }
        }
    },
    mounted() {
      console.log("组件挂载，准备连接websocket")

      // 只有登录用户才初始化 WebSocket
      const isLoggedIn = !!localStorage.getItem("token");
      if (isLoggedIn) {
        this.initWebSocket();
        this.requestNotificationPermission();
      }

      // 为所有用户（包括未登录）建立基本的 WebSocket 连接
      websocket.connect(message => {
        this.handleNewOrder(message);
      })
    },
    beforeDestroy() {
        websocket.disconnect();
    },
    methods:{

        // 初始化WebSocket连接
        initWebSocket() {
          const userToken = localStorage.getItem('token');
          const userRole = localStorage.getItem('userRole');

          // 只有管理员和老板才建立完整的 WebSocket 连接
          if (userToken && userRole && (Number(userRole) === 1 || Number(userRole) === 2)) {
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
          const userRole = localStorage.getItem('userRole');
          const isLoggedIn = !!localStorage.getItem("token");

          // 只有登录的管理员和老板才能接收订单通知
          if (isLoggedIn && (Number(userRole) === 1 || Number(userRole) === 2)) {
            this.$notify({
              title: '新订单提醒',
              message: message.content,
              type: 'success',
              duration: 0
            });

            this.playNoticeSound();
            this.showDesktopNotification();
          }
          // 普通用户和未登录用户不显示订单通知
        },



        requestNotificationPermission() {
          const userRole = localStorage.getItem('userRole');
          const isLoggedIn = !!localStorage.getItem("token");

          // 只有登录的管理员和老板才需要桌面通知
          if (isLoggedIn && (Number(userRole) === 1 || Number(userRole) === 2)) {
            if (!('Notification' in window)) {
              this.$message.warning('您的浏览器不支持桌面通知，无法使用实时提醒功能');
              return;
            }

            if (Notification.permission === 'granted') {
              this.$message.success('桌面通知已启用，最小化窗口也能收到提醒');
            }
            else if (Notification.permission !== 'denied') {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  this.$message.success('桌面通知已启用，最小化窗口也能收到提醒');
                } else {
                  this.$message.warning('您已拒绝桌面通知，可能无法及时收到新订单提醒');
                }
              });
            }
          }
        },

        // 方案三核心：显示桌面通知
        showDesktopNotification() {
          const userRole = localStorage.getItem('userRole');
          const isLoggedIn = !!localStorage.getItem("token");

          // 只有登录的管理员和老板才显示桌面通知
          if (!isLoggedIn || !(Number(userRole) === 1 || Number(userRole) === 2)) {
            return;
          }

          // 检查是否已获得授权
          if (Notification.permission !== 'granted') {
            return; // 未授权则不显示
          }

          // 创建桌面通知实例
          const notification = new Notification('新订单提醒', {
            body: `新订单提醒！`,
            icon: '/static/icons/order-notify.png',
            sound: '/static/sounds/notice.mp3'
          });

          notification.onclick = () => {
            window.focus();
            notification.close();
          };

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