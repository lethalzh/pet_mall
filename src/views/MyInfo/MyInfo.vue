<template>
    <div class="MyInfo">
        <Nav-Status :mode="2"></Nav-Status>
        <div class="title">
            <b @click="goBack"><i class="el-icon-back"></i>返回</b> |
            <span :class="$getState('cache','Animal')=='dog'?'dogColor':'catColor'"><i class="el-icon-s-custom"></i>我的宠爱</span>
        </div>
        <div class="Info">
            <div class="menu">
                <el-menu
                        class="el-menu-vertical-demo"
                        @select="handleSelect"
                >
                    <el-menu-item index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>我的订单</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-location"></i>
                        <span slot="title">收货地址</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">退/换货</span>
                    </el-menu-item>
                    <el-submenu  index="4">
                        <template slot="title"><i class="el-icon-location"></i>我的信息</template>
                        <el-menu-item-group>
                            <el-menu-item index="41">基本信息</el-menu-item>
                            <el-menu-item index="42">修改密码</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <div>
                <div class="Infobody" v-if="selectId==1">
                    <div class="title">
                        <span>我的订单</span>
                    </div>
                    <el-steps :active="state" simple>
                        <el-step title="全部订单" icon="el-icon-edit" @click.native="actStep(0)"></el-step>
                        <el-step title="未付款" icon="el-icon-upload" @click.native="actStep(-1)"></el-step>
                        <el-step title="已付款" icon="el-icon-upload" @click.native="actStep(1)"></el-step>
                        <el-step title="待收货" icon="el-icon-picture" @click.native="actStep(2)"></el-step>
                        <el-step title="已收获" icon="el-icon-picture" @click.native="actStep(3)"></el-step>
                    </el-steps>

                    <div class="el-tabs">
                        <div  label="全部订单">
                            <div class="select">
                                <el-input v-model="select"></el-input>
                                <span class="a" @click="getOrder">搜索</span>
                            </div>
                            <div v-if="!flag" class="wu">
                                <img src="https://static.epetbar.com/my/new/images/despair.png" alt="">
                                暂无相关订单
                            </div>
                            <div v-else>
                                <div class="order" v-for="(order,index) of orderData" :key="index">
                                    <div class="orderTitle">
                                        <span>下单时间:{{order.aa[0].o_createDate}} </span>
                                        <span>订单编号:{{order.aa[0].o_id}}</span>
                                        <span><i class="el-icon-s-home"></i>宠爱西部仓库</span>
                                    </div>
                                    <div class="orderBody">
                                        <div class="imgs" >
                                            <div class="imgBr" v-for="(it,inde) of order.aa" :key="inde">
                                                <img :src="it.com_imgs"></div>
                                        </div>
                                        <span class="span2">{{order.aa[0].add_name}}</span>
                                        <span class="span3">${{order.aa[0].o_totalPrice}}</span>
                                        <span class="span4" @click="toInfo(index)">订单详情</span>
                                        <div  v-if="state==0">
                                            <el-tag size="mini"  :type="Sarr[parseInt(order.aa[0].o_status)+1].type">{{Sarr[parseInt(order.aa[0].o_status)+1].label}}</el-tag>
                                        </div>
                                        <span class="span5" @click="HaveBuy(order.aa[0].o_id)"><i class="el-icon-shopping-cart-1"></i>还要买</span>
                                        <el-button type="primary" icon="el-icon-check"  size="mini"
                                                   v-if="state==2"
                                                   @click="checkOrder(order.aa[0].o_id)">收货</el-button>
