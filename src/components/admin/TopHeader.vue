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
            <span id="subject">点一点ADMIN</span>
            <div id="search">
                <input type="text" placeholder="  请输入商品名称……">
                <!--          <button id="searchBtn">搜索</button>-->
            </div>
            <div class="son">
                <a class="nav-btn" href="#/admin/product">商品管理</a>
                <a class="nav-btn" href="#/admin/category">分类管理</a>
                <a class="nav-btn" href="#/admin/orders">订单管理</a>
                <a class="nav-btn" href="#/">优惠管理</a>
                <a class="nav-btn" href="#/">退出登录</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.father {
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
    position: relative;
}

/* 子元素样式 */
.son {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    height: 100px;
    margin: 0 20px;
}

/* 导航按钮样式 */
.nav-btn {
    display: inline-block;
    padding: 0 20px;
    height: 38px;
    line-height: 38px;
    background-color: #e9d5ff;
    color: #581c87;
    border-radius: 20px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap; /* 防止文字换行 */
    cursor: pointer;
}

.nav-btn:hover {
    background-color: #d8b4fe;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(167, 139, 250, 0.15);
}

.nav-btn:active {
    transform: translateY(0);
    background-color: #c4a3f5;
    box-shadow: 0 2px 6px rgba(167, 139, 250, 0.1);
}

.nav-btn--active {
    background-color: #9333ea;
    color: #fff;
    box-shadow: 0 2px 8px rgba(147, 51, 234, 0.2);
}

/* 图片样式 */
img {
    width: 100px;
    height: 100px;
    flex-shrink: 0; /* 防止图片缩小 */
}

/* 搜索框样式 */
#search {
    width: 500px;
    display: flex;
    align-items: center;
    margin: 0 20px;
    flex-shrink: 1; /* 允许搜索框收缩 */
}

input {
    height: 30px;
    width: 100%;
    background-color: ghostwhite;
    border-radius: 10px;
    border-style: none;
    padding: 0 10px;
    min-width: 150px; /* 最小宽度，防止过度收缩 */
}

/* 标题样式 */
#subject {
    font-family: 'SubjectFont', sans-serif;
    margin: 0 20px;
    font-size: 30px;
    color: white;
    white-space: nowrap;
    flex-shrink: 0; /* 防止标题缩小 */
}
</style>