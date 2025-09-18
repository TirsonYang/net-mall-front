<script>

    import axios from "/src/utils/request";

    export default {
        name: 'BossOrderDetail',
        data(){
            return {
                list: [],
            }
        },
        props:{
            showModel: Boolean,
            orderId: Number,
            orderRemark: String,
        },
        methods:{
            getOrderDetail(orderId){
                axios.get("boss/orderDetail/list",{
                    params:{
                        orderId
                    }
                }).then(
                    res=>{
                        console.log(res);
                        this.list=res.data.data;
                    }
                ).catch(err=>{
                    console.log(err);
                })
            },
            closeModel(){
                this.$emit("closeModel");
            }
        },
        watch:{
            // showModel:{
            //     immediate: true,
            //     handler(newValue){
            //         if (newValue&&this.orderId){
            //             this.getOrderDetail(this.orderId);
            //         }
            //     }
            // },
            orderId: {
                immediate: true,
                handler(newValue, oldValue) {
                    console.log(newValue,oldValue);
                    if (newValue&&newValue>0){
                        this.getOrderDetail(newValue);
                    }
                }
            }
        },
        computed: {
            totalAmount() {
                // 遍历list，累加每个商品的amount（处理空值情况）
                return this.list.reduce((sum, item) => {
                    return sum + (item.amount || 0);
                }, 0);
            }
        },
    }

</script>

<template>
    <div class="container">
        <div v-if="showModel" class="modal">
            <div class="modal-content">
                <table>
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>商品名称</th>
                        <th>图片</th>
                        <th>数量</th>
                        <th>总价</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in list" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.productName }}</td>
                        <td><img :src="item.imageUrl" alt=""></td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.amount }}</td>
                    </tr>
                    <!-- 新增：备注行 - 跨4列，最后1列显示备注内容 -->
                    <tr class="table-remark">
                        <td colspan="4" class="label">订单备注</td>
                        <td>{{ this.orderRemark }}</td>
                    </tr>

                    <!-- 新增：总价行 - 跨4列，最后1列显示计算后的总价 -->
                    <tr class="table-total">
                        <td colspan="4" class="label">订单总价</td>
                        <td>{{ totalAmount }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="form-actions">
                    <button type="button" @click="closeModel">取消</button>
                    <button type="submit" @click="closeModel">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content{
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 700px;
    max-width: 90%;
}
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}
table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-family: Arial, sans-serif;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
th,td {
    padding: 12px 15px;
    text-align: left;
}
th{
    background-color: #f8f9fa;
    font-weight: bold;
    border-bottom: 2px solid #ccc;
}

tbody tr:hover{
    background-color: #e9f5ff;
    transition: background-color 0.2s;
}

img{
    width: 70px;
    height: 70px;
}


</style>