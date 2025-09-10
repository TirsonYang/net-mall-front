<script>
import axios from "axios";

export default {
    name: "CateItems",
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
#table {
    width: 200px;
    height: calc(100vh - 200px);
    background-image: linear-gradient(to bottom, #e9d5ff, #c4a3f5);
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
    max-height: calc(100vh - 140px);
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(167, 139, 250, 0.15); /* 浅紫阴影，强化主题感 */
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
    /*background-color: rgba(255, 255, 255, 0.3);*/
    background-color: #9333ea;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>