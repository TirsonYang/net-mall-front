<script>
import axios from "/src/utils/request";

export default {
    name: 'AdminUpdateStock',
    props: {
        showModel: Boolean,
        id: Number
    },
    data() {
        return {
            stock: null
        }
    },
    methods: {
        closeModel() {
            this.stock=null;
            this.$emit('closeModel');
        },
        updateStock() {
            axios.post("admin/product/updateStock",{
                id:this.id,
                stock:this.stock
            }).then(res=>{
                if (res.data.code==="200"){
                    console.log(res);
                    this.$emit('afterUpdate',this.stock);
                    this.$message.success("修改成功");
                }else {
                    this.$emit('closeModel');
                    console.log(res);
                }
            }).catch(err=>{
                console.log(err);
                this.$emit('closeModel');
                this.$message.info("已取消");
            });
            this.closeModel();
        },
    },
}
</script>

<template>
    <div class="container">
        <div class="modal" v-if="this.showModel">
            <div class="modal-content">
                <h2>更新库存</h2>
                <input type="number" v-model="stock" placeholder="请输入库存" required>
                <div class="form-actions">
                    <button class="btn btn-primary" @click="updateStock">更新</button>
                    <button class="btn btn-secondary" @click="closeModel">取消</button>
                </div>
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