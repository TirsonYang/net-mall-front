<script>

export default {
  name: 'TopHeader',
  methods: {
  }
}
</script>

<template>
  <div class="father">
      <img src="../../assets/image/coffee.svg" alt="图片无法加载">
      <span id="subject">点一点ADMIN</span>
      <div id="search">
          <input type="text" placeholder="  请输入商品名称……">
          <button id="searchBtn">搜索</button>
      </div>
      <div class="son">
          <button class="btn">商品管理</button>
          <button class="btn">分类管理</button>
          <button class="btn">订单管理</button>
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
        height: 30px;
        background-color: bisque;
        border-style: none;
        border-radius: 5px;
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
</style>