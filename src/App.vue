<template>
  <div id="app">
      <div class="app-wrapper">
<!--          <TopHeader></TopHeader>-->
<!--          <router-view></router-view>-->
          <LoginBody></LoginBody>
      </div>
  </div>
</template>

<script>

import './assets/font/font.css';
// import TopHeader from "@/components/boss/TopHeader.vue";
import LoginBody from "@/components/LoginBody.vue";
// import OrdersList from "@/components/boss/orders/OrdersList.vue";
// import CateItems from "@/components/boss/product/CateItems.vue";
// import ProListItems from "@/components/boss/product/ProListItems.vue";
// import CateListItems from "@/components/boss/category/CateListItems.vue";
// import CateItems from "@/components/boss/product/CateItems.vue";
// import ProListItems from "@/components/boss/product/ProListItems.vue";
// import OrdersList from "@/components/boss/orders/OrdersList.vue";
// import CateListItems from "@/components/boss/category/CateListItems.vue";

export default {
    name: 'App',
    components: {
        LoginBody
        // ProListItems,
        // CateItems,
        // OrdersList,
        // CateListItems,
        // ProListItems,
        // CateItems,
        // OrdersList,
        // CateListItems,
        // TopHeader

    },
    data(){
        return{
            productShow: false,
            categoryShow: false,
            ordersShow: false
        }
    }
}
</script>

<style scoped>
    .app-wrapper{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    router-view{
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
    }
</style>
