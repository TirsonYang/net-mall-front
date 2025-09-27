<script>

import axios from "@/utils/request";

    export default {
        name: 'BossTicketList',
        data(){
            return {
                userId: null,
                list: []

            }
        },
        methods:{
            getTicketList(){
                axios.get('/boss/ticket/list',{
                    params:{
                        userId: this.userId
                    }
                }).then(
                    res=>{
                        if (res.data.code==='200'){
                            console.log(res);
                            this.list=res.data.data;
                        }
                    }
                ).catch(err=>{
                    console.error(err);
                })
            },
            getStatusText(status){
                const statusMap={
                    1: "未使用",
                    2: "已使用",
                    3: "已过期"
                };
                return statusMap[status]||"未知";
            }
        },
        created() {
            this.getTicketList();
        }
    }
</script>

<template>

    <div class="ticketDiv">
<!--        <OrderDetail :show-model="showModel" :orderId="editingId" :orderRemark="orderRemark" @closeModel=closeModel></OrderDetail>-->
        <!-- 查询条件区域 -->
        <div class="params-input">
<!--            <div class="input-item">-->
<!--                <span>开始时间</span>-->
<!--                <input type="datetime-local" v-model="startTime">-->
<!--            </div>-->
<!--            <div class="input-item">-->
<!--                <span>结束时间</span>-->
<!--                <input type="datetime-local" v-model="endTime">-->
<!--            </div>-->
            <div class="input-item">
                <span>会员号</span>
                <input type="text" v-model="userId" placeholder="请输入会员号">
            </div>
            <div class="button-group">
                <el-button type="primary" icon="el-icon-search" @click="getTicketList">搜索</el-button>
<!--                <el-button type="primary" icon="el-icon-download" @click="exportHandler">导出</el-button>-->
            </div>
        </div>
        <!-- 表格区域 -->
        <div class="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>商品</th>
                    <th>用户名</th>
                    <th>状态</th>
                    <th>过期时间</th>
                    <th>使用时间</th>
                    <th>订单号</th>
<!--                    <th>操作</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in list" :key="item.id">
                    <td>{{ index+1}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{ item.username }}</td>
                    <td>
                        <span :class="'status-'+item.status">
                            {{ getStatusText(item.status) }}
                        </span>
                    </td>
                    <td>{{ item.expireTime }}</td>
                    <td>{{ item.useTime }}</td>
                    <td>{{ item.orderNum }}</td>
<!--                    <td>-->
<!--                        <el-button type="info" @click="getDetail(item.id)">详情</el-button>-->
<!--                        <el-button type="primary" @click="deliverHandler(index)" v-if="item.status===2">送达</el-button>-->
<!--                    </td>-->
                </tr>
                </tbody>
            </table>
        </div>
    </div>


</template>

<style scoped>

    .ticketDiv{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        margin-top: 5px;
    }

    .params-input{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        margin: 0 0 24px 0;
        gap: 16px;
        flex-wrap: wrap;
    }

    .input-item{
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1 1 auto;
        min-width: 220px;
        max-width: 320px;
    }

    .input-item span{
        min-width: 80px;
        white-space: nowrap;
        font-size: 14px;
    }

    .input-item input{
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 14px;
    }

    .button-group{
        display: flex;
        gap: 12px;
        min-width: 200px;
        justify-content: flex-start;
    }

    .table-wrapper{
        width: 100%;
        margin: 0 auto;
        overflow-x: auto;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    table{
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
    }


    th{
        background-color: #f5f7fa;
        color: #1f2937;
        font-weight: 600;
        padding: 14px 20px;
        text-align: left;
        font-size: 18px;
        border-bottom: 1px solid #e5e7eb;
        white-space: nowrap;
    }

    td{
        color: #4b5563;
        padding: 14px 20px;
        font-size: 16px;
        border-bottom: 1px solid #f0f2f5;
        vertical-align: middle;
        white-space: nowrap;
    }

    /* 行交互效果 */
    tbody tr:hover {
        background-color: #fafbfc;
        cursor: default;
    }

    tbody tr:nth-child(even) {
        background-color: #fefeff;
    }

    /* 长文本处理：备注列溢出显示省略号 */
    .text-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px; /* 初始宽度，小屏再调整 */
    }

    /* 订单状态标签样式 */
    .status-1, .status-2, .status-3, .status-4, .status-5 {
        padding: 8px 13px;
        color: white;
        font-weight: lighter;
        font-size: 14px;
        border-radius: 5px;
        border: none;
        display: inline-block; /* 确保padding生效 */
    }

    .status-1 { background-color: #409eff; }
    .status-2 { background-color: #67c23a; }
    .status-3 { background-color: #e6a23c; }
    .status-4 { background-color: #909399; }
    .status-5 { background-color: #f56c6c; }

    /* ===================== 媒体查询：分断点适配 ===================== */
    /* 中大屏（1024px以下）：微调间距，提前换行 */
    @media (max-width: 1024px) {
        .params-input {
            gap: 14px;
        }
        .input-item {
            max-width: 280px;
        }
        th, td {
            padding: 13px 16px;
            font-size: 17px;
        }
        .text-ellipsis {
            max-width: 160px;
        }
    }

    /* 平板（768px以下）：压缩查询区，输入项更早换行 */
    @media (max-width: 768px) {
        .orderDiv {
            padding: 15px;
        }
        .params-input {
            gap: 12px;
            margin-bottom: 18px;
        }
        .input-item {
            min-width: 200px;
            max-width: 260px;
        }
        th, td {
            padding: 12px 14px;
            font-size: 16px;
        }
        .status-1, .status-2, .status-3, .status-4, .status-5 {
            padding: 7px 11px;
            font-size: 13px;
        }
        .text-ellipsis {
            max-width: 140px;
        }
    }

    /* 手机（480px以下）：查询区纵向排列，按钮组居中 */
    @media (max-width: 480px) {
        .orderDiv {
            padding: 10px;
        }
        .params-input {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
        }
        .input-item {
            min-width: auto;
            max-width: 100%;
        }
        .button-group {
            justify-content: center;
        }
        th, td {
            padding: 10px 8px;
            font-size: 14px;
        }
        .el-button--info, .el-button--primary {
            padding: 6px 10px;
            font-size: 12px;
            margin-right: 5px;
        }
        .status-1, .status-2, .status-3, .status-4, .status-5 {
            padding: 6px 8px;
            font-size: 12px;
        }
        .text-ellipsis {
            max-width: 100px;
        }
        /* 操作按钮换行 */
        td .el-button {
            display: block;
            width: 100%;
            margin-right: 0;
            margin-bottom: 5px;
        }
        td .el-button:last-child {
            margin-bottom: 0;
        }
    }






</style>