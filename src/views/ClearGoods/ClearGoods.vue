<template>
    <div class="Clear">
        <div class="ClearGoods">
            <Nav-Status :mode="1"></Nav-Status>
            <img src="@/assets/images/cleargoodBG.jpg"  class="bgimg">
            <div class="navCgood">
                <el-select v-model="Animal"  placeholder="请选择" @change="getNavData">
                    <el-option label="狗狗" value="dog"></el-option>
                    <el-option label="猫咪" value="cat"></el-option>
                </el-select>
                <el-select v-model="type" placeholder="请选择" @change="resData">
                    <el-option
                           v-for="(tit,i) of titles"
                           :key="i"
                           :label="tit.titel"
                           :value="tit.titel">
                        <span style="float: left">{{ tit.titel }}</span>
                        <img style="float: right; width: 30px" :src="tit.timg" >
                    </el-option>
                </el-select>
                <div class="div">
                    <span :class="Animal=='dog'?'spanDog':'spanCat'" @click="geyClearGoods(1)" class="ccc">折扣</span>
                    <span :class="Animal=='dog'?'spanDog':'spanCat'" @click="geyClearGoods(2)" class="ccc">价格</span>
                </div>

            </div>
            <div class="CgoodsBody">
                <div class="gooditem" v-for="(good,j) of cGooodsList" :key="j">
                    <router-link :to="'/details/'+good.com_id">
                    <div class="disCoun">
                        <span>{{(good.zk*10).toFixed(1)}}</span>
                        <div>折</div>
                    </div>
                    <img :src="good.com_imgs" class="iImg">
                    <div><p>{{good.com_name}}</p></div>
                    <div class="ibuttom">
                        <div><span class="span1">${{(good.com_price).toFixed(2)}}</span><span class="span2">${{(good.com_oldprice).toFixed(2)}}</span></div>
                        <div><i class="el-icon-shopping-cart-1"></i></div>
                    </div>
                    </router-link>
                </div>

            </div>
            <div style="text-align: center;margin-bottom: 10px">
                <el-pagination
                        background
                        @current-change="changePage"
                        :page-size="12"
                        layout="prev, pager, next,total"
                        :total="total">
                </el-pagination>
            </div>
            <Footer-Status></Footer-Status>
        </div>
    </div>

</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    export default {
        name: "ClearGoods",
        components:{ NavStatus,FooterStatus},
        data(){
            return{
                type:'',
                Animal:'dog',
                titles:{},
                cGooodsList:[],
                page:1,
                total:0,
            }
        },
        methods:{
            async getNavData(){
                let ai=this.Animal;
                let str = ai=="dog"?'狗狗':'猫咪';
                let [err,res] = await this.$apis.home.getNavData({Animal:ai});
                if(res.msg=='success'){
                    this.titles= res.data;
                    for(let i of  this.titles){
                        i.titel=str+i.titel
                    }
                    this.type= this.titles[0].titel
                }else {
                    this.$message.error('导航数据获取失败');
                }
            },
            async geyClearGoods(flag=0){
                let [err,res] = await this.$apis.product.getClearGoods({Animal:this.Animal,flag:flag,type:this.type,page:this.page});
                if(res.msg=='success'){
                    this.cGooodsList= res.data;
                    this.total=res.total
                }
            },
            changePage(val){
                this.page= val;
                this.geyClearGoods()
            },
            resData(){
                this.page=1;
                this.geyClearGoods()
            }
        },
        created() {
            this.getNavData();
            this.geyClearGoods()
        }
    }
</script>

<style scoped lang="scss">
    .Clear{
        width: 100vw;
        background-color: #f5f5f5;
    }
    .ClearGoods{
        width: 1200px;
        margin: 0 auto;

        .bgimg{
            margin-top: -10px;
        }
        .navCgood{
            background-color: white;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ddd;
            margin-top: 20px;
        }
        .div{
            height: 50px;
            width: 158px;
            display: inline-block;
            line-height: 50px;
            .spanDog{
                margin-top: -10px;
                height: 49px;
                width: 55px;
                border-right: 1px solid #ddd;
                display: inline-block;
                padding: 0 0 0 23px;
                line-height: 49px;
                cursor: pointer;
                background: url(../../assets/images/paixu-ico.png) no-repeat;
                background-position: 34px 4px;
                font-size: 12px;
                &:hover{
                    background: #53aa5b;
                    color: #fff;
                }
            }
            .spanCat{
                height: 49px;
                width: 55px;
                border-right: 1px solid #ddd;
                display: inline-block;
                padding: 0 0 0 23px;
                line-height: 49px;
                cursor: pointer;
                background: url(../../assets/images/paixu-ico.png) no-repeat;
                background-position: 34px 4px;
                font-size: 12px;
                &:hover{
                    background:#e74085;
                    color: #fff;
                }
            }
            .ccc{
                background-position: 34px -172px;
            }
        }
        ::v-deep .el-select{
            height: 49px;
            width: 160px;
            line-height: 49px;
            border: 1px solid #fff;
            border-bottom: none;
            color: #46ab50;
            padding-left: 38px;
            border-right: 1px dashed #ddd;
            &:hover {
                border: 1px solid #ddd;
                border-bottom: none;
            }
            .el-input,.el-input__inner{
                border-radius: 0px;
                font-size: 20px;
                border: 0px solid #DCDFE6;
                .dogfont{
                    color: #46ab50;
                }
                .catfont{
                    color: #46ab50;
                }
            }
        }
        .CgoodsBody{
            width: 1200px;
            background-color: white;
            display: flex;
            flex-wrap: wrap;
            .gooditem{
                width: 278px;
                cursor: pointer;
                border: 1px solid #ddd;
                margin: 16px 10px;
                padding-bottom: 15px;
                position: relative;
                .disCoun{
                    width: 49px;
                    height: 46px;
                    background: url(../../assets/images/discountLogo.png) no-repeat;
                    background-size: 100%;
                    text-align: center;
                    color: #fff;
                    left: 0;
                    top: 0;
                    z-index: 99;
                    :first-child{
                        font-size: 18px;
                    }
                    :last-child{
                        font-size: 12px;
                    }
                }
                .iImg{
                    width: 200px;
                    margin-left: 39px;
                }
                p{
                    margin-left: 5px;
                    margin-block-start: 0;
                    margin-block-end: 10px;
                }
                .ibuttom{
                    display: flex;
                    justify-content: space-between;
                    :first-child{
                        margin-left: 10px;
                        .span1{
                            color: #F03E3E;
                            font-size:20px;
                        }
                        .span2{
                            margin-left: 5px;
                            font-size: 12px;
                            color: #999;
                            text-decoration: line-through;
                        }
                    }
                    :last-child{
                        margin-right: 15px;
                        i{
                            font-size: 20px;
                            color: #ff4400;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>