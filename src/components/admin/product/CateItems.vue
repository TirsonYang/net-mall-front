<script>
    import axios from "axios";

    export default {
        name: "CateItems",
        data(){
            return {
                list:[]
            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            getCateList(){
                axios.get("admin/product/getCate")
                    .then(res=>{
                        this.list=res.data.data;
                    }).catch(err=>{
                        console.log(err);
                })
            }
        }
    }
</script>

<template>
    <div class="cateList">
        <div id="table">
            <ul>
                <li v-for="items in list" :key="items.id">
                    <span id="items">{{items.categoryName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .cateList{
        margin: 30px;
    }
    #table{
        width: 200px;
        height: auto;
        overflow-y: auto;
        box-sizing: border-box;
        background-color: #bd74e3;
        border-radius: 5px;
    }
    #items{
        width: 80%;
        height: 80px;
        padding: 20px;
        margin: 10px;
        box-sizing: border-box;
    }
    li{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
</style>