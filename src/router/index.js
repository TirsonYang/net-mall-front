import VueRouter from "vue-router";
import Vue from "vue";
import BossCateList from "@/components/boss/category/CateListItems.vue";
import BossProList from "@/components/boss/product/ProListItems.vue";
import BossOrderList from "@/components/boss/orders/OrdersList.vue";
import BossUserMenu from "@/components/boss/user/UserMenu.vue"
import BossTicketList from '@/components/boss/ticket/TicketList.vue'
import AdminCateList from "@/components/admin/category/CateListItems.vue";
import AdminProList from "@/components/admin/product/ProListItems.vue";
import AdminOrderList from "@/components/admin/orders/OrdersList.vue";
import UserCategoryList from '@/components/user/category/CateListItems.vue'
import UserProductList from '@/components/user/product/ProListItems.vue'
import UserTicketList from '@/components/user/ticket/TicketList.vue'
import UserOrderList from '@/components/user/orders/OrdersList.vue'
import LoginBody from "@/components/LoginBody.vue";
import Layout from "@/components/Layout.vue";
import UserUser from '@/components/user/user/UserMenu.vue'

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
                {path:'category',component:BossCateList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'product',component:BossProList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'orders',component:BossOrderList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'user',component:BossUserMenu,meta:{requiresAuth:true,requiredRole:1}},
                {path: 'ticket',component: BossTicketList, mata:{requiresAuth:true,requiredRole:1}}
            ]
        },

        {
            path: '/admin',
            component: Layout,
            children:[
                {path:'category',component:AdminCateList,meta:{requiresAuth:true,requiredRole:2}},
                {path:'product',component:AdminProList,meta:{requiresAuth:true,requiredRole:2}},
                {path:'orders',component:AdminOrderList,meta:{requiresAuth:true,requiredRole:2}}
            ]
        },

        {
            path: '/user',
            component: Layout,
            children:[
                {path:'category',component:UserCategoryList,meta:{requiresAuth:true,requiredRole:3}},
                {path:'product',component:UserProductList,meta:{requiresAuth:true,requiredRole:3}},
                {path:'orders',component:UserOrderList,meta:{requiresAuth:true,requiredRole:3}},
                {path:'ticket',component:UserTicketList,meta:{requiresAuth:true,requiredRole:3}},
                {path:'user',component:UserUser,meta:{requiresAuth:true,requiredRole:3}}
            ]
        },

        //默认重定向
        {path: '/',redirect:'/login'}
    ]
});

router.beforeEach((to,from,next)=>{
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired&& !loggedIn){
        return next('/login');
    }

    if (to.path==='/login'&&loggedIn){
        const userRole = localStorage.getItem('userRole');
        return next(Number(userRole)===2?'/admin/category':'/boss/category');
    }

    next();
})
export default router;