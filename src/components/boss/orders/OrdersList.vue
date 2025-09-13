<script>

import axios from "axios";
import OrderDetail from "@/components/boss/orders/OrderDetail.vue";

export default {
    name: 'OrdersList',
    components: {OrderDetail},
    data(){
        return {
            list:[],
            orderNum: '',
            startTime:null,
            endTime: null,
            showModel: false,
            editingId: null,
        }
    },
    methods:{
        getOrdersList(){
            axios.get("/boss/orders/list",{
                params:{
                    orderNum: this.orderNum,
                    startTime:this.startTime,
                    endTime:this.endTime
                }
            })
                .then(res=>{
                    this.list=res.data.data;
                }).catch(err=>{
                    console.log(err);
            })
        },
        // TODO 之后加入条件
        exportHandler(){
            axios.get("/boss/orders/export",{
                params:{
                    orderNum: this.orderNum,
                    startTime:this.startTime,
                    endTime:this.endTime
                },
                responseType: "blob"
            }).then(res=>{
                // 创建下载链接
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');

                // 从响应头获取文件名
                const contentDisposition = res.headers['content-disposition'];
                let fileName = '订单导出.zip';

                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename=(.+)/);
                    if (fileNameMatch && fileNameMatch.length === 2) {
                        fileName = decodeURIComponent(fileNameMatch[1]);
                    }
                }

                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();

                // 清理
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            }).catch(err=>{
                console.log(err);
            })
        },
        deliverHandler(index){
            if (this.list[index].status!==2){
                this.$message.error("请检查订单状态!");
                return;
            }
            const id=this.list[index].id;
            axios.post("boss/orders/updateStatus",{
                id: id,
                status: 3
            }).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
                }
            )
            this.list[index].status=3;
        },
        getDetail(orderId){
            this.showModel=true;
            this.editingId=orderId;
        },
        closeModel(){
            this.showModel=false;
        },
        getStatusText(status){
            const statusMap={
                1: "待支付",
                2: "已支付",
                3: "已送达",
                4: "已完成",
                5: "已取消"
            }
            return statusMap[status]||"未知";
        }
    },
    created() {
        this.getOrdersList();
    }
}
</script>

