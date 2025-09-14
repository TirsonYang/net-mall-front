<script>
import axios from "/src/utils/request";

export default {
    name: "AdminProCate",
    data() {
        return {
            list: [],
            currentCategoryId: null
        }
    },
    created() {
        this.getCateList();
    },
    methods: {
        getCateList() {
            axios.get("boss/product/getCate")
                .then(res => {
                    this.list = res.data.data;
                    if (this.list.length>0){
                        this.currentCategoryId=this.list[0].id;
                        this.$emit("category-change",this.currentCategoryId);
                    }
                }).catch(err => {
                console.log(err);
            })
        },
        handleCategoryClick(categoryId){
            this.currentCategoryId=categoryId;
            this.$emit("category-change",categoryId);
        }
    }
}
</script>

<template>
    <div id="table">
        <table>
            <tr v-for="item in list" :key="item.id">
                <td>
                    <span @click="handleCategoryClick(item.id)" class="category-item" :class="{ 'category-active': currentCategoryId===item.id}">
                        {{item.categoryName}}
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
/* 核心调整：将固定宽度改为「最小宽度+自适应」，避免小屏挤压 */
#table {
    min-width: 180px; /* 小屏最小宽度，防止过度收缩 */
    width: 100%; /* 自适应父容器 */
    max-width: 220px; /* 大屏最大宽度，保持原有比例 */
    height: calc(100vh - 200px);
    background-image: linear-gradient(to bottom, #e9d5ff, #c4a3f5);
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
    max-height: calc(100vh - 140px);
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(167, 139, 250, 0.15);
}

.category-item{
    cursor: pointer;
    display: block;
    padding: 10px 15px;
    transition: all 0.2s ease;
    border-radius: 4px;
    margin-bottom: 4px;
    font-size: 16px;
    color: #581c87;
}

.category-item:hover{
    color: #409eff;
    background-color: rgba(255, 255, 255, 0.2)
}

.category-active{
    color: #fff;
    background-color: #9333ea;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 小屏适配：调整内边距和字体，节省空间 */
@media (max-width: 768px) {
    #table {
        height: auto; /* 纵向布局时取消固定高度，避免溢出 */
        max-height: 280px; /* 限制最大高度，防止占满屏幕 */
        margin-bottom: 10px; /* 纵向布局时增加底部间距 */
    }
    .category-item {
        padding: 8px 12px; /* 减小内边距 */
        font-size: 14px; /* 缩小字体 */
    }
}

/* 超小屏（手机）：进一步压缩间距 */
@media (max-width: 480px) {
    #table {
        max-width: 100%; /* 超小屏占满宽度 */
        padding: 8px;
    }
    .category-item {
        padding: 6px 10px;
        margin-bottom: 3px;
    }
}
</style>