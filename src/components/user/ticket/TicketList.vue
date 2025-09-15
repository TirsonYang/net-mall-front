<script>
    import axios from "@/utils/request";
    import UseTicket from "@/components/user/ticket/UseTicket.vue";

    export default {
        name: 'TicketList',
        data(){
            return {
                list: [],
                ticket:{
                    tickedId: null,
                    userId: null,
                    productId: null,
                    productName: '',
                    status: null,
                    useTime: null,
                    expireTime: null,
                    orderId: null
                },
                showModel:false,
                editingId: null
            }
        },
        components:{
            UseTicket
        },
        methods:{
            getTicketList(){
                axios.get('/user/ticket/list',{
                    params: {
                        userId: localStorage.getItem("id")
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
            useTicket(id){
                this.showModel=true;
                this.editingId=id;
            },
            getStatusText(status){
                const statusMap={
                    1: "待使用",
                    2: "已使用",
                    3: "已过期"
                }
                return statusMap[status]||"未知";
            },
            closeModel(){
                this.showModel=false;
            },
            afterUse(ticket){
                const ticketId=Number(ticket.ticketId);
                const index=this.list.findIndex(item=>{
                    Number(item.ticketId)===ticketId;
                })
                if (index!==-1){
                    this.list.splice(index,1,{
                        ...this.list[index],
                        status:2,
                        useTime: new Date().toLocaleString()
                    });
                }else {
                    this.getTicketList();
                }
            }
        },
        created() {
            this.getTicketList();
        }
    }
</script>

<template>
    <div class="container">
        <UseTicket :showModel="showModel" :id="editingId" @closeModel="closeModel" @afterUse="afterUse"></UseTicket>
        <div class="table-wrapper">
            <div class="table-operate">
            </div>
            <table>
                <thead>
                <tr>
                    <th>编号</th>
                    <th>商品</th>
                    <th>状态</th>
                    <th>过期时间</th>
                    <th>使用时间</th>
                    <th>订单号</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in list" :key="item.ticketId">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.productName }}</td>
                    <td>
                        <span :class="'status-'+item.status">
                            {{ getStatusText(item.status) }}
                        </span>
                    </td>
                    <td>{{ item.expireTime }}</td>
                    <td>{{ item.useTime }}</td>
                    <td>{{ item.orderNum }}</td>
                    <td>
                        <el-button type="primary" icon="el-icon-goods" @click="useTicket(item.ticketId,index)" v-if="item.status===1"></el-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 5px;
}
/* 外层容器：控制整体位置和间距 */
.container {
    width: 100%;
    padding: 20px; /* 给表格上下左右留空白，避免贴边 */
    box-sizing: border-box; /* 防止padding撑大容器 */
}

/* 表格包装器：控制表格宽度+小屏幕横向滚动 */
.table-wrapper {
    width: 100%;
    max-width: 1200px; /* 限制表格最大宽度，避免大屏下太宽 */
    margin: 0 auto; /* 水平居中 */
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
    white-space: nowrap;
}

.status-1 { background-color: #409eff; }
.status-2 { background-color: #909399; }
.status-3 { background-color: #f56c6c; }

/* 数据单元格样式 */
td {
    color: #4b5563; /* 中灰色文字，比表头浅，形成层级 */
    padding: 14px 20px; /* 与表头内边距一致，保持对齐 */
    font-size: 16px;
    border-bottom: 1px solid #f0f2f5; /* 数据行底部浅边框，分隔行与行 */
    vertical-align: middle; /* 文字垂直居中，避免内容偏移 */
    white-space: nowrap;
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

.table-operate{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-right: 20px;
}

tbody tr:hover{
    background-color: #e9f5ff;
    transition: background-color 0.2s;
}

.status-1, .status-2, .status-3{
    padding: 8px 13px;
    color: white;
    font-weight: lighter;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    display: inline-block; /* 确保padding生效 */
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