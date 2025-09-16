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
    },
    beforeDestroy() {
        websocket.disconnect();
    },
    methods:{
        handleNewOrder(message){
            this.orderNotification.unshift(message);
            this.showNotification(message);

            // 播放提示音
            this.playNoticeSound();
        },

        showNotification(message) {
            this.$notify({
                title: "新订单提醒",
                message: message.content,
                type: 'success',
                duration: 0 //不自动关闭
            })
        },

        playNoticeSound(){
            const audio = new Audio("@/assets/audio/orderAudio.mp3");
            audio.play().catch(err=>{
                console.log('提示音播放失败',err);
            })
        }
    }
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