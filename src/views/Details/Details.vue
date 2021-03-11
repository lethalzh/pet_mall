<template>
    <div class="Details">
        <Nav-Status :mode="1"></Nav-Status>
        <div class="nav">
            <el-select v-model="value" size="mini" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select><i class="el-icon-arrow-right"></i>
            <el-select v-model="value" size="mini" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select><i class="el-icon-arrow-right"></i>
            <el-select v-model="value" size="mini" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select><i class="el-icon-arrow-right"></i><span >商品详情</span>
        </div>
        <div class="DetailsBody">
            <img class="aimg" :src="Details.com_imgs" alt="">
            <div class="Dbody">
                <div class="topBody">
                    <h3>{{Details.com_name}}</h3>
                    <p>{{Details.com_description}}</p>
                    <p class="pp">价格 : <span>${{Details.com_price*num}}</span></p>
                    <p>月销 ：<span>{{Details.com_msales}}</span>袋</p>
                    <div class="baoz">
                         <div class="box1"><img src="https://static.epetbar.com/static_wap/appmall/lib/goods/qualityassurance.png" alt=""><span>正品·保证</span></div>
                         <div class="box"><img src="https://static.epetbar.com/static_wap/appmall/lib/goods/freeshipping.png" alt=""><span>99元包邮</span></div>
                         <div class="box"><img src="https://static.epetbar.com/static_wap/appmall/lib/goods/thirtydays.png" alt=""><span>30天退货</span></div>
                    </div>
                    <p>我要买 : <el-input-number v-model="num" size="small" :min="1"></el-input-number></p>
                    <p class="addr">送货至 : <el-input v-model="address"  aria-valuenow='1' placeholder="请输入配送地址"></el-input></p>
                    <p>16点前下单，当天发货。</p>
                    <el-button type="success" @click="openmsg">加入购物车</el-button>
                </div>
            </div>
        </div> ..
        <Footer-Status></Footer-Status>
        <Add-Cart ref="openMsg"></Add-Cart>
    </div>
</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import AddCart from '@/components/AddCart.vue'
    export default {
        name: "Details",
        components: {
            NavStatus,FooterStatus,AddCart
        },
        data(){
            return{
                options: [{
                    value: 1,
                    label: '黄金糕'
                }, {
                    value: 2,
                    label: '双皮奶'
                }],
                value:1,
                num:1,
                address:'',
                Details:{
                },
            }
        },
        methods:{
            openmsg(){
                this.$refs.openMsg.open();
                this.addCart()
            },
             async getDetails(){
                let pid =  this.$route.params.pid
                let [err,res] = await this.$apis.product.getDetails({pid:pid})
                if(res.msg=='success'){
                    this.Details=res.data;
                }else{
                    this.$message({
                        message:'getDetails失败',
                        type: 'warning'
                    });
                }
            },
            async addCart(){
                this.Details.num = this.num;
                this.Details.address = this.address;
                this.Details.id = sessionStorage.getItem('userId')
                let [err,res] = await this.$apis.product.addCart(this.Details);
                if(res.msg=='success'){
                    this.$message({
                        message: '加入成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message:'加入失败',
                        type: 'warning'
                    });
                }
            }
        },
        created() {
            this.getDetails();
        }
    }
</script>

<style scoped lang="scss">
.Details{
    .nav{
        width: 700px;
        margin: 0 auto 10px;
        .el-select{
            width: 105px;
        }
        span{
            font-size: 12px;
        }
    }
    .DetailsBody{
        width: 1200px;
        display: flex;
        margin: 0 auto;
        .aimg{
            margin-top: 30px;
            margin-left: 300px;
            width: 250px;
            height: 250px;
        }
        .Dbody{
            margin-left: 40px;
            width: 667px;
            padding: 40px;
            background: #fcfcfc;
            .topBody{
                h3{
                    color: #333;
                    font-weight: 700;
                    font-size: 18px;
                }
                :nth-child(2){
                    color: #e3393c;
                    font-size: 14px;
                }

                p{
                    color: #999;
                    font-size: 14px;
                }
                .pp{
                    color: #999;
                    font-size: 14px;
                    span{
                        font-size: 34px;
                        color:  #e3393c;
                    }
                }
                :nth-child(4){
                    color: #999;
                    font-size: 14px;
                    span{
                        font-size: 16px;
                        color:  #e3393c;
                    }
                }

                .addr{
                    .el-input{
                        width: 230px;
                    }
                }
                .baoz{
                    display: flex;
                    border-bottom: 1px #d1d1d1 dashed;
                    padding-bottom: 10px;
                    .box,.box1{
                        padding: 0 15px;
                        border-left: 1px solid #d7d7d7;
                        font-size: 12px;
                        position: relative;
                        z-index: 1;
                    }
                    .box1{
                        padding-left: 0px;
                        border-left: none;
                    }
                    img{
                        vertical-align: middle;
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }

}
</style>