<!--                                        <span class="span6">收货</span>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="Infobody" v-if="selectId==2">
                    <div class="title">
                        <span>收货地址</span>
                        <span class="add" @click="newAddres"><i></i>新增收货地址</span>
                    </div>
                    <div class="Box">
                        <div class="infoBox" v-for="(item,index) of addressArr" :key="index">
                            <div class="boxBody">
                                <h2>{{item.add_name}} 收</h2>
                                <p>{{item.add_address}}</p>
                                <p>{{item.add_number}}</p>
                            </div>
                            <div class="edit">
                                <span  v-if="item.add_flag!='true'" @click="setTool(item.add_id,1)">设为默认地址</span>
                                <span @click="setTool(item.add_id,2)">编辑</span>
                                <span @click="setTool(item.add_id,3)">删除</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="Infobody" v-if="selectId==41">
                    <div class="title">
                        <span>我的信息</span>
                    </div>
                    <el-form ref="form" :model="userInfo" label-width="80px">
                        <el-form-item label="头像">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :multiple="false"
                                    :on-success="handleAvatarSuccess"
                                    >
                                <img v-if="userInfo.u_icon!=''" :src="userInfo.u_icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="账号名">
                            <el-input v-model="userInfo.u_name"   placeholder="请输入账号名"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="userInfo.u_sex">
                                <el-radio  label="1">男</el-radio>
                                <el-radio  label="2">女</el-radio>
                                <el-radio  label="3">保密</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="userInfo.u_phone"   placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-button @click="EdituserInfo" type="success">保存</el-button>
                    </el-form>
                </div>

                <div class="Infobody" v-if="selectId==42">
                    <div class="title">
                        <span>修改密码</span>
                    </div>
                    <el-form ref="formPass" :model="formPass" label-width="80px">
                        <el-form-item label="旧密码">
                            <el-input v-model="formPass.oldPass"   placeholder="请输入旧密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="新密码">
                            <el-input v-model="formPass.newPass"   placeholder="请输入新密码" show-password></el-input>
                        </el-form-item>
                        <el-button type="success" @click="EditPassword">保存</el-button>
                    </el-form>
                </div>

            </div>

        </div>


        <Footer-Status></Footer-Status>
        <Order-Info ref="oInfo"  :toInfodata="toInfodata"></Order-Info>
        <Add-Address ref="Addre" :inserORedit="inserORedit" :addData='editData'></Add-Address>
    </div>
</template>