<template>
    <div class="orderDiv">
        <OrderDetail :show-model="showModel" :orderId="editingId" @closeModel=closeModel></OrderDetail>
        <div class="params-input">
            <div>
                <span>开始时间  </span>
                <input type="datetime-local" v-model="startTime">
            </div>
            <div>
                <span>结束时间  </span>
                <input type="datetime-local" v-model="endTime">
            </div>
            <div>
                <span v-bind="this.orderNum">订单号  </span>
                <input type="text" v-model="orderNum">
            </div>
            <div>
                <el-button type="primary" icon="el-icon-search" @click="getOrdersList">搜索</el-button>
                <el-button type="primary" icon="el-icon-download" @click="exportHandler">导出</el-button>
            </div>
        </div>
        <div class="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>订单号</th>
                    <th>状态</th>
                    <th>会员</th>
                    <th>机位</th>
                    <th>总价</th>
                    <th>优惠</th>
                    <th>实际支付</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in list" :key="item.id">
                    <th>{{ index+1}}</th>
                    <th>{{ item.orderNum }}</th>
                    <!--                    TODO 状态添加不同样式-->
                    <th>
                        <span :class="'status-'+item.status">
                            {{ getStatusText(item.status) }}
                        </span>
                    </th>
                    <th>{{ item.userId }}</th>
                    <th>{{ item.computerId }}</th>
                    <th>{{ item.total }}</th>
                    <th>{{ item.preference }}</th>
                    <th>{{ item.amount }}</th>
                    <th class="text-ellipsis">{{ item.remark }}</th>
                    <th>
                        <el-button type="info" @click="getDetail(item.id)">详情</el-button>
                        <el-button type="primary" @click="deliverHandler(index)">送达</el-button>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

    .params-input{
        display: flex;
        width: 1200px;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 100px;
        margin-right: 300px;
    }

    .orderDiv{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        margin-top: 5px;
    }
    /* 外层容器：控制整体位置和间距 */
    .orderDiv {
        width: 100%;
        padding: 20px; /* 给表格上下左右留空白，避免贴边 */
        box-sizing: border-box; /* 防止padding撑大容器 */
    }

    /* 表格包装器：控制表格宽度+小屏幕横向滚动 */
    .table-wrapper {
        width: 100%;
        /* 水平居中 */
        margin: 10px auto 0;
        overflow-x: auto; /* 小屏幕时表格可横向滚动，避免内容挤压 */
        border-radius: 8px; /* 外层圆角（包裹表格） */
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* 轻微阴影，提升层次感 */
    }

    /* 表格核心样式 */
    table {
        width: 100%;
        border-collapse: collapse; /* 合并边框，避免重复线条 */
        background-color: #fff; /* 白色背景，干净清爽 */
        border-radius: 8px; /* 表格圆角（需配合overflow:hidden，或外层包装器实现） */
        overflow: hidden; /* 让表格圆角生效（裁剪内部边框） */
    }

    /* 表头样式：突出区分 */
    th {
        background-color: #f5f7fa; /* 浅灰蓝背景，区别于数据行 */
        color: #1f2937; /* 深灰色文字，提升可读性 */
        font-weight: 600; /* 字体加粗，强调表头 */
        padding: 14px 20px; /* 内边距：上下14px，左右20px（足够呼吸感） */
        text-align: left; /* 文字左对齐（比居中更适合表格阅读） */
        font-size: 18px;
        border-bottom: 1px solid #e5e7eb; /* 表头底部边框，分隔表头和数据 */
    }

    /* 数据单元格样式 */
    td {
        color: #4b5563; /* 中灰色文字，比表头浅，形成层级 */
        padding: 14px 20px; /* 与表头内边距一致，保持对齐 */
        font-size: 16px;
        border-bottom: 1px solid #f0f2f5; /* 数据行底部浅边框，分隔行与行 */
        vertical-align: middle; /* 文字垂直居中，避免内容偏移 */
    }

    /* 行交互：hover时变色，提升交互感 */
    tbody tr:hover {
        background-color: #fafbfc; /* hover浅灰背景，不刺眼 */
        cursor: default; /* 鼠标不变指针，避免误解为可点击链接 */
    }

    /* 斑马纹：隔行变色，提升多行数据可读性 */
    tbody tr:nth-child(even) {
        background-color: #fefeff; /* 偶数行略浅背景，与奇数行区分 */
    }

    /* 长文本处理：溢出显示省略号（避免表格变形） */
    .text-ellipsis {
        white-space: nowrap; /* 文字不换行 */
        overflow: hidden; /* 溢出内容隐藏 */
        text-overflow: ellipsis; /* 溢出显示省略号 */
        max-width: 400px; /* 限制描述列最大宽度（根据需求调整） */
    }

    /*#header-button{
        border-radius: 5px;
        border-style: none;
        background-color: #bd74e3;
        width: 100px;
        height: 40px;
        font-family: Sans-serif,serif;
    }*/

    .status-1{
        padding: 8px 13px;
        background-color: #409eff;
        color: white;
        font-weight: lighter;
        font-size: 14px;
        border-radius: 5px;
        border: none;
    }

    .status-2{
        padding: 8px 13px;
        background-color: #67c23a;
        color: white;
        font-weight: lighter;
        font-size: 14px;
        border-radius: 5px;
        border: none;
    }

    .status-3{
        padding: 8px 13px;
        background-color: #e6a23c;
        color: white;
        font-weight: lighter;
        font-size: 14px;
        border-radius: 5px;
        border: none;
    }

    .status-4{
        padding: 8px 13px;
        background-color: #909399;
        color: white;
        font-weight: lighter;
        font-size: 14px;
        border-radius: 5px;
        border: none;
    }

    .status-5{
        padding: 8px 13px;
        background-color: #f56c6c;
        color: white;
        font-weight: lighter;
        font-size: 14px;
        border-radius: 5px;
        border: none;
    }

    /* 适配小屏幕：进一步优化单元格间距 */
    @media (max-width: 768px) {
        th, td {
            padding: 12px 16px; /* 小屏幕减小内边距，节省空间 */
        }
        .text-ellipsis {
            max-width: 200px; /* 小屏幕缩小描述列最大宽度 */
        }
    }

</style>