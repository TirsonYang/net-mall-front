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
                selectedCategoryId: '',
                cateList:[],
                fileList: [{name: 'food.jpeg', url: ''}]
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
                this.product = {
                    productName: '',
                    img: '',
                    description: '',
                    price: '',
                    stock: '',
                    categoryId: null
                }
                this.$emit('closeModel');
            },
            submit() {
                axios.post("boss/product/add",this.product).then(
                    res=>{
                        console.log(res);
                    }
                ).catch(err=>{
                    console.log(err);
                })
            },
            handleExceed(){
                alert("只能上传一张图片")
            },
            beforeRemove(file){
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
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
                    <div>
                        <label>图片</label>
                        <el-upload
                            class="upload-demo"
                            action="http://127.0.0.1:17818/boss/product/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
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
                        <select v-model="product.categoryId" required>
                            <option value="">请选择</option>
                            <option v-for="item in cateList" :key="item.id" :value="Number(item.id)">{{item.categoryName}}</option>
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