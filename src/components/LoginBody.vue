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
                axios.post("boss/user/login",this.userDTO).then(
                    res=>{
                        if (res.data.code==="200"){
                            alert("登录成功");
                            window.sessionStorage.setItem("token",res.data.data.token)
                            if (res.data.data.username==="admin"){
                                this.$router.push("/admin/category")
                            }
                            if (res.data.data.username==="boss"){
                                this.$router.push("/boss/product")
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
    #LoginBody{
        display: flex;
        /*flex-direction: row;*/
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        /*background-color: #cdd0e8;*/
        background: linear-gradient(135deg, #f3e5f5, 0%, #e1beee 100%);
        overflow: hidden;
    }
    .container{
        width: 90%;
        max-width: 1200px;
        height: 80vh;
        /*height: 99%;*/
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(123, 31, 162, 0.15);
        display: flex;
        overflow: hidden;
    }

    /* 左侧装饰面板 */
    .decorative-panel{
        flex: 1;
        background: linear-gradient(135deg, #9c27b0, 0%, #ba68c8 100%);
        color: white;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .decorative-panel::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*background-image: url("public/favicon.ico");*/
        opacity: 0.3;
    }

    .app-title{
        font-size: 2.5rem;
        margin-bottom: 1rem;
        position: relative;
        z-index: 1;
    }

    .app-description{
        font-size: 1.2rem;
        opacity: 0.9;
        max-width: 300px;
        position: relative;
        z-index: 1;
    }

    .LoginTitle{
        display: flex;
        border-radius: 10px;
    }
    .LoginWindows{
        flex: 0 0 400px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .login-header{
        text-align: center;
        margin-bottom: 2rem;
    }
    .login-header h2{
        color: #7b1fa2;
        margin-bottom: 0.5rem;
        font-size: 1.8rem;
    }
    .login-header p{
        color: #9e9e9e;
        font-size: 0.9rem;
    }
    .form-group {
        margin-bottom: 1.5rem;
    }
    .form-group label{
        display: block;
        margin-bottom: 0.5rem;
        color: #5d4037;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .input-wrapper{
        position: relative;
    }

    .icon-user, .icon-lock{
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translate(-50%);
        color: #ba68c8;
    }

    input{
        box-sizing: border-box;
        width: 100%;
        padding: 12px 12px 12px 38px;
        border: 1px solid #e1bee7;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background-color: #fafafa;
    }

    input::placeholder{
        color: #bdbdbd;
    }

    input:focus{
        outline: none;
        border-color: #9c27b0;
        box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
        background-color: white;
    }

    .input-focus{
        border-color: #9c27b0;
    }

    /*按钮样式*/
    .form-actions{
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .btn{
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.95rem;
        border: none;
    }

    .reset-btn{
        background-color: #f3e5f5;
        color: #7b1fa2;
    }

    .reset-btn:hover{
        background-color: #e1bee7;
    }

    .login-btn{
        background-color: #9c27b0;
        color: white;
    }

    .login-btn:hover{
        background-color: #71b1a2;
        box-shadow: 0 4px 12px rgba(156, 39, 176, 0.3);
    }

</style>