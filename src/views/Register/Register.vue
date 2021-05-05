<template>
    <div class="Login">
        <div class="topLogin">
<!--            <img src="../../assets/images/dog-logo.png" height="110" width="230"/>-->
        </div>
        <div class="bodyLogin">
            <img src="@/assets/images/bigcat.png" alt="">
            <div class="loginform">
                <p>注册</p>
                <span><el-link :underline="false" href="/login">已有账户</el-link></span>
                <el-form  label-width="80px" :model="form">
                    <el-form-item label="用户名"  required="true">
                        <el-input v-model="form.name"  placeholder="请输入手机号"  prefix-icon="el-icon-user-solid"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  required="true">
                        <el-input v-model="form.rpassword" placeholder="请输入密码"  prefix-icon="el-icon-key" show-password>></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码"  required="true">
                        <el-input v-model="form.password" placeholder="请输入密码"  prefix-icon="el-icon-key" show-password>></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码"  required="true">
                        <el-input v-model="form.phone" placeholder="请输入电话"  prefix-icon="el-icon-map-location"></el-input>
                    </el-form-item>
                    <el-form-item label="收货地址">
                        <el-input v-model="form.address" placeholder="请输入收货地址"  prefix-icon="el-icon-map-location"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即注册</el-button>
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
        name: "Register",
        components:{FooterSatus},
        data(){
            return {
                form:{
                    name:'',
                    rpassword:'',
                    password:'',
                    phone:'',
                    address:''
                }
            }
        },
        methods:{
          async  onSubmit(){
               let [err,res] = await this.$apis.home.Register(this.form);
              if(res.msg=='success'){
                  this.$message({
                      message: '恭喜你，注册成功！',
                      type: 'success'
                  });
                  this.$router.push({path:'/login'})
              }else {
                  this.$message({
                      message: res.msg,
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
            width: 750px;
            margin:0 auto 30px;
            display: flex;
            border-radius: 30px;
            /*background:rgba(255,192,203,0.6);*/
            background-color: rgb(211,211,211);
            .loginform{
                position: relative;
                p{
                    font-size: 24px;
                    text-align: center;
                }
                span{
                    position: absolute;
                    right: 10px;
                    top:32px;
                }
            }
            img{
                //427 485
                width: 360px;
            }
        }

    }

</style>