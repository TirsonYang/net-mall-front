import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
import router from "@/router/index";

new Vue({
  render: h => h(App),
    router:router
}).$mount('#app')
