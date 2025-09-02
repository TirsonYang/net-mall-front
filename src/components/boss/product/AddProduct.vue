<script>
    import axios from "axios";

    export default {
        name: 'AddProduct',
        props:{
            showModel:Boolean
        },
        data() {
            return{
                product: {
                    productName: '',
                    img: '',
                    description: '',
                    price: '',
                    stock: '',
                    categoryId: ''
                },
                cateList:[],
            }
        },
        methods:{
            getCateList(){
                axios.get("boss/product/getCate")
                    .then(res=>{
                        this.cateList=res.data.data;
                    }).catch(err=>{
                        console.log(err);
                })
            },
            closeModel(){
                this.$emit('closeModel');
            },
            submit() {
                axios.post("boss/product/add",this.product)
            }
        },
        created() {
            this.getCateList();
        }
    }
</script>

<template>
    <div class="container">
        <div class="modal" v-if="this.showModel">
            <div class="modal-content">
                <h2>添加商品</h2>

                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label>商品名称</label>
                        <input type="text" v-model="product.name" required>
                    </div>

                    <div class="form-group">
                        <label>图片</label>
                        <input type="file" required>
                    </div>
                    <div class="form-group">
                        <label>描述</label>
                        <textarea v-model="product.description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>价格</label>
                        <input type="number" v-model="product.price" required>
                    </div>
                    <div class="form-group">
                        <label>库存</label>
                        <input type="number" v-model="product.stock" required>
                    </div>
                    <div class="form-group">
                        <label>分类</label>
                        <select v-model="product.category" required>
                            <option value="">请选择</option>
                            <option v-for="item in cateList" :key="item.id">{{item.categoryName}}</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" @click="closeModel">取消</button>
                        <button type="submit" @click="submit">确认</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        max-width: 90%;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
    }

    .form-group input,
    .form-group select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }
</style>