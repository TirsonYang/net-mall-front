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
        watch: {
            // 监听id变化，如果是编辑，则获取分类详情
            id: {
                immediate: true,
                handler(newId) {
                    if (newId != null) {
                        this.getCategoryDetail(newId);
                    } else {
                        // 添加模式，重置表单
                        this.category = {
                            id: null,
                            categoryName: '',
                            description: '',
                        };
                    }
                }
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
                const request = this.id == null ?
                    axios.post("boss/category/add", this.category) :
                    axios.post("boss/category/update", this.category);

                request.then(res => {
                    console.log(res);
                    this.$emit('afterAdd'); // 通知父组件刷新列表
                    this.closeModel();
                }).catch(err => {
                    console.log(err);
                });
            },
        }
    }
</script>

<template>
    <div class="container">
        <div class="modal" v-if="this.showModel">
            <div class="modal-content">
                <h2>添加分类</h2>

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