<script>
    import md5 from 'js-md5';
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import AddAddress from '@/components/AddAddress.vue'
    import OrderInfo from './OrderInfo'
    export default {
        name: "MyInfo",
        components:{ NavStatus,FooterStatus,AddAddress,OrderInfo},
        data(){
            return{
                addressArr:{},
                inserORedit:false,
                editData:{},
                select:'',
                orderData:[],
                state:0,
                flag:null,
                form:{},
                formPass:{oldPass:null,newPass:null},
                toInfodata:[{
                    o_id:'',
                    o_totalPrice:'',
                    o_deli:'',
                    o_createDate:'',
                    add_name:'',
                    add_number:'',
                    add_address:''
                }],
                selectId:1,
                userInfo:{},
                Sarr:[
                    {type:'danger', label:'未付款'},
                    {type:'', label:''},
                    {type:'', label:'已付款'},
                    {type:'info', label:'待收货'},
                    {type:'success', label:'已收货'},
                ],
            }
        },
        methods:{
            async getAddress(){
                let userId = this.$getState('user','userId')||sessionStorage.getItem('userId');
                let [err,res] = await this.$apis.home.getAddress({id:userId});
                if(res.msg=='success'){
                    this.addressArr=res.data;
                    console.log(this.addressArr,'this.addressArr')
                } else {
                    this.$message({
                        message: '数据访问异常',
                        type: 'warning'
                    });
                }
            },
            async  setTool(id,flag){
                let selectAdd={};
                this.inserORedit=false;
                if(flag==1){
                    for(let i of this.addressArr){
                        i.add_flag=i.add_id===id?'true':'false'
                    }
                }else if(flag==2){
                    for(let i of this.addressArr){
                        if(i.add_id===id)
                            this.editData=i;
                    }
                    this.editData.id=id;
                    this.inserORedit=true;
                    this.newAddres()
                }else {
                    this.inserORedit=false;
                    let [err,res] = await this.$apis.home.delectAddress({add_id:id});
                    if(res.msg=='success'){
                        this.$message({
                            message:res.data,
                            type: 'success'
                        });
                        this.getAddress()
                    }else {
                        this.$message({
                            message: res.data,
                            type: 'warning'
                        });
                    }
                }
            },
            async getOrder(){
                let userId = this.$getState('user','userId')||sessionStorage.getItem('userId');
                let [err,res] = await this.$apis.home.getOrder({id:userId,state:this.state,select:this.select});
                if(res.msg=='success'){
                    this.orderData = res.data;
                    this.flag= res.flag
                    // for(let order of this.orderData){
                    //     order.o_createDate = order.o_createDate.replace(/Z/,'')
                    //     order.o_createDate = order.o_createDate.replace(/T/,' ')
                    //     order.o_finishDate = order.o_finishDate.replace(/Z/,'')
                    //     order.o_finishDate = order.o_finishDate.replace(/T/,' ')
                    //     order.o_sendDate = order.o_sendDate.replace(/Z/,'')
                    //     order.o_sendDate = order.o_sendDate.replace(/T/,' ')
                    // }
                }else{
                    this.$message({
                        message: res.data,
                        type: 'warning'
                    });
                }
            },
            async checkOrder(o_id){
                let [err,res] = await this.$apis.product.setOrder({oid:o_id});
                if(res.msg=='success'){
                    this.$message({
                        message:'收货成功！！',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message:'收货失败！！',
                        type: 'warning'
                    });
                }
                this.getOrder()
            },
            async getuserInfo(){
                let userId=this.$getState('user','userId')|| sessionStorage.getItem('userId');
                let [err,res] = await  this.$apis.user.getuserInfo({uid:userId});
                if(res.msg='success'){
                    this.userInfo = res.data
                }
            },
            async EdituserInfo(){
                let userId=this.$getState('user','userId')|| sessionStorage.getItem('userId');
                let [err,res] = await  this.$apis.user.EdituserInfo({uid:userId,userInfo:this.userInfo});
                if(res.msg=='success'){
                    this.$message({
                        message:'修改成功！！',
                        type: 'success'
                    });
                }
            },
            async EditPassword(){
                console.log(md5(this.formPass.oldPass),'this.formPass.oldPass','this.userInfo.u_password',this.userInfo.u_password);
              if(md5(this.formPass.oldPass)==this.userInfo.u_password){
                  let userId=this.$getState('user','userId')|| sessionStorage.getItem('userId');
                  let [err,res] = await this.$apis.user.EditPassword({uid:userId,newPass:this.formPass.newPass});
                  if(res.msg=='success'){
                      this.$message({
                          message:'密码修改成功！！',
                          type: 'success'
                      });
                  }else{
                      this.$message({
                          message:'密码修改异常！！',
                      });
                  }

              }else {
                      this.$message({
                          message:'与旧密码不一致！！',
                      });
              }
            },
            actStep(act){
                this.state = act;
                this.getOrder()
            },
            newAddres(){
                this.$refs.Addre.openORclose()
            },
            HaveBuy(o_id){
                console.log(o_id,'----------toshopcart');
                this.$router.push({name:'shopcart',params:{o_id:o_id}})
            },
            handleAvatarSuccess(){},
            toInfo(index){
                this.toInfodata = this.orderData[index].aa;
                this.$refs.oInfo.dialogVisible=true
            },
            handleSelect(key, keyPath) {
                if(key==4)
                    key=41;
                this.selectId=key
            },
            goBack(){this.$router.go(-1);}
        },
        created() {
            this.getAddress();
            this.getOrder();
            this.getuserInfo()
        }
    }
</script>

