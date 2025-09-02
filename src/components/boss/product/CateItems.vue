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
                axios.get("boss/product/getCate")
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
    <div id="table">
        <table>
            <tr v-for="item in list" :key="item.id">
                <th>{{item.categoryName}}</th>
            </tr>
        </table>
    </div>
</template>

<style scoped>
    #table{
        width: 200px;
        height: 660px;
        background-color: #bd74e3;
        border-radius: 5px;
        margin-top: 20px;
        margin-left: 20px;
    }
    table{
        width: 100%;
        height: 100%;
    }
</style>