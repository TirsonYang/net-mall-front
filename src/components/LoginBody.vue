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
                            alert("登录成功")
                        }else {
                            alert("登录失败")
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
        <div class="LoginWindows">
            <div class="form-group">
                <label>用户名</label>
                <input type="text" placeholder="请输入用户名" v-model="userDTO.username">
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" placeholder="请输入密码" v-model="userDTO.password">
            </div>
            <div class="LoginButton">
                <button @click="login">登录</button>
                <button>重置</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #LoginBody{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-color: #cdd0e8;
    }
    .LoginWindows{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 200px;
        background-color: #bc6ce6;
        border-style: none;
        border-radius: 10px;
    }
    .form-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    label {
        width: 60px;
        text-align: left;
        margin-right: 10px;
    }
    input {
        flex: 1;
        padding: 5px;
        border-style: none;
        border-radius: 5px;
    }
    .LoginButton{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    button{
        margin-right: 30px;
        margin-left: 30px;
        margin-top: 10px;
        width: 60px;
        height: 30px;
        border-style: none;
        border-radius: 5px;
        background-color: #cdd0e8;
    }
</style>