<script>

    import axios from "axios";

    export default {
        name: 'LoginBody',
        data(){
            return{
                userDTO:{
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login(){
                axios.post("login",this.userDTO).then(
                    res=>{
                        if (res.data.code==="200"){
                            alert("登录成功");
                            localStorage.setItem("token",res.data.data.token);
                            localStorage.setItem("username",res.data.data.username);
                            localStorage.setItem("id",res.data.data.id);
                            if (res.data.data.username==="admin"){
                                localStorage.setItem("userRole",2);
                                this.$router.push("/admin/category")
                            }
                            if (res.data.data.username==="boss"){
                                localStorage.setItem("userRole",1);
                                this.$router.push("/boss/category")
                            }
                            if (res.data.data.username==="user"){
                                localStorage.setItem("userRole",3);
                                this.$router.push("/user/category")
                            }
                        }else {
                            alert("登录失败");
                        }
                    }
                ).catch(
                    err=>{
                        console.log(err);
                    }
                )
            },
            resetForm(){
                this.userDTO.username = "";
                this.userDTO.password = "";
            }
        }
    }

</script>

<template>
    <div id="LoginBody">
        <div class="container">
            <div class="decorative-panel">
                <h1 class="app-title">点一点</h1>
                <p class="app-description">方便、快捷的点餐系统</p>
            </div>
            <div class="LoginWindows">

                <div class="login-header">
                    <h2>用户登录</h2>
                    <p>请输入账号密码登录系统</p>
                </div>

                <div class="form-group">
                    <label for="username">用户名</label>
                    <div class="input-wrapper">
                        <i class="icon-user"></i>
                        <input type="text" id="username" placeholder="请输入用户名" v-model="userDTO.username"
                            :class="{'input-focus': userDTO.username}">
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">密码</label>
                    <div class="input-wrapper">
                        <i class="icon-lock"></i>
                        <input type="password" id="password" placeholder="请输入密码" v-model="userDTO.password"
                              :class="{'input-focus': userDTO.password}">
                    </div>
                </div>

                <div class="form-actions">
                    <button @click="resetForm" class="btn reset-btn">重置</button>
                    <button @click="login" class="btn login-btn">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

body {
    background: linear-gradient(135deg, #f3e5f5 0%, #e1beee 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

#LoginBody {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 100%;
    max-width: 1200%;
    height: auto;
    min-height: 600px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(123, 31, 162, 0.15);
    display: flex;
    flex-direction: row;
    overflow: hidden;
}

/* 左侧装饰面板 */
.decorative-panel {
    flex: 1;
    background: linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%);
    color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    min-height: 400px;
}

.decorative-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.app-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
}

.app-description {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 300px;
    position: relative;
    z-index: 1;
}

.LoginWindows {
    flex: 0 0 400px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
}

.login-header h2 {
    color: #7b1fa2;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
}

.login-header p {
    color: #9e9e9e;
    font-size: 0.9rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #5d4037;
    font-size: 0.9rem;
    font-weight: 500;
}

.input-wrapper {
    position: relative;
}

.icon-user, .icon-lock {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #ba68c8;
    z-index: 1;
}

input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 12px 12px 38px;
    border: 1px solid #e1bee7;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #fafafa;
}

input::placeholder {
    color: #bdbdbd;
}

input:focus {
    outline: none;
    border-color: #9c27b0;
    box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
    background-color: white;
}

.input-focus {
    border-color: #9c27b0;
}

/*按钮样式*/
.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 15px;
}

.btn {
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    border: none;
    flex: 1;
}

.reset-btn {
    background-color: #f3e5f5;
    color: #7b1fa2;
}

.reset-btn:hover {
    background-color: #e1bee7;
}

.login-btn {
    background-color: #9c27b0;
    color: white;
}

.login-btn:hover {
    background-color: #7b1fa2;
    box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3);
}

/* 响应式设计 */
@media (max-width: 992px) {
    .container {
        flex-direction: column;
        max-width: 600px;
    }

    .decorative-panel {
        min-height: 200px;
        padding: 1.5rem;
        text-align: center;
    }

    .app-title {
        font-size: 2rem;
    }

    .app-description {
        margin: 0 auto;
    }

    .LoginWindows {
        flex: 1;
        width: 100%;
        padding: 1.5rem;
    }
}

@media (max-width: 576px) {
    body {
        padding: 10px;
    }

    .container {
        border-radius: 10px;
        min-height: auto;
    }

    .decorative-panel {
        min-height: 150px;
        padding: 1rem;
    }

    .app-title {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    .app-description {
        font-size: 1rem;
    }

    .LoginWindows {
        padding: 1.5rem 1rem;
    }

    .login-header h2 {
        font-size: 1.5rem;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}

@media (max-width: 400px) {
    .decorative-panel {
        min-height: 120px;
    }

    .app-title {
        font-size: 1.5rem;
    }

    .app-description {
        font-size: 0.9rem;
    }

    input {
        padding: 10px 10px 10px 32px;
        font-size: 0.9rem;
    }

    .icon-user, .icon-lock {
        left: 10px;
    }
}
</style>