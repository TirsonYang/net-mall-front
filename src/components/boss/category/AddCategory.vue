<script>
    import axios from "axios";

    export default {
        name: 'AddCategory',
        props:{
            showModel:Boolean,
            id: Number
        },
        data() {
            return{
                category: {
                    id: null,
                    categoryName: '',
                    description: '',
                },
            }
        },
        methods:{
            closeModel(){
                this.category = {
                    categoryName: '',
                    description: '',
                }
                this.$emit('closeModel');
            },
            submit() {
                // 根据id判断是添加还是更新
                if (this.id==null){
                    console.log("添加分类:",this.category);
                    axios.post("boss/category/add", this.category);
                    this.$emit('afterAdd',this.category);
                    this.$message.success('添加成功');
                }else {
                    console.log("更新分类:",this.category);
                    this.category.id = this.id;
                    axios.post("boss/category/update", this.category);
                    this.$emit('afterUpdate',this.category);
                    this.$message.success('更新成功');
                }
                this.closeModel();
            },
        }
    }
</script>

<template>
    <div class="container">
        <div class="modal" v-if="this.showModel">
            <div class="modal-content">
                <h2>{{id ? '编辑分类' : '添加分类'}}</h2>

                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label>商品名称</label>
                        <input type="text" v-model="category.categoryName" required>
                    </div>
                    <div class="form-group">
                        <label>描述</label>
                        <textarea v-model="category.description" required></textarea>
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