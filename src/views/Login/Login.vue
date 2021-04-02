<template>
    <div class="Login">
        <div class="topLogin">
<!--            <img src="../../assets/images/dog-logo.png" height="110" width="230"/>-->
        </div>
        <div class="bodyLogin">
            <img src="@/assets/images/bigdog.png" alt="">
            <div class="loginform">
                <p>登陆</p>
                <span><el-link :underline="false" href="/register">没有账户，前往创建</el-link></span>
                <el-form  label-width="80px" :model="form">
                    <el-form-item label="用户名">
                        <el-input v-model="form.name"  placeholder="请输入手机号/账号"  prefix-icon="el-icon-user-solid"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" placeholder="请输入密码"  prefix-icon="el-icon-key" show-password>></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即登陆</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
<!--            <img src="@/assets/images/bigcat.png" alt="">-->
        </div>
        <Footer-Satus></Footer-Satus>
    </div>
</template>

<script>
    import FooterSatus from '@/components/FooterStatus.vue'
    export default {
        name: "Login",
        components:{FooterSatus},
        data(){
            return {
                form:{
                    name:'',
                    password:''
                }
            }
        },
        methods:{
            async onSubmit(){
                 let [err,res] = await this.$apis.home.Login(this.form)
                if(res.msg=='success'){
                    this.$setState('user','userName',res.data.name)
                    this.$setState('user','userId',res.data.id)
                    this.$setState('user','token',res.token)
                    sessionStorage.setItem('token',res.token)
                    sessionStorage.setItem('userName',res.data.name)
                    sessionStorage.setItem('userId',res.data.id)
                    this.$message({
                        message:'登陆成功',
                        type: 'success'
                    });
                    this.$router.push({path:'/'})
                }else {
                    this.$message({
                        message: res.data,
                        type: 'warning'
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .Login{
        background: rgba(135,206,250,0.2);
        .topLogin{
            height: 50px;
        }
        .bodyLogin{
            position: relative;
            width: 680px;
            margin:0 auto 30px;
            display: flex;
            border-radius: 30px;
            /*background:rgba(255,192,203,0.6);*/
            background-color: rgb(	211,211,211);
            .loginform{
                margin-top: 10px;
                p{
                    font-size: 24px;
                    text-align: center;
                }
                span{
                    position: absolute;
                    right: 40px;
                    top:60px;
                }
            }
            img{
                //427 485
                width: 270px;
            }
        }

    }

</style>