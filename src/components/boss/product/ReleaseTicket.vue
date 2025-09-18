<script>

    import axios from "/src/utils/request"

    export default {
        name: 'BossReleaseTicket',
        data(){
            return {
                ticket:{
                    userId: null,
                    expireTime: null,
                    productId: null
                }
            }
        },
        props:{
            id: Number,
            showTicketModel: Boolean,
        },
        methods:{
            closeTicketModel(){
                this.ticket = {
                    userId: null,
                    expireTime: null,
                    productId: null
                }
                this.$emit('closeTicketModel');
            },
            submit(){
                this.ticket.productId=this.id;
                axios.post("boss/ticket/add",this.ticket).then(res=>{
                    if (res.data.code==="200"){
                        this.$message.success("发放成功");
                        console.log(res);
                    }
                }).catch(err=>{
                    console.log(err);
                });
                this.closeTicketModel();
            }
        }
    }

</script>

<template>
    <div class="container">
        <div class="modal" v-if="this.showTicketModel">
            <div class="modal-content">
                <h2>发放优惠券</h2>

                <form>
                    <div class="form-group">
                        <label>输入会员账号</label>
                        <input type="text" v-model="ticket.userId" required>
                    </div>

                    <div class="form-group">
                        <label>过期时间</label>
                        <input type="datetime-local" v-model="ticket.expireTime" required>
                    </div>

                    <div class="form-actions">
                        <button type="button" @click="closeTicketModel">取消</button>
                        <button type="button" @click="submit">确认</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        max-width: 90%;
    }

    .form-group{
        margin-bottom: 15px;
    }

    .form-group label{
        display: block;
        margin-bottom: 5px;
    }

    .form-group input{
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .form-actions{
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 10px;
    }
</style>