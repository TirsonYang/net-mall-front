<script>
import axios from "axios";

export default {
    name: 'AdminUserMenu',
    data() {
        return {
            user:{
                username: '',
                oldPassword: '',
                newPassword: ''
            },
            isSubmitting: false
        }
    },
    methods: {
        // 处理密码修改
        handlePasswordChange() {
            // 简单验证
            if (!this.user.oldPassword || !this.user.newPassword) {
                this.$message.warning('请输入旧密码和新密码');
                return;
            }

            // 模拟修改密码操作
            this.isSubmitting = true;
            axios.post("boss/updatePassword",this.user).then(res=>{
                if (res.status === 200) {
                    this.$message.success("修改成功");
                    this.user.oldPassword = '';
                    this.user.newPassword = '';
                } else {
                    this.$message.info("已取消");
                }
            }).catch(err=>{
                console.log(err);
            })
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
            <h2 class="settings-title">账户设置</h2>

            <form class="settings-form">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <el-input
                        id="username"
                        v-model="user.username"
                        placeholder="请输入用户名"
                        class="form-input"
                    ></el-input>
                </div>

                <div class="form-group">
                    <label for="oldPassword">旧密码</label>
                    <el-input
                        id="oldPassword"
                        v-model="user.oldPassword"
                        placeholder="请输入旧密码"
                        type="password"
                        class="form-input"
                    ></el-input>
                </div>

                <div class="form-group">
                    <label for="newPassword">新密码</label>
                    <el-input
                        id="newPassword"
                        v-model="user.newPassword"
                        placeholder="请输入新密码"
                        type="password"
                        class="form-input"
                    ></el-input>
                </div>
            </form>

            <div class="button-group">
                <el-button
                    type="primary"
                    :loading="isSubmitting"
                    @click="handlePasswordChange"
                    class="btn-change-password"
                >
                    修改密码
                </el-button>

                <el-button
                    type="danger"
                    @click="handleLogout"
                    class="btn-logout"
                >
                    退出登录
                </el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings-container {
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
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
