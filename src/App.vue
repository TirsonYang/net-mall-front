<template>
  <div id="app">
      <TopHeader></TopHeader>
      <div id="body">
<!--          <div class="boss">-->
<!--              <div id="Category" >-->
<!--                  <CateListItems></CateListItems>-->
<!--              </div>-->
              <div id="Product">
                  <CateItems></CateItems>
                  <ProListItems></ProListItems>
              </div>
<!--              <div id="Orders">-->
<!--                  <OrdersList></OrdersList>-->
<!--              </div>-->
<!--          </div>-->
      </div>
  </div>
</template>

<script>

import './assets/font/font.css';
import TopHeader from "@/components/boss/TopHeader.vue";
// import OrdersList from "@/components/boss/orders/OrdersList.vue";
// import CateItems from "@/components/boss/product/CateItems.vue";
// import ProListItems from "@/components/boss/product/ProListItems.vue";
// import CateListItems from "@/components/boss/category/CateListItems.vue";
import CateItems from "@/components/boss/product/CateItems.vue";
import ProListItems from "@/components/boss/product/ProListItems.vue";
// import OrdersList from "@/components/boss/orders/OrdersList.vue";
// import CateListItems from "@/components/boss/category/CateListItems.vue";

export default {
    name: 'App',
    components: {
        ProListItems,
        CateItems,
        // OrdersList,
        // CateListItems,
        // ProListItems,
        // CateItems,
        // OrdersList,
        // CateListItems,
        TopHeader
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
    #body{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    #Product{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
