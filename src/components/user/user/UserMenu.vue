<script>
import axios from "@/utils/request";

export default {
    name: 'BossUserMenu',
    data() {
        return {
            user:{
                birthday: null,
                userId:null
            },
            isSubmitting: false
        }
    },
    methods: {
        // 处理密码修改
        handleSubmit() {
            if(this.user.birthday===null){
                this.$message.info("请输入生日信息");
            }else{
                this.$confirm('确定要提交吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(
                    axios.post("user/submitBirthday",this.user).then(
                        res=>{
                            if (res.data.code==='200'){
                                this.$message.success("已提交！");
                                console.log(res);
                            }else {
                                this.$message.info("提交失败");
                            }
                        }
                    ).catch(err=>{
                        this.$message.info("提交错误！");
                        console.log(err);
                    })
                )
            }
        },
        // 处理退出登录
        handleLogout() {
            this.$confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success('退出登录成功！');
                localStorage.removeItem('token');
                localStorage.removeItem("userRole");
                this.$router.push('/login');
            }).catch(() => {
                this.$message.info('已取消退出');
            });
        }
    }
}
</script>

<template>
    <div class="settings-container">
        <div class="settings-card">
            <h1 class="settings-title">完善信息</h1>

            <div class="params-input">
                <div class="input-item">
                    <span>生日</span>
                    <input type="date" v-model="user.birthday">
                </div>
            </div>

            <div class="button-group">
                <el-button
                    type="primary"
                    :loading="isSubmitting"
                    @click="handleSubmit"
                    class="btn-change-password"
                >
                    提交
                </el-button>
            </div>

            <div class="information">
                注：我们希望能给您提供专属生日福利，需收集您的生日信息。该信息不作其他任何用途，绝不向任何第三方泄露，请您放心填写。
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings-container {
    width: 100%;
    min-height: 85vh;
    padding: 20px;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

/* 查询条件区域：核心优化「自动换行+弹性伸缩+最小宽度」 */
.params-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 0 24px 0;
    gap: 16px; /* 合理间距，避免拥挤 */
    flex-wrap: wrap; /* 小屏自动换行，防止重叠 */
}

/* 单个查询项样式：弹性伸缩+最小宽度，确保小屏不挤压 */
.input-item {
    display: flex;
    align-items: center;
    gap: 8px; /* 文字与输入框间距 */
    flex: 1 1 auto; /* 弹性伸缩，自动分配空间 */
    min-width: 220px; /* 小屏最小宽度，防止过度压缩 */
    max-width: 320px; /* 大屏最大宽度，避免过宽 */
}

/* 文字标签：固定宽度+强制单行 */
.input-item span {
    min-width: 80px;
    white-space: nowrap; /* 强制文字不换行 */
    font-size: 14px;
}

/* 输入框样式：自适应宽度+美化 */
.input-item input {
    width: 100%; /* 输入框占满父容器剩余宽度 */
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
}

/* 按钮组样式：独立控制间距+最小宽度 */
.button-group {
    display: flex;
    gap: 12px; /* 按钮之间间距 */
    min-width: 200px; /* 确保按钮组不被过度压缩 */
    justify-content: flex-start;
}

.settings-card {
    width: 100%;
    max-width: 500px;
    padding: 36px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.settings-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.settings-title {
    margin: 0 0 30px;
    color: #1d2129;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
}

.settings-form {
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 8px;
    color: #4e5969;
    font-size: 14px;
    font-weight: 500;
}

.form-input {
    width: 100%;
    height: 42px;
    transition: all 0.2s ease;
}

.form-input:focus {
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.button-group {
    display: flex;
    gap: 16px;
}

.btn-change-password, .btn-logout {
    flex: 1;
    height: 44px;
    font-size: 16px;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.btn-change-password {
    background-color: #101153;
    border-color: #101153;
}

.btn-change-password:hover {
    background-color: #1a1c7a;
    border-color: #1a1c7a;
    transform: translateY(-2px);
}

.btn-logout {
    background-color: #ef2d13;
    border-color: #ef2d13;
}

.btn-logout:hover {
    background-color: #d42810;
    border-color: #d42810;
    transform: translateY(-2px);
}

.information{
    margin-top: 10px;
}

/* 响应式设计 */
@media (max-width: 576px) {
    .settings-card {
        padding: 24px;
    }

    .button-group {
        flex-direction: column;
    }
}
</style>
