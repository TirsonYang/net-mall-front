<script>

export default {
  name: 'TopHeader',
  methods: {
      Product(){
          console.log("商品管理");
      },
      Category(){
          console.log("分类管理");
      },
      Orders(){
          console.log("订单管理");
      }
  }
}
</script>

<template>
  <div class="father">
      <img src="../../assets/image/coffee.svg" alt="图片无法加载">
      <span id="subject">点一点BOSS</span>
      <div id="search">
          <input type="text" placeholder="  请输入商品名称……">
<!--          <button id="searchBtn">搜索</button>-->
      </div>
      <div class="son">
          <button class="btn" @click="Product">商品管理</button>
          <button class="btn" @click="Category">分类管理</button>
          <button class="btn" @click="Orders">订单管理</button>
          <button class="btn">个人中心</button>
      </div>
  </div>
</template>

<style scoped>
    /* 整体样式 */
    .father{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        width: 100%;
        background-color: #bd74e3;
        margin: 0;
    }
    /* 子元素样式 */
    .son{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 600px;
        height: 100px;
        margin: 20px;
    }
    .btn{
        width: 100px;
        height: 50px;
        background-color: #8dd3e3;
        border-style: none;
        border-radius: 5px;
    }
    /* 悬停效果 */
    .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        background: linear-gradient(to bottom, #768ef6, #6c87f3);
    }

    /* 点击效果 */
    .btn:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background: linear-gradient(to bottom, #5873d6, #506ee1);
    }

    /* 获得焦点效果 */
    .btn:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.3);
    }
    /* 图片样式 */
    img{
        width: 100px;
        height:100px;
    }
    input{
        height: 30px;
        width: 300px;
        background-color: ghostwhite;
        border-radius: 10px;
        border-style: none;
    }
    button{
        height: 35px;
        width: 80px;
    }
    /* 标题样式 */
    #subject{
        font-family:'SubjectFont',sans-serif;
        margin: 20px;
        font-size: 30px;
    }
    #search{
        width: 500px;
    }
    #searchBtn{
        background-color: #bc60e4;
        border-radius: 5px;
        border-style: none;
        box-shadow: #c690e3 3px 3px 5px;
        margin: 5px;
    }
    #searchBtn:hover{
        transform: translateY(-3px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        background: linear-gradient(to bottom, #bc60e4, #bc6ce6);
    }
    /* 点击效果 */
    .btn:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background: linear-gradient(to bottom, #693d87, #c458e5);
    }
</style>