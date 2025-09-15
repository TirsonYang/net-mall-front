<script>
import AdminTopHeader from "@/components/admin/TopHeader.vue";
import BossTopHeader from "@/components/boss/TopHeader.vue";
import UserTopHeader from '@/components/user/TopHeader.vue'

export default {
    name: 'LayOut',
    components: {
        AdminTopHeader: AdminTopHeader,
        BossTopHeader: BossTopHeader,
        UserTopHeader: UserTopHeader
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