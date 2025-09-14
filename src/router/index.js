import VueRouter from "vue-router";
import Vue from "vue";
import BossCateList from "@/components/boss/category/CateListItems.vue";
import BossProList from "@/components/boss/product/ProListItems.vue";
import BossOrderList from "@/components/boss/orders/OrdersList.vue";
import BossUserMenu from "@/components/boss/user/UserMenu.vue"
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
                {path:'category',component:BossCateList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'product',component:BossProList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'orders',component:BossOrderList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'user',component:BossUserMenu,meta:{requiresAuth:true,requiredRole:1}},
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