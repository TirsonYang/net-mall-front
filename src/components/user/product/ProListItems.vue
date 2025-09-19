<script>
import axios from "/src/utils/request";
import CateItems from "@/components/boss/product/CateItems.vue";
export default {
    name: "UserProList",
    components:{
        CateItems,
    },
    data(){
        return {
            list:[],
            showModel: false,
            showTicketModel: false,
            currentCategoryId: null,
            editingId: null,
            cartList:[] // 购物车数据
        }
    },
    computed: {
        // 计算购物车商品总数
        cartTotal() {
            return this.cartList.reduce((total, item) => total + item.number, 0);
        },
        // 计算购物车商品总价
        cartTotalPrice() {
            return this.cartList.reduce((total, item) => total + (item.price * item.number), 0).toFixed(2);
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
        deleteProduct(index){
            const id=this.list[index].id;
            axios.delete("/boss/product/delete",{
                params:{
                    id:id
                }
            }).then(res=>{
                    console.log(res);
                    this.list.splice(index,1);
                }
            ).catch(err=>{
                console.log(err);
            })
        },
        addProduct(){
            this.editingId=null;
            this.showModel=true;
        },

        closeModel() {
            this.showModel=false;
        },
        closeTicketModel() {
            this.showTicketModel=false;
        },
        afterAdd(product) {
            this.list.push(product);
        },
        afterUpdate(product){
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
        },
        // 添加到购物车
        addToCart(product) {
            // 检查商品是否已在购物车中
            const existingItem = this.cartList.find(item => item.productId === product.id);

            const cartItem={
                productId: product.id,
                userId: localStorage.getItem("id"),
                productName: product.productName,
                imageUrl: product.imageUrl,
                number: null,
                price: product.price
            }

            if (existingItem) {
                cartItem.number=++existingItem.number;
            } else {
                // 如果不存在，添加到购物车
                this.cartList.push({
                    ...product,
                    number: 1
                });
                cartItem.number=1;
            }

            axios.post("user/shoppingCart/add",cartItem).then(res=>{
                console.log(res);
                if (res.data.code==="200"){
                    this.getCartList();
                    this.$message.success(`${product.productName}已添加到购物车`);
                }else {
                    this.$message.error(`添加失败`)
                }
            }).catch(err=>{
                console.log(err);
            })



            // 可以添加提示信息
            //this.$message.success(`${product.productName}已添加到购物车`);
        },

        getCartList(){
            axios.get("user/shoppingCart/list",{
                params:{
                    userId: localStorage.getItem("id")
                }
            }).then(res=>{
                console.log(res);
                this.cartList=res.data.data;
            }).catch(err=>{
                console.log(err);
            })
        },

        // 从购物车移除
        removeFromCart(index) {
            axios.delete("user/shoppingCart/delete",{
                params:{
                    id: this.cartList[index].id
                }
            }).then(res=>{
                if (res.data.code==="200"){
                    this.cartList.splice(index, 1);
                    this.$message.info('已从购物车移除');
                }
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })

        },
        // 减少购物车商品数量
        decreaseQuantity(index) {
            if (this.cartList[index].number > 1) {
                const newNumber=this.cartList[index].number-1;
                axios.post("user/shoppingCart/update",{
                    id: this.cartList[index].id,
                    productId: this.cartList[index].productId,
                    userId: localStorage.getItem("id"),
                    number: newNumber
                }).then(res=>{
                    if (res.data.code==="200"){
                        this.cartList[index].number--;
                        console.error("更新成功");
                    }
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            } else {
                this.removeFromCart(index);
            }
        },
        // 增加购物车商品数量
        increaseQuantity(index) {
            const newNumber=this.cartList[index].number+1;
            axios.post("user/shoppingCart/update",{
                id: this.cartList[index].id,
                productId: this.cartList[index].productId,
                userId: localStorage.getItem("id"),
                number: newNumber
            }).then(res=>{
                if (res.data.code==="200"){
                    console.error("更新成功");
                    this.cartList[index].number++;
                }
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })

        },
        judgeShow(id){
           return !this.cartList.find(item=>item.productId===id);
        }
    },
    created() {
        this.getCartList();
    }
}
</script>

<template>
    <div class="father">
        <el-container>
            <!-- 左侧分类栏 -->
            <el-aside width="220px">
                <CateItems @category-change="handleCategoryChange"></CateItems>
            </el-aside>

            <!-- 中间商品列表 -->
            <el-main>
                <div class="productTable">
                    <div class="table-wrapper">
<!--                        <div class="table-operate">-->
<!--                            <el-button type="primary" icon="el-icon-plus" @click="addProduct"-->
<!--                                       style="background-color: #b574ed; border: none;">添加商品-->
<!--                            </el-button>-->
<!--                        </div>-->
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
                            <tr v-for="(item, index) in list" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td><img :src="item.imageUrl" :alt="item.productName"></td>
                                <td>{{ item.productName }}</td>
                                <td class="text-ellipsis">{{ item.description }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.stock }}</td>
                                <td>
                                    <el-button
                                        type="primary"
                                        icon="el-icon-shopping-cart-2"
                                        @click="addToCart(item)"
                                        v-show="judgeShow(item.id)"
                                    ></el-button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-main>

            <!-- 右侧购物车 -->
            <el-aside width="300px" class="cart-aside">
                <div class="cart-header">
                    <h3>购物车 <span class="cart-count">{{ cartTotal }}</span></h3>
                </div>

                <div class="cart-body">
                    <div v-if="cartList.length === 0" class="empty-cart">
                        <el-empty description="购物车是空的"></el-empty>
                    </div>

                    <div v-else class="cart-items">
                        <div v-for="(item, index) in cartList" :key="item.id" class="cart-item">
                            <img :src="item.imageUrl" :alt="item.productName" class="cart-item-img">
                            <div class="cart-item-info">
                                <div class="cart-item-name">{{ item.productName }}</div>
                                <div class="cart-item-price">￥{{ item.price }}</div>
                                <div class="cart-item-quantity">
                                    <el-button
                                        size="mini"
                                        @click="decreaseQuantity(index)"
                                    >-</el-button>
                                    <span>{{ item.number }}</span>
                                    <el-button
                                        size="mini"
                                        @click="increaseQuantity(index)"
                                    >+</el-button>
                                    <el-button
                                        size="mini"
                                        type="text"
                                        @click="removeFromCart(index)"
                                        class="remove-btn"
                                    >移除</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="cartList.length > 0" class="cart-footer">
                    <div class="total-price">
                        总计: <span class="price">￥{{ cartTotalPrice }}</span>
                    </div>
                    <el-button type="primary" style="width: 100%; background-color: #b574ed; border: none;">
                        结算
                    </el-button>
                </div>
            </el-aside>
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
    box-sizing: border-box;
}

/* 商品区域：固定宽度改自适应，大屏不超过1200px，小屏占满 */
.productTable {
    flex: 1;
    width: 100%;
    max-width: 1200px;
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
    overflow-x: auto;
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

el-container{
    height: 100%;
    width: 100%;
}

el-aside{
    background-color: #fff;
    color: #333;
    text-align: center;
    /* 去掉固定行高，让内容自适应 */
}

/* 购物车样式 */
.cart-aside {
    border-left: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
}

.cart-header {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
}

.cart-count {
    background-color: #b574ed;
    color: white;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 12px;
    margin-left: 8px;
}

.cart-body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
}

.cart-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #f0f2f5;
}

