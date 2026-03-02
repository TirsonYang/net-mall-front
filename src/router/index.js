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
import Checkout from '@/components/user/checkout/CheckOutMenu.vue'
import GetOrder from "@/components/user/orders/GetOrder.vue";
import OrderDetail from "@/components/user/orders/OrderDetail.vue";

Vue.use(VueRouter);

// const router =new VueRouter({
//     routes:[
//         // 认证前路由
//         {path:'/user/product',component:UserProductList},
//
//         // 认证后路由
//         {
//             path: '/boss',
//             component: Layout,
//             children:[
//                 {path:'category',component:BossCateList,meta:{requiresAuth:true,requiredRole:1}},
//                 {path:'product',component:BossProList,meta:{requiresAuth:true,requiredRole:1}},
//                 {path:'orders',component:BossOrderList,meta:{requiresAuth:true,requiredRole:1}},
//                 {path:'user',component:BossUserMenu,meta:{requiresAuth:true,requiredRole:1}},
//                 {path: 'ticket',component: BossTicketList, meta:{requiresAuth:true,requiredRole:1}}
//             ]
//         },
//
//         {
//             path: '/admin',
//             component: Layout,
//             children:[
//                 {path:'category',component:AdminCateList,meta:{requiresAuth:true,requiredRole:2}},
//                 {path:'product',component:AdminProList,meta:{requiresAuth:true,requiredRole:2}},
//                 {path:'orders',component:AdminOrderList,meta:{requiresAuth:true,requiredRole:2}}
//             ]
//         },
//
//         {
//             path: '/user',
//             component: UserProductList,
//             children:[
//                 {path:'category',component:UserCategoryList,meta:{requiresAuth:true,requiredRole:3}},
//                 {path:'product',component:UserProductList,meta:{requiresAuth:true,requiredRole:3}},
//                 {path:'orders',component:UserOrderList,meta:{requiresAuth:true,requiredRole:3}},
//                 {path:'ticket',component:UserTicketList,meta:{requiresAuth:true,requiredRole:3}},
//                 {path:'user',component:UserUser,meta:{requiresAuth:true,requiredRole:3}},
//                 {path: 'checkout',name: 'UserCheckout',component: Checkout,meta:{requiresAuth:true,requiredRole:3}},
//             ]
//         },
//
//         //默认重定向
//         {path: '/',redirect:'/user/product'}
//     ]
// });



// router.beforeEach((to,from,next)=>{
//     const publicPages = ['/user/product','/user/category','/user/checkout'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('token');
//
//     if (authRequired&& !loggedIn){
//         return next('/login');
//     }
//
//     if (to.path==='/login'&&loggedIn){
//         const userRole = localStorage.getItem('userRole');
//         return next(Number(userRole)===2?'/admin/category':'/boss/category');
//     }
//
//     next();
// })

const router = new VueRouter({
    routes:[
        // 公开路由 - 无需登录
        {
            path: '/user',
            component: Layout,  // 使用 Layout 组件
            children: [
                {path:'product',component:UserProductList},   // 商品浏览
                {path:'category',component:UserCategoryList}, // 分类浏览
                {path:'orders',component:OrderDetail},
            ]
        },

        {
            path: '/login',
            component: LoginBody,
        },

        // 认证后路由
        {
            path: '/boss',
            component: Layout,
            children:[
                {path:'category',component:BossCateList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'product',component:BossProList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'orders',component:BossOrderList,meta:{requiresAuth:true,requiredRole:1}},
                {path:'user',component:BossUserMenu,meta:{requiresAuth:true,requiredRole:1}},
                {path: 'ticket',component: BossTicketList, meta:{requiresAuth:true,requiredRole:1}}
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
            component: Layout,  // 改为Layout组件
            children:[
                {path:'orders',component:UserOrderList,meta:{requiresAuth:true,requiredRole:3}},     // 订单需要登录
                {path:'ticket',component:UserTicketList,meta:{requiresAuth:true,requiredRole:3}},    // 优惠券需要登录
                {path:'user',component:UserUser,meta:{requiresAuth:true,requiredRole:3}},           // 个人中心需要登录
                {path: 'checkout',name: 'UserCheckout',component: Checkout,meta:{requiresAuth:false}} // 结算页面无需登录
            ]
        },

        //默认重定向
        {path: '/',redirect:'/user/product'}
    ]
});

router.beforeEach((to, from, next) => {
    // 需要管理员权限的路由
    const adminRoutes = ['/admin', '/admin/category', '/admin/product', '/admin/orders'];

    // 需要老板权限的路由
    const bossRoutes = ['/boss', '/boss/category', '/boss/product', '/boss/orders', '/boss/user', '/boss/ticket'];

    // 需要用户登录的个人功能路由
    const userPrivateRoutes = ['/user/orders', '/user/ticket', '/user/user'];

    const loggedIn = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    // 检查是否访问需要特定权限的路由
    const isAdminRoute = adminRoutes.some(route => to.path.startsWith(route));
    const isBossRoute = bossRoutes.some(route => to.path.startsWith(route));
    const isUserPrivateRoute = userPrivateRoutes.includes(to.path);

    // 管理员路由权限检查
    if (isAdminRoute) {
        if (!loggedIn) {
            return next('/login');
        }
        if (Number(userRole) !== 2) {
            return next('/login'); // 非管理员拒绝访问
        }
    }

    // 老板路由权限检查
    if (isBossRoute) {
        if (!loggedIn) {
            return next('/login');
        }
        if (Number(userRole) !== 1) {
            return next('/login'); // 非老板拒绝访问
        }
    }

    // 用户私人功能权限检查
    if (isUserPrivateRoute && !loggedIn) {
        return next('/login');
    }

    // 已登录用户访问登录页的处理
    // 已登录用户访问登录页的处理
    if (to.path === '/login' && loggedIn) {
        // 根据角色重定向到对应主页
        if (Number(userRole) === 2) {
            return next('/admin/category');
        } else if (Number(userRole) === 1) {
            return next('/boss/category');
        } else {
            return next('/user/product'); // 普通用户回到商品页面
        }
    }

    next();
});
export default router;