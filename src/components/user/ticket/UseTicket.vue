<script>
import axios from "/src/utils/request";

export default {
    name: 'UserUseCate',
    props:{
        showModel:Boolean,
        id: Number
    },
    data() {
        return{
            ticket:{
                ticketId: null,
                userId: null,
                phone: '',
                remark:''
            }
        }
    },
    methods:{
        closeModel(){
            this.ticket = {
                ticketId:null,
                userId: null,
                phone: '',
                remark:''
            }
            this.$emit('closeModel');
        },
        submit() {
            if (!/^1[3-9]\d{9}$/.test(this.ticket.phone)){
                alert("请输入有效的手机号！");
                return;
            }
            this.ticket.ticketId = this.id;
            this.ticket.userId = Number(localStorage.getItem("id"));
            axios.post("user/ticket/use",this.ticket).then(res=>{
                if (res.data&&res.data.data) {
                    this.$emit('afterUse', this.data.data);
                    console.log(res);
                }else {
                    this.$emit('afterUse', this.ticket);
                }
            }).catch(
                err=>{
                    console.log(err);
                }
            )
            this.closeModel();
        },
    }
}
</script>

<template>
    <div class="container" v-if="showModel">
        <div class="modal">
            <div class="modal-content">
                <h2>填写手机号</h2>

                <form @submit.prevent="submit">
                    <div class="form-group">
                        <label>手机号</label>
                        <input type="text" v-model="ticket.phone" required>
                    </div>
                    <div class="form-group">
                        <label>备注</label>
                        <textarea v-model="ticket.remark"></textarea>
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
.container{
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

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