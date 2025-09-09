<script>
import axios from "axios";

export default {
    name: "CateItems",
    data() {
        return {
            list: []
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
                }).catch(err => {
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
                <td><a href="#">{{item.categoryName}}</a></td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
#table {
    width: 200px;
    height: calc(100vh - 200px);
    background-image: linear-gradient(#8dd3e3, #bd74e3);
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
    max-height: calc(100vh - 140px);
    overflow-y: auto;
}
</style>