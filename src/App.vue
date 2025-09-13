<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

import './assets/font/font.css';
export default {
    name: 'App',
    components: {
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
