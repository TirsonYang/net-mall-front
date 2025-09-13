import VueRouter from "vue-router";
import Vue from "vue";
import BossCateList from "@/components/boss/category/CateListItems.vue";
import BossProList from "@/components/boss/product/ProListItems.vue";
import BossOrderList from "@/components/boss/orders/OrdersList.vue";
import AdminCateList from "@/components/admin/category/CateListItems.vue";
import AdminProList from "@/components/admin/product/ProListItems.vue";
import AdminOrderList from "@/components/admin/orders/OrdersList.vue";
import LoginBody from "@/components/LoginBody.vue";
import Layout from "@/components/Layout.vue";

Vue.use(VueRouter);

const router =new VueRouter({
    routes:[
        // 认证前路由
        {path:'/login',component:LoginBody},

        // 认证后路由
        {
            path: '/boss',
            component: Layout,
            children:[
                {path:'/boss/category',component:BossCateList},
                {path:'/boss/product',component:BossProList},
                {path:'/boss/orders',component:BossOrderList},
            ]
        },

        {
            path: '/admin',
            component: Layout,
            children:[
                {path:'/admin/category',component:AdminCateList},
                {path:'/admin/product',component:AdminProList},
                {path:'/admin/orders',component:AdminOrderList}
            ]
        },

        //默认重定向
        {path: '/',redirect:'/login'}
    ]
});
export default router;