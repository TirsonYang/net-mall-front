<script>

export default {
  name: 'TopHeader',
  methods: {
  }
}
</script>

<template>
    <div>
        <div class="father">
            <img src="../../assets/image/coffee.svg" alt="系统logo">
            <span id="subject">点一点BOSS</span>
            <div id="search">
                <input type="text" placeholder="  请输入商品名称……">
                <!--          <button id="searchBtn">搜索</button>-->
            </div>
            <div class="son">
                <a class="nav-btn" href="#/boss/product">商品管理</a>
                <a class="nav-btn" href="#/boss/category">分类管理</a>
                <a class="nav-btn" href="#/boss/orders">订单管理</a>
                <a class="nav-btn" href="#/">个人中心</a>
            </div>
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
        padding: 0 20px;
        box-sizing: border-box;
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

    /* 导航按钮：默认浅紫，hover/active 深化 */
    .nav-btn {
        display: inline-block;
        padding: 0 20px; /* 左右内边距，替代固定宽度，适配文字 */
        height: 38px;
        line-height: 38px; /* 垂直居中 */
        background-color: #e9d5ff; /* 浅紫背景：默认状态柔和 */
        color: #581c87; /* 深紫文字：清晰可读 */
        border-radius: 20px; /* 大圆角，与搜索区呼应 */
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    /* 导航按钮 hover：背景加深，轻微上浮 */
    .nav-btn:hover {
        background-color: #d8b4fe;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(167, 139, 250, 0.15);
    }

    /* 导航按钮 active：点击反馈，背景再加深 */
    .nav-btn:active {
        transform: translateY(0);
        background-color: #c4a3f5;
        box-shadow: 0 2px 6px rgba(167, 139, 250, 0.1);
    }

    /* 当前页激活按钮：深紫背景+白色文字，明确当前位置 */
    .nav-btn--active {
        background-color: #9333ea;
        color: #fff;
        box-shadow: 0 2px 8px rgba(147, 51, 234, 0.2);
    }


    .btn{
        width: 100px;
        height: 50px;
        background-color: #8dd3e3;
        border-style: none;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        text-decoration: none;
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
</style>