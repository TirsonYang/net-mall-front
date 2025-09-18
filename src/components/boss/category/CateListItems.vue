<script>
import axios from "/src/utils/request";
import AddCategory from "@/components/boss/category/AddCategory.vue";

export default {
    name: "BossCateList",
    components: {AddCategory},
    data() {
        return {
            list: [],
            showModel:false,
            editingId :null,
        }
    },
    created() {
        this.getCategoryList();
    },
    methods: {
        getCategoryList(){
            axios.get('/boss/category/list')
            .then(res=>{
                this.list=res.data.data;
            }).catch(error=>{
                    console.log(error);
                }
            )
        },
        deleteCategory(index){
            this.$confirm('此操作将永久删除该分类及该分类的商品，是否继续？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const id=this.list[index].id;
                axios.delete('/boss/category/delete',{
                    params:{
                        id:id
                    }
                }).then(res=>{
                        console.log(res)
                        this.list.splice(index,1);
                    }).catch(error=>{
                        console.log(error);
                    }
                )
                this.$message.success('删除成功');
            }).catch(()=>{
                this.$message.info('已取消');
            })
        },
        updateCategory(id){
            this.editingId=id;
            this.showModel=true;
        },
        addCategory(){
            this.editingId=null;
            this.showModel=true;
        },
        closeModel() {
            this.showModel=false;
        },
        afterAdd(){
            this.getCategoryList();
        },
        afterUpdate(){
            this.getCategoryList();
        }
    }
}
</script>

<template>
    <div class="categoryTable">
    <AddCategory :showModel="showModel" :id="editingId" @closeModel=closeModel @afterAdd="afterAdd" @afterUpdate="afterUpdate"></AddCategory>

        <div class="table-wrapper">
            <div class="table-operate">
                <el-button type="primary" icon="el-icon-plus" @click="addCategory" style="background-color: #b574ed; border: none;">添加分类</el-button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>描述</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in list" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.categoryName }}</td>
                    <td class="text-ellipsis">{{ item.description }}</td>
                    <td>
                        <el-button type="primary" icon="el-icon-edit" @click="updateCategory(item.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="deleteCategory(index)"></el-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .categoryTable{
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 5px;
    }
    /* 外层容器：控制整体位置和间距 */
    .categoryTable {
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