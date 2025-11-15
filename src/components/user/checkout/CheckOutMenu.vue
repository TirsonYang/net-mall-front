<script>
  import axios from "@/utils/request";

  export default {
    name: "UserCheckout",
    data(){
      return {
        orderId: null,
        orderDetail:[]
      }
    },
    methods:{
      getOrderDetail(){
        const cartList=this.$route.params.cartList;
        console.log(cartList);
        axios.get("/boss/orderDetail/list",{
          params: {
            orderId: this.orderId
          }
        }).then(res => {
            this.orderDetail=res.data.data;
            console.log(this.orderDetail);
        }).catch(err=>{
          console.error(err)
        })
      }
    },
    created() {
      this.orderId= this.$route.params.orderId;
      this.getOrderDetail();
    },
    computed:{
      getOrderPrice(){
        return this.orderDetail.reduce((total,item)=>
          total + item.amount,0
        );
      },
      getOrderNumber(){
        return this.orderDetail.reduce((total,item)=>total+item.quantity,0);
      }
    }
  }

</script>

<template>

  <div class="container">
    <div class="table-wrapper">
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
        <tr  v-for="(item,index) in orderDetail" :key="item.id">
          <td>{{index+1}}</td>
          <td>{{item.productName}}</td>
          <td><img :src="item.imageUrl" alt=""></td>
          <td>{{item.quantity}}</td>
          <td>{{item.amount}}</td>
        </tr>
        </tbody>
      </table>
      <div class="total-container">
        <div class="total-price">
          <span>共{{getOrderNumber}}件</span>
        </div>
        <div class="total-price">
          <span>总计：</span>
          <span class="price">￥{{getOrderPrice}}</span>
        </div>
      </div>
    </div>
    
    <div class="payment-methods">
      <div class="pay-btn wx">
        <span><img src="@/assets/image/WeChat.png" alt="微信支付"></span>
        <button>微信支付</button>
      </div>
      <div class="pay-btn alipay">
        <span><img src="@/assets/image/alipay.png" alt="支付宝支付"></span>
        <button>支付宝支付</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* 基础容器样式 - 居中布局+留白 */
.container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 30px;
}

/* 表格区域卡片化 - 增强层次感 */
.table-wrapper {
  width: 100%;
  margin: 0 auto 40px; /* 与支付按钮区拉开距离 */
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.table-wrapper:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); /* 轻微悬浮阴影增强 */
}

/* 表格样式优化 */
table {
  width: 100%;
  border-collapse: collapse;
}

/* 表头样式 - 主色调突出 */
th {
  background-color: #9a54b3; /* 蓝色主色调，可根据品牌调整 */
  color: #fff;
  font-weight: 600;
  padding: 16px 24px;
  text-align: left;
  font-size: 16px;
  position: relative;
}

/* 表头底部细微分隔线 */
th::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

/* 表格内容单元格 */
td {
  color: #333;
  padding: 20px 24px;
  font-size: 15px;
  border-bottom: 1px solid #f0f2f5;
  vertical-align: middle;
  transition: background-color 0.2s ease;
}

/* 行悬浮效果 */
tbody tr:hover td {
  background-color: #f8fafc;
}

/* 商品图片优化 - 防止变形+圆角 */
td img {
  width: 80px;
  height: 80px;
  object-fit: cover; /* 保持比例裁剪 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

/* 总价区域 - 突出显示 */
.total-container {
  padding: 20px 24px;
  background-color: #f8fafc;
  border-top: 2px solid #e2e8f0;
}

.total-price {
  text-align: right;
  margin-bottom: 10px;
  font-size: 16px;
}

.total-price:first-child {
  color: #64748b;
}

.total-price:last-child {
  font-size: 20px;
}

.price {
  font-weight: 700;
  color: #e53e3e; /* 价格用红色突出 */
  margin-left: 8px;
}

/* 支付按钮区域布局 */
.payment-methods {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 30px;
  flex-wrap: wrap; /* 小屏幕自动换行 */
}

/* 支付按钮样式 */
.pay-btn{
  display: flex;
  align-items: center;
  gap: 10px;
}

.pay-btn img{
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.pay-btn button{
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px; /* 按钮内文字与图标（若有）间距 */
  transition: all 0.3s ease;
}

/* 微信支付按钮：品牌色+阴影 */
.pay-btn.wx button {
  background-color: #07c160;
  color: #fff;
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.2);
}

/* 支付宝支付按钮：品牌色+阴影 */
.pay-btn.alipay button {
  background-color: #1677ff;
  color: #fff;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.2);
}

/*  hover 交互：微上浮+阴影加深 */
.pay-btn button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

/* 点击反馈：恢复位置 */
.pay-btn button:active {
  transform: translateY(0);
}


.wx-btn button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 40px;
  background-color: #07c160; /* 微信绿 */
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.2);
  transition: all 0.3s ease;
}

/* 支付宝按钮单独颜色 */
.wx-btn:nth-child(2) button {
  background-color: #1677ff; /* 支付宝蓝 */
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.2);
}

/* 支付图标优化 */
.wx-btn span img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  box-shadow: none; /* 去掉图标阴影 */
}

/* 按钮交互效果 */
.wx-btn button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(7, 193, 96, 0.3); /* 微信hover阴影 */
}

.wx-btn:nth-child(2) button:hover {
  box-shadow: 0 6px 16px rgba(22, 119, 255, 0.3); /* 支付宝hover阴影 */
}

.wx-btn button:active {
  transform: translateY(0);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .container {
    padding: 20px;
    margin: 20px auto;
  }

  th, td {
    padding: 14px 18px;
  }

  .wx-btn button {
    padding: 14px 30px;
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .table-wrapper {
    margin-bottom: 30px;
  }

  th, td {
    padding: 12px 12px;
    font-size: 14px;
  }

  td img {
    width: 60px;
    height: 60px;
  }

  .payment-methods {
    gap: 15px;
    flex-direction: column; /* 小屏幕按钮纵向排列 */
    align-items: center;
  }

  .wx-btn button {
    width: 100%;
    max-width: 300px;
    padding: 14px 20px;
  }

  .total-price:last-child {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
    margin: 10px auto;
  }

  th {
    font-size: 13px;
  }

  td {
    font-size: 13px;
    padding: 10px 8px;
  }

  .total-container {
    padding: 15px 12px;
  }

  .pay-btn {
    width: 100%;
    justify-content: center;
  }
  .pay-btn button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
</style>