.cart-item-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
}

.cart-item-info {
    flex: 1;
    text-align: left;
    padding-left: 12px;
}

.cart-item-name {
    font-size: 14px;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cart-item-price {
    color: #f56c6c;
    margin-bottom: 8px;
}

.cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 8px;
}

.remove-btn {
    color: #909399;
    margin-left: 8px;
}

.cart-footer {
    padding: 16px;
    border-top: 1px solid #e5e7eb;
}

.total-price {
    text-align: right;
    margin-bottom: 12px;
    font-size: 16px;
}

.price {
    color: #f56c6c;
    font-weight: bold;
    font-size: 18px;
}

.empty-cart {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 响应式调整 */
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
        font-size: 17px;
    }
    .text-ellipsis {
        max-width: 300px;
    }
}

@media (max-width: 992px) {
    th, td {
        padding: 12px 16px;
        font-size: 16px;
    }
    .text-ellipsis {
        max-width: 250px;
    }
    img {
        max-height: 90px;
    }
    .table-operate {
        margin-right: 10px;
    }
    /* 购物车宽度调整 */
    el-aside:nth-child(3) {
        width: 260px !important;
    }
}

@media (max-width: 768px) {
    .father {
        flex-direction: column;
        margin: 10px;
        gap: 10px;
    }
    .productTable {
        padding: 15px;
        max-width: 100%;
    }
    th, td {
        padding: 11px 14px;
        font-size: 14px;
    }
    .text-ellipsis {
        max-width: 180px;
    }
    img {
        max-height: 80px;
    }
    .table-operate {
        justify-content: flex-start;
        margin-right: 0;
        margin-bottom: 15px;
    }
    .el-button--primary, .el-button--danger, .el-button--success {
        padding: 7px 10px;
        font-size: 12px;
    }
    /* 购物车在小屏显示为全宽 */
    el-container {
        flex-direction: column !important;
    }
    el-aside {
        width: 100% !important;
    }
    el-aside:nth-child(3) {
        order: 3;
        border-left: none;
        border-top: 1px solid #e5e7eb;
    }
}

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
    th:first-child, td:first-child {
        display: none;
    }
}
</style>
