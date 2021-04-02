<template>
    <div class="MyInfo">
        <Nav-Status :mode="2"></Nav-Status>
        <div class="Info">
            <div class="menu">
                <el-menu
                        class="el-menu-vertical-demo">
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
                </el-menu>
            </div>
            <div>
                <div class="Infobody">
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

                <div class="Infobody">
                    <div class="title">
                        <span>我的订单</span>
                    </div>
                    <el-steps :active="state" simple>
                        <el-step title="全部订单" icon="el-icon-edit" @click.native="actStep(0)"></el-step>
                        <el-step title="已付款" icon="el-icon-upload" @click.native="actStep(1)"></el-step>
                        <el-step title="待收货" icon="el-icon-picture" @click.native="actStep(2)"></el-step>
                        <el-step title="待评价" icon="el-icon-picture" @click.native="actStep(3)"></el-step>
                    </el-steps>

                    <div class="el-tabs">
                        <div  label="全部订单">
                            <div class="select">
                                <el-input v-model="select"></el-input>
                                <span class="a" @click="getOrder">搜索</span>
                            </div>
                            <div v-if="!flag">
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
                                        <span class="span4">订单详情</span>
                                        <span class="span5" @click="HaveBuy(order.aa[0].o_id)"><i class="el-icon-shopping-cart-1"></i>还要买</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>


        <Footer-Status></Footer-Status>
        <Add-Address ref="Addre" :inserORedit="inserORedit" :addData='editData'></Add-Address>
    </div>
</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import AddAddress from '@/components/AddAddress.vue'
    export default {
        name: "MyInfo",
        components:{ NavStatus,FooterStatus,AddAddress},
        data(){
            return{
                addressArr:{},
                inserORedit:false,
                editData:{},
                select:'',
                orderData:[],
                state:0,
                flag:null
            }
        },
        methods:{
            async getAddress(){
                let userId = this.$getState('user','userId')||sessionStorage.getItem('userId');
                let [err,res] = await this.$apis.home.getAddress({id:userId})
                if(res.msg=='success'){
                    this.addressArr=res.data
                    console.log(this.addressArr,'this.addressArr')
                } else {
                    this.$message({
                        message: '数据访问异常',
                        type: 'warning'
                    });
                }
            },
            async  setTool(id,flag){
                let selectAdd={}
                this.inserORedit=false
                if(flag==1){
                    for(let i of this.addressArr){
                        i.add_flag=i.add_id===id?'true':'false'
                    }
                }else if(flag==2){
                    for(let i of this.addressArr){
                        if(i.add_id===id)
                            this.editData=i;
                    }
                    this.editData.id=id
                    this.inserORedit=true
                    this.newAddres()
                }else {
                    this.inserORedit=false
                    let [err,res] = await this.$apis.home.delectAddress({add_id:id})
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
                let [err,res] = await this.$apis.home.getOrder({id:userId,state:this.state,select:this.select})
                if(res.msg=='success'){
                    this.orderData = res.data
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
            actStep(act){
                this.state = act
                this.getOrder()
            },
            newAddres(){
                this.$refs.Addre.openORclose()
            },
            HaveBuy(o_id){
                console.log(o_id,'----------toshopcart')
                this.$router.push({name:'shopcart',params:{o_id:o_id}})
            }
        },
        created() {
            this.getAddress()
            this.getOrder()
        }
    }
</script>

<style scoped lang="scss">
    .MyInfo{
        background: #f9f7f7;
        .Info{
            width: 1100px;
            margin: 0 auto;
            display: flex;
            .menu{
                margin-top: 15px;
                width: 142px;
                font-size: 12px;
            }
            .Infobody{
                margin: 15px 15px;
                padding: 0px 10px 35px;
                width: 850px;
                min-height: 200px;
                background: #fff;
                .el-steps{
                    margin: 10px 20px 0;
                }
                .title{
                    height: 44px;
                    line-height: 44px;
                    padding: 0 10px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    span{
                        font-size: 16px;
                    }
                    .add{
                        font-size: 14px;
                        &:hover{
                            text-decoration: none;
                            color: #248DCC;
                        }
                    }
                    i{
                        width: 15px;
                        height: 15px;
                        background: url(../../assets/images/cart-ico.png) no-repeat 0 -40px;
                        display: inline-block;
                        border:0px;
                    }
                }
                .el-tabs{
                    margin: 10px 20px 0;
                    .select{
                        .el-input{
                            width: 239px;
                            height: 38px;
                            line-height: 38px;
                            color: #a9a9a9;
                        }
                        .a{
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
                    .order{
                        .orderTitle{
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
                            :first-child{
                                color: #999;
                            }
                            :nth-child(2){
                                color: #666;
                                margin-left: 5px;
                            }
                            :nth-child(3){
                                margin-left: 10px;
                                background-color:#6acd34;
                                border-radius: 3px;
                                padding: 4px 10px 4px 0px;
                                color: #fff;
                                text-indent: 10px;
                            }

                        }
                        .orderBody{
                            margin-left: 15px;
                            display: flex;
                            align-items: center;
                            .span2{
                                color: #666;
                                font-size: 12px;
                            }
                            .span3{
                                font-size: 14px;
                                color: #f00;
                            }
                            .span4{
                                font-size: 14px;
                                color: #666;
                                &:hover{
                                    text-decoration: none;
                                    color: #248DCC;
                                }
                            }
                            .span5{
                                display: inline-block;
                                font-size: 12px;
                                width: 75px;
                                height: 28px;
                                line-height: 28px;
                                border-radius: 5px;
                                background: #e7e7e7;
                                i{
                                    font-size: 16px;
                                }
                                &:hover{
                                    text-decoration: none;
                                    color: #248DCC;
                                }
                            }
                            .imgs{
                                width: 335px;
                                display: flex;
                                overflow: hidden;
                            }
                            .imgBr{
                                margin-right: 5px;
                                display: block;
                                width: 60px;
                                height: 60px;
                                padding: 1px;
                                border: 1px #ddd solid;
                                cursor: pointer;
                               // overflow: hidden;
                                img{
                                    width: 59px;
                                    height: 59px;
                                }
                            }
                            span{
                                width: 113px;
                                text-align: center;
                            }

                        }
                    }
                }
                .Box{
                    display: flex;
                    flex-wrap:wrap;
                }
                .infoBox{
                    width: 380px;
                    border: 1px solid #e5e5e5;
                    margin: 32px 20px 0;
                    .boxBody{
                        padding: 25px 25px 20px;
                        h2{
                            font-size: 18px;
                            font-weight: 400;
                        }
                        p{
                            line-height: 30px;
                            font-size: 14px;
                        }
                    }
                    .edit{
                        height: 34px;
                        line-height: 34px;
                        text-align: right;
                        background: #f3f3f3;
                        border-top: 1px solid #e5e5e5;
                        span{
                            color: #038bb7;
                            margin-right: 25px;
                            font-size: 12px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>