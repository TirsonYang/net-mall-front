<script>
import AdminTopHeader from "@/components/admin/TopHeader.vue";
import BossTopHeader from "@/components/boss/TopHeader.vue";

export default {
    name: 'LayOut',
    components: {
        AdminTopHeader: AdminTopHeader,
        BossTopHeader: BossTopHeader
    },
    computed:{
        headerComponent(){
            const userRole=localStorage.getItem("userRole");
            return userRole===2? "AdminTopHeader":"BossTopHeader";
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