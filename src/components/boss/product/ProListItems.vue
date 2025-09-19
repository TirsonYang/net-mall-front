<script>
import axios from "/src/utils/request";
import AddProduct from "./AddProduct";
import CateItems from "@/components/boss/product/CateItems.vue";
import ReleaseTicket from "@/components/boss/product/ReleaseTicket.vue";
export default {
    name: "BossProList",
    components:{
        CateItems,
        AddProduct,
        ReleaseTicket
    },
    data(){
        return {
            list:[],
            showModel: false,
            showTicketModel: false,
            currentCategoryId: null,
            editingId: null,
            selectedCategoryId: null
        }
    },
    methods:{
        getProductList(categoryId){
            axios.get("boss/product/list",{
                params:{
                    categoryId: categoryId
                }
            }).then(res=>{
                this.list=res.data.data;
            }).catch(err=>{
                console.log(err);
            })
        },
        handleCategoryChange(categoryId) {
            this.currentCategoryId=categoryId;
            this.getProductList(categoryId);
        },
        deleteProduct(index) {

            this.$confirm("是否确认删除该商品？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const id = this.list[index].id;
                axios.delete("/boss/product/delete", {
                    params: {
                        id: id
                    }
                }).then(res => {
                    if (res.data.code === "200") {
                        this.list.splice(index, 1);
                        console.log(res.data.data);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                })
            })
        },
        addProduct(){
            this.editingId=null;
            this.showModel=true;
        },
        updateProduct(id){
            this.editingId=id;
            this.selectedCategoryId=this.list.find(item=>item.id===id).categoryId;
            this.showModel=true;
        },
        outList(id){
            this.list.splice(this.list.findIndex(item=>item.id===id),1)
        },
        releaseTicket(id){
            this.editingId=id;
            this.showTicketModel=true;
        },
        closeModel() {
            this.showModel=false;
            this.editingId=null;
        },
        closeTicketModel() {
            this.showTicketModel=false;
        },
        afterAdd(product) {
            if (this.currentCategoryId===product.categoryId){
                this.list.push(product);
            }
        },
        afterUpdate(product){
            if (this.currentCategoryId!==product.categoryId){
                if (this.currentCategoryId !== product.categoryId) {
                    const index = this.list.findIndex(item => item.id === product.id);
                    if (index !== -1) {
                        this.list.splice(index, 1);
                    }
                }
            }else{
                this.list.forEach(item=>{
                    if (item.id===product.id){
                        item.productName=product.productName;
                        item.description=product.description;
                        item.imageUrl=product.imageUrl;
                        item.price=product.price;
                        item.stock=product.stock;
                        item.categoryId=product.categoryId;
                    }
                })
            }
        },
    },
}
</script>

<template>
    <div class="father">
        <el-container>
            <el-aside>
                <CateItems @category-change="handleCategoryChange"></CateItems>
            </el-aside>
            <el-main>
                <div class="productTable">
                    <ReleaseTicket :showTicketModel="showTicketModel" :id="editingId" @closeTicketModel="closeTicketModel"></ReleaseTicket>
                    <AddProduct :showModel="showModel" :id="editingId" @closeModel=closeModel @afterAdd="afterAdd" @afterUpdate="afterUpdate" :selectedCategoryId="selectedCategoryId"></AddProduct>
                    <div class="table-wrapper">
                        <div class="table-operate">
                            <el-button type="primary" icon="el-icon-plus" @click="addProduct" style="background-color: #b574ed; border: none;">添加商品</el-button>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th>编号</th>
                                <th style="text-align: center">图片</th>
                                <th>名称</th>
                                <th>描述</th>
                                <th>价格</th>
                                <th>库存</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in this.list" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td><img :src="item.imageUrl" alt=""></td>
                                <td>{{ item.productName }}</td>
                                <td class="text-ellipsis">{{ item.description }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.stock }}</td>
                                <td>
                                    <el-button type="primary" icon="el-icon-edit" @click="updateProduct(item.id)"></el-button>
                                    <el-button type="danger" icon="el-icon-delete" @click="deleteProduct(index)"></el-button>
                                    <el-button type="success" icon="el-icon-goods" @click="releaseTicket(item.id)"></el-button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
