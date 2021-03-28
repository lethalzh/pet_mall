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

            <div class="Infobody">
                <div class="title">
                    <span>收货地址</span>
                    <span class="add" @click="newAddres"><i></i>新增收货地址</span>
                </div>
                <div class="Box">
                    <div class="infoBox">
                        <div class="boxBody">
                            <h2>cc 收</h2>
                            <p>重庆重庆市北碚区cc</p>
                            <p>159****3664</p>
                        </div>
                        <div class="edit">
                            <span>设为默认地址</span>
                            <span>编辑</span>
                            <span>删除</span>
                        </div>
                    </div>
                    <div class="infoBox">
                        <div class="boxBody">
                            <h2>cc 收</h2>
                            <p>重庆重庆市北碚区cc</p>
                            <p>159****3664</p>
                        </div>
                        <div class="edit">
                            <span>设为默认地址</span>
                            <span>编辑</span>
                            <span>删除</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <Footer-Status></Footer-Status>
        <Add-Address></Add-Address>
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
            return{}
        },
        methods:{
            newAddres(){

            }
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
                .Box{
                    display: flex;
                    flex-wrap:wrap;
                }
                .infoBox{
                    width: 380px;
                    border: 1px solid #e5e5e5;
                    margin: 32px auto 0;
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