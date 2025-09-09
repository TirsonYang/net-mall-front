import VueRouter from "vue-router";
import Vue from "vue";
import CateListItems from "@/components/boss/category/CateListItems.vue";
import ProListItems from "@/components/boss/product/ProListItems.vue";
import OrdersList from "@/components/boss/orders/OrdersList.vue";

Vue.use(VueRouter);

const router =new VueRouter({
    routes:[
        {path:'/boss/category',component:CateListItems},
        {path:'/boss/product',component:ProListItems},
        {path:'/boss/orders',component:OrdersList}
    ]
});
export default router;