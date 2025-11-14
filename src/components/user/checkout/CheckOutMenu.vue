<script>
  import axios from "@/utils/request";

  export default {
    name: "UserCheckout",
    data(){
      return {
        cartList: []
      }
    },
    methods:{
      // getOrderDetail(){
      //   const cartList=this.$route.params.cartList;
      //   console.log(cartList);
      //   axios.get("/boss/orderDetail/list",{
      //     params: {
      //       orderId: orderId
      //     }
      //   }).then(res => {
      //       this.orderDetail=res.data.data;
      //       console.log(this.orderDetail);
      //   }).catch(err=>{
      //     console.error(err)
      //   })
      // }
    },
    created() {
      this.cartList= this.$route.params.cartList;
    }
  }

</script>

<template>

  <div class="container">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>序号</th>
            <th>商品</th>
            <th>图片</th>
            <th>数量</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(item,index) in list" :key="item.id">
            <td>{{index+1}}</td>
            <td>{{item.productName}}</td>
            <td><img :src="item.imageUrl" alt=""></td>
            <td>{{item.quantity}}</td>
            <td>{{item.amount}}</td>
          </tr>
        </tbody>
      </table>
  </div>

</template>

<style scoped>

</style>