<style scoped lang="scss">
    $catColor: #e63f85;
    $dogColor:#4d9b35;
    .MyInfo {
        background: #f9f7f7;
        .dogColor{
           color: $dogColor;
        }
        .cagColor{
            color: $catColor;
        }
    .title{
        width: 1100px;
        margin: 0 auto;
        margin-top: 20px;
       b{
           cursor: pointer;
       }
        span{

        }
    }
        .Info {
            width: 1100px;
            margin: 0 auto;
            display: flex;

            .menu {
                margin-top: 15px;
                width: 142px;
                font-size: 12px;
                .el-submenu .el-menu-item {
                    height: 50px;
                    line-height: 50px;
                    padding: 0 45px;
                     min-width: 140px;
                }
            }

            .Infobody {
                margin: 15px 5px;
                padding: 0px 10px 35px;
                width: 900px;
                min-height: 200px;
                background: #fff;

                .el-steps {
                    margin: 10px 20px 0;
                }

                .title {
                    height: 44px;
                    line-height: 44px;
                    padding: 0 10px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;

                    span {
                        font-size: 16px;
                    }

                    .add {
                        font-size: 14px;

                        &:hover {
                            text-decoration: none;
                            color: #248DCC;
                        }
                    }

                    i {
                        width: 15px;
                        height: 15px;
                        background: url(../../assets/images/cart-ico.png) no-repeat 0 -40px;
                        display: inline-block;
                        border: 0px;
                    }
                }

                .el-tabs {
                    margin: 10px 20px 0;
                    .wu{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 85px;
                        }
                    }
                    .select {
                        .el-input {
                            width: 239px;
                            height: 38px;
                            line-height: 38px;
                            color: #a9a9a9;
                        }

                        .a {
                            display: inline-block;
                            width: 98px;
                            height: 38px;
                            line-height: 38px;
                            text-align: center;
                            background-color: #F1F1F1;
                            font-size: 12px;
                            cursor: pointer;
                            color: #444;

                            &:hover {
                                color: #248DCC;
                            }
                        }
                    }

                    .order {
                        .orderTitle {
                            margin-top: 15px;
                            color: #999;
                            text-indent: 20px;
                            background: #f1f1f1;
                            height: 34px;
                            line-height: 34px;
                            text-align: left;
                            font-weight: normal;
                            border-bottom: 10px solid #fff;
                            font-size: 12px;

                            :first-child {
                                color: #999;
                            }

                            :nth-child(2) {
                                color: #666;
                                margin-left: 5px;
                            }

                            :nth-child(3) {
                                margin-left: 10px;
                                background-color: #6acd34;
                                border-radius: 3px;
                                padding: 4px 10px 4px 0px;
                                color: #fff;
                                text-indent: 10px;
                            }

                        }

                        .orderBody {
                            margin-left: 15px;
                            display: flex;
                            align-items: center;

                            .span2 {
                                color: #666;
                                font-size: 12px;
                            }

                            .span3 {
                                font-size: 14px;
                                color: #f00;
                            }

                            .span4 {
                                font-size: 14px;
                                color: #666;

                                &:hover {
                                    text-decoration: none;
                                    color: #248DCC;
                                }
                            }

                            .span5 {
                                display: inline-block;
                                margin-right: 5px;
                                margin-left: 5px;
                                font-size: 12px;
                                width: 75px;
                                height: 28px;
                                line-height: 28px;
                                border-radius: 5px;
                                background: #e7e7e7;
                                vertical-align: middle;
                                i {
                                    font-size: 16px;
                                }

                                &:hover {
                                    text-decoration: none;
                                    color: #248DCC;
                                }
                            }


                            .imgs {
                                width: 335px;
                                display: flex;
                                overflow: hidden;
                            }

                            .imgBr {
                                margin-right: 5px;
                                display: block;
                                width: 60px;
                                height: 60px;
                                padding: 1px;
                                border: 1px #ddd solid;
                                cursor: pointer;
                                // overflow: hidden;
                                img {
                                    width: 59px;
                                    height: 59px;
                                }
                            }

                            span {
                                width: 100px;
                                text-align: center;
                            }

                        }
                    }
                }

                .Box {
                    display: flex;
                    flex-wrap: wrap;
                }

                .infoBox {
                    width: 380px;
                    border: 1px solid #e5e5e5;
                    margin: 32px 20px 0;

                    .boxBody {
                        padding: 25px 25px 20px;

                        h2 {
                            font-size: 18px;
                            font-weight: 400;
                        }

                        p {
                            line-height: 30px;
                            font-size: 14px;
                        }
                    }

                    .edit {
                        height: 34px;
                        line-height: 34px;
                        text-align: right;
                        background: #f3f3f3;
                        border-top: 1px solid #e5e5e5;

                        span {
                            color: #038bb7;
                            margin-right: 25px;
                            font-size: 12px;
                            cursor: pointer;
                        }
                    }
                }

                .el-form {
                    padding-top: 20px;
                    margin: 0 240px;
                    text-align: center;
                    width: 300px;
                    .avatar-uploader .el-upload {
                        border: 1px dashed #d9d9d9;
                        border-radius: 60px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }
                    .avatar-uploader .el-upload:hover {
                        border-color: #409EFF;
                    }
                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 120px;
                        height: 120px;
                        line-height: 120px;
                        text-align: center;
                    }
                    .avatar {
                        width: 120px;
                        height: 120px;
                        display: block;

                    }
                    .el-button {
                        width: 123px;
                        height: 46px;
                        background: #33cb98;
                        border-radius: 5px;
                        color: #FFF;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>