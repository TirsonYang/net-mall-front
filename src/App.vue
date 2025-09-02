<template>
  <div id="app">
      <TopHeader></TopHeader>
<!--      <ListItems></ListItems>-->
      <div id="body">
          <CateItems></CateItems>
          <ProListItems></ProListItems>
<!--          <OrdersList></OrdersList>-->
      </div>
  </div>
</template>

<script>

import './assets/font/font.css';
import TopHeader from "@/components/boss/TopHeader.vue";
// import OrdersList from "@/components/boss/orders/OrdersList.vue";
import CateItems from "@/components/boss/product/CateItems.vue";
import ProListItems from "@/components/boss/product/ProListItems.vue";
// import CateListItems from "@/components/boss/category/CateListItems.vue";

export default {
    name: 'App',
    components: {
        ProListItems,
        CateItems,
        // OrdersList,
        // CateListItems,
        TopHeader
    },
}
</script>

<style scoped>
    #body{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
</style>