/* 核心调整：大屏保持横向布局，小屏转为纵向布局，避免挤压 */
.father{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 0;
    gap: 20px;
    height: 100%;
    margin: 20px;
    box-sizing: border-box; /* 新增：确保padding/margin不撑大容器 */
}

/* 商品区域：固定宽度改自适应，大屏不超过1200px，小屏占满 */
.productTable {
    flex: 1; /* 自适应剩余空间 */
    width: 100%; /* 小屏占满宽度 */
    max-width: 1200px; /* 大屏限制最大宽度 */
    padding: 20px;
    box-sizing: border-box;
    margin: 0;
    min-height: 400px;
}

.table-operate{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-right: 20px;
}

.table-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow-x: auto; /* 保持横向滚动，小屏避免表格溢出 */
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

th {
    background-color: #f5f7fa;
    color: #1f2937;
    font-weight: 600;
    padding: 14px 20px;
    text-align: left;
    font-size: 18px;
    border-bottom: 1px solid #e5e7eb;
}

td {
    color: #4b5563;
    padding: 14px 20px;
    font-size: 16px;
    border-bottom: 1px solid #f0f2f5;
    vertical-align: middle;
}

tbody tr:hover {
    background-color: #fafbfc;
    cursor: default;
}

tbody tr:nth-child(even) {
    background-color: #fefeff;
}

.text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
}

img{
    max-width: 100%;
    max-height: 100px;
    display: block;
    margin: 0 auto;
    object-fit: contain;
}

/* 大屏（1200px以上）：微调间距，保持原有比例 */
@media (max-width: 1200px) {
    .father {
        margin: 15px;
        gap: 15px;
    }
    .productTable {
        padding: 18px;
    }
    th, td {
        padding: 13px 18px;
        font-size: 17px; /* 表头略缩 */
    }
    .text-ellipsis {
        max-width: 300px; /* 描述列缩窄 */
    }
}

/* 中屏（平板，992px以下）：进一步压缩间距 */
@media (max-width: 992px) {
    th, td {
        padding: 12px 16px;
        font-size: 16px;
    }
    .text-ellipsis {
        max-width: 250px;
    }
    img {
        max-height: 90px; /* 图片缩小 */
    }
    .table-operate {
        margin-right: 10px;
    }
}

/* 小屏（手机，768px以下）：横向转纵向布局，分类在上，表格在下 */
@media (max-width: 768px) {
    .father {
        flex-direction: column; /* 核心：纵向排列 */
        margin: 10px;
        gap: 10px;
    }
    .productTable {
        padding: 15px;
        max-width: 100%; /* 占满屏幕 */
    }
    th, td {
        padding: 11px 14px;
        font-size: 14px; /* 字体缩小 */
    }
    .text-ellipsis {
        max-width: 180px; /* 描述列进一步缩窄 */
    }
    img {
        max-height: 80px;
    }
    /* 按钮区域：小屏右对齐改为左对齐，避免右侧留白 */
    .table-operate {
        justify-content: flex-start;
        margin-right: 0;
        margin-bottom: 15px;
    }
    /* 操作按钮：小屏用mini尺寸，避免挤压 */
    .el-button--primary, .el-button--danger, .el-button--success {
        padding: 7px 10px;
        font-size: 12px;
    }
}

/* 超小屏（480px以下）：极限适配 */
@media (max-width: 480px) {
    .father {
        margin: 5px;
    }
    .productTable {
        padding: 10px;
    }
    th, td {
        padding: 10px 8px;
        font-size: 13px;
    }
    .text-ellipsis {
        max-width: 120px;
    }
    img {
        max-height: 70px;
    }
    /* 隐藏编号列（非核心信息），节省空间 */
    th:first-child, td:first-child {
        display: none;
    }
}
</style>