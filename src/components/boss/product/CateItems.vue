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
                <th>{{ item.categoryName }}</th>
            </tr>
        </table>
    </div>
</template>

<style scoped>
#table {
    width: 30%;
    height: 60%;
    background-image: linear-gradient(#8dd3e3, #bd74e3);
    border-radius: 5px;
    margin: 50px;
}
</style>