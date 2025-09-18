<script>
import axios from "/src/utils/request";

export default {
    name: 'BossAddPro',
    props: {
        showModel: Boolean,
        id: Number
    },
    data() {
        return {
            product: {
                id: null,
                productName: '',
                imageUrl: '',
                description: '',
                price: '',
                stock: '',
                categoryId: ''
            },
            selectedCategoryId: '',
            cateList: [],
            fileList: []
        }
    },
    methods: {
        getCateList() {
            axios.get("boss/product/getCate")
                .then(res => {
                    this.cateList = res.data.data;
                }).catch(err => {
                console.log(err);
            })
        },
        closeModel() {
            this.product = {
                productName: '',
                imageUrl: '',
                description: '',
                price: '',
                stock: '',
                categoryId: null
            }
            this.$emit('closeModel');
        },
        submit() {
            if (this.id==null){
                axios.post("boss/product/add",this.product).then(
                    res=>{
                        console.log(res);
                        this.$message.success("添加成功");
                    }
                ).catch(
                    err=>{
                        console.log(err);
                        this.$message.info("已取消");
                    }
                );
                this.$emit('afterAdd', this.product);
                this.product = {
                    productName: '',
                    imageUrl: '',
                    description: '',
                    price: '',
                    stock: '',
                    categoryId: null
                }
            }else {
                this.product.id=this.id;
                axios.post("boss/product/update",this.product).then(
                    res=>{
                        console.log(res);
                        this.$message.success("修改成功");
                    }
                ).catch(err=>{
                    console.log(err);
                    this.$message.info("已取消");
                });
                this.$emit('afterUpdate', this.product);
            }
            this.$emit('closeModel');
        },
        //图片回显
        handleAvatarSuccess(res) {
            console.log("后端返回数据：",res);
            console.log("后端返回的图片路径：", res.data);
            this.product.imageUrl = res.data;
            console.log("赋值后product.imageUrl：", this.product.imageUrl);
            sessionStorage.setItem("imgUrl", this.product.imageUrl)
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
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
                        <input type="text" v-model="product.productName" required>
                    </div>
                    <div>
                        <label>图片</label>
                        <el-upload
                            v-model="product.imageUrl"
                            class="avatar-uploader"
                            action="http://localhost:17818/boss/product/upload/img"
                            :show-file-list="false"
                            :with-credentials="true"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="product.imageUrl" :src="product.imageUrl" class="avatar" alt="图片无法加载">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
                            <option v-for="item in cateList" :key="item.id" :value="Number(item.id)">
                                {{ item.categoryName }}
                            </option>
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}


</style>