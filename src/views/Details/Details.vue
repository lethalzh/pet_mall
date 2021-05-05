<template>
    <div class="Details">
        <Nav-Status :mode="1"></Nav-Status>
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="DetailsBody">
            <div class="aimg"><pic-zoom :url="Details.com_imgs"></pic-zoom>
                <div class="share">
                    <span>编号：{{Details.com_id}}</span>
                    <span><i class="el-icon-share"></i>分享</span>
                    <span><i class="el-icon-star-on"></i>收藏商品</span>
                </div>

            </div>
<!--            <img class="aimg" :src="Details.com_imgs" alt="">-->
            <div class="Dbody">
                <div class="topBody">
                    <h3>{{Details.com_name}}</h3>
                    <p>{{Details.com_description}}</p>
                    <div>
                        <div class="actbox">
                            <span class="title">
                                此商品参与“限时折扣”活动
                            </span>
                        </div>
                        <div class="prs pp">
                            活动价  : <span>${{Details.com_price}}</span> <del class="c333">${{Details.com_oldprice}}</del>
                        </div>

                    </div>

                    <p>月销 ：<span>{{Details.com_msales}}</span>袋</p>
                    <div class="baoz">
                         <div class="box1"><img src="https://static.epetbar.com/static_wap/appmall/lib/goods/qualityassurance.png" alt=""><span>正品·保证</span></div>
                         <div class="box"><img src="https://static.epetbar.com/static_wap/appmall/lib/goods/freeshipping.png" alt=""><span>99元包邮</span></div>
                         <div class="box"><img src="https://static.epetbar.com/static_wap/appmall/lib/goods/thirtydays.png" alt=""><span>30天退货</span></div>
                    </div>
                    <p>我要买 : <el-input-number v-model="num" size="small" :min="1"  :max="Details.com_num"></el-input-number> <span>还有：{{Details.com_num}}</span></p>
                    <p >总价格：${{(num*Details.com_price).toFixed(2)}}  已经优惠：${{(num*(Details.com_oldprice -Details.com_price)).toFixed(2)}}</p>
                    <p class="addr">送货至 : <el-input v-model="address"  aria-valuenow='1' placeholder="请输入配送地址"></el-input></p>
                    <p>16点前下单，当天发货。</p>
                    <el-button type="success" @click="addCart">加入购物车</el-button>
                    <el-button type="primary" @click="subSet">立即购买</el-button>
                </div>
            </div>

            <div class="hotList">
                <div class="hottitle" :class="$getState('cache','Animal')=='dog'?'dogBtmbr':'catBtmbr'">
                    <div class="h2">热门商品排行</div>
                </div>
                <div class="item" v-for="(hot,index) of hotInfo" :key="index" @click="toDetail(hot.com_id)">
                    <img :src="hot.com_imgs" alt="">
                    <div class="itemc">
                        <div class="name"><span>{{hot.com_name}}</span></div>
                        <div class="price"><span>${{hot.com_price}}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="DetailsBotm">
            <el-tabs v-model="activeName"  type="card">
                <el-tab-pane label="商品详情" name="first">
                    <div class="gd_details mb ft16 Detailname rela" style="display: block;">

                        <!--品牌相关信息-->
                        <div class="country-intro clearfix">
                            <div class="America-bg"></div>
                            <div class="fl brands-nimg mr15">
                                <a href="http://www.epet.com/brand/bd2029.html" target="_blank">
                                    <img src="https://img2.epetbar.com/nowater/brand_logo/2017-12/07/17/16037b64b3a9c46f9ab92001e9231136.png">
                                </a>
                            </div>
                            <div class="fl brands-home">
                                <div class="ft14 c444 clearfix" data-name="brand-info">
                                    <a href="http://www.epet.com/brand/bd2029.html" target="_blank"><span class="fontline fl">纽顿nutram number品牌馆</span></a>
                                    <span class="ml mr fl">|</span>
                                    <a href="http://www.epet.com/global/region/America.html" target="_blank"><span class="fontline fl">美洲馆 · 加拿大</span></a>
                                    <!--品牌关注按钮-->
                                    <a class="dib concern ml15 mt5 fl pointer follow-btn " data-isfollow="0" onclick="Epet.Goods.attentionBrand()"></a></div>
                                <div class="brands-sign clearfix">
                                </div>
                            </div>
                            <div class="brands-place fr">
                                <div class="ft14 textR"><span class="c999">生产产地：</span>加拿大</div>
                                <div class="ft14 textR"><span class="c999">品牌起源地：</span>加拿大</div>
                            </div>
                        </div>


                        <div class="imgdetail"><div><img alt="5521995" src="//img1.epetbar.com/2018-04/28/11/af400bcde1434f50845e525bf34bdf41.jpg@!water" style="opacity: 1;"></div><div><img alt="5521996" src="//img1.epetbar.com/2018-04/28/11/ee1039c0b4540883b298d80b01200260.jpg@!water" style="opacity: 1;"></div><div><img alt="5521997" src="//img1.epetbar.com/2018-04/28/11/745c00b76fba974569405b8423415e5f.jpg@!water" style="opacity: 1;"></div><div><img alt="5521998" src="//img1.epetbar.com/2018-04/28/11/09edfe74f1a18af580fee6763c550177.jpg@!water" style="opacity: 1;"></div><div><img alt="5521999" src="//img1.epetbar.com/2018-04/28/11/5910227f2e5eacfee6c937256bcf024a.jpg@!water" style="opacity: 1;"></div><div><img alt="5522000" src="//img1.epetbar.com/2018-04/28/11/f4d03315748a022e48d2960c908bfd63.jpg@!water" style="opacity: 1;"></div><div><img alt="5522001" src="//img1.epetbar.com/2018-04/28/11/ca3395c6a3ec46ebf4b9178a192943bf.jpg@!water" style="opacity: 1;"></div><div><img alt="5522002" src="//img1.epetbar.com/2018-04/28/11/f897eb89c5f597a17208731ffadb9a1c.jpg@!water" style="opacity: 1;"></div><div><img alt="5522003" src="//img1.epetbar.com/2018-04/28/11/0defb45be8f0535388badc893e8f2ab7.jpg@!water" style="opacity: 1;"></div><div><img alt="5522004" src="//img1.epetbar.com/2018-04/28/11/44183fc52ea4a263e89b5226bc79e745.jpg@!water" style="opacity: 1;"></div><div><img alt="5522005" src="//img1.epetbar.com/2018-04/28/11/d2da63eb22f35e852a10335141172820.jpg@!water" style="opacity: 1;"></div><div><img alt="5522006" src="//img1.epetbar.com/2018-04/28/11/21a895506081795b78fd68462608d631.jpg@!water" style="opacity: 1;"></div><div><img alt="5522007" src="//img1.epetbar.com/2018-04/28/11/8b3de4b7cbbd1abfb03a456530e81110.jpg@!water" style="opacity: 1;"></div><div><img alt="5522008" src="//img1.epetbar.com/2018-04/28/11/ace36878c6e3de751b5226f04accf2b5.jpg@!water" style="opacity: 1;"></div><div><img alt="5522009" src="//img1.epetbar.com/2018-04/28/11/eaee6ec1e5bac256f10c329533ada785.jpg@!water" style="opacity: 1;"></div><div><img alt="5522010" src="//img1.epetbar.com/2018-04/28/11/12058d9dc8c4c294c83f551e41ddb5b6.jpg@!water" style="opacity: 1;"></div><div><img alt="5522011" src="//img1.epetbar.com/2018-04/28/11/c9832224fa17d4f7cfac19650a0381e3.jpg@!water" style="opacity: 1;"></div><div><img alt="5522013" src="//img1.epetbar.com/2018-04/28/11/a799b478cf8b730f3c39dcd7923bb796.jpg@!water" style="opacity: 1;"></div></div>
                        <div class="rel intro-bottom">
                            <a href="http://www.epet.com/article/111.html" target="_blank" class="tuihuo">&nbsp;</a>
                            <a href="http://www.epet.com/article/112.html" target="_blank" class="daimai">&nbsp;</a>
                        </div>
                        <div class="price-font bgf5 ct">
                            <div class="pricefont-tit ct ftc"><span class="db ct"></span></div>
                            <div class="pricefont-zi">
                                <h1 class="ft14 mt30 mb bold cstress">价格说明：</h1>

                                <p class="ft14 c666 mt15"><strong>E宠价：</strong>E宠价为商品的销售价，是您最终决定是否购买商品的依据。</p>
                                <p class="ft14 c666 mt15"><strong>划线价：</strong>商品展示的划横线价格为参考价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在E宠商城上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。</p>

                                <p class="ft14 c666 mt15"><strong>折扣：</strong>折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系客服进行咨询。</p>

                                <p class="ft14 c666 mt15"><strong>异常问题：</strong>商品促销信息以商品详情页“促销”栏中的信息为准；因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺利购物。</p>
                            </div>
                        </div>        </div>
                </el-tab-pane>
                <el-tab-pane label="正牌保证" name="second">
                    <div class="title">
                        <span>授权文件</span>
                    </div>
                    <div class="sqimg">
                        <img src="https://img2.epetbar.com/2020-08/31/17/90e07492833bfc642b909040036d9d19.jpg?x-oss-process=style/water" alt="">
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <Footer-Status></Footer-Status>
        <Add-Cart ref="openMsg"></Add-Cart>
    </div>
</template>

<script>
    import PicZoom from "vue-piczoom";
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import AddCart from '@/components/AddCart.vue'
    export default {
        name: "Details",
        components: {
            NavStatus,FooterStatus,AddCart,PicZoom
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
                Details:{com_imgs:''},
                hotInfo:[],
                activeName:'first',
            }
        },
        methods:{
            toDetail(Url){
                window.location.href=`${this.$getState('dict','thisUrl')}details/${Url}`;
            },
            openmsg(){
                this.$refs.openMsg.open();
            },
            async getDetails(){
                let pid =  this.$route.params.pid;
                let [err,res] = await this.$apis.product.getDetails({pid:pid});
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
                if( sessionStorage.getItem('userId')||this.$getState('user','userId')){
                    this.Details.id = sessionStorage.getItem('userId');
                    let [err,res] = await this.$apis.product.addCart(this.Details);
                    if(res.msg=='success'){
                        this.$message({
                            message: '加入成功',
                            type: 'success'
                        });
                        this.openmsg()
                    }else{
                        this.$message({
                            message:'加入失败',
                            type: 'warning'
                        });
                    }
                }
                else{
                    this.$message({
                        message:'没有登录请登录',
                        type: 'warning'
                    });
                }
            },
            async getHotList(){
                let [err,res] = await this.$apis.product.getHotList();
                if(res.msg=='success'){
                    this.hotInfo= res.data;
                }
            },
            subSet(){

                if(this.$getState('user','userId')||sessionStorage.getItem('userId')) {
                    this.Details.num=this.num;
                    this.$router.push({name:'odergroup',
                        params:{commodity:[this.Details],totalPrice:this.Details.num*this.Details.com_price}
                    })
                }else {
                    this.$message({
                        message:'没有登录请登录,请先登录',
                        type: 'warning'
                    });
                }

            }

        },
        created() {
            this.getDetails();
            this.getHotList()
        }
    }
</script>

<style scoped lang="scss">
.Details{
    .nav{
        width: 1200px;
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
            width: 250px;
            height: 250px;
            .share{
                color: #999;
                font-size: 12px;
                cursor: pointer;
                span{
                    margin-right: 17px;
                }
            }
        }
        .Dbody{
            margin-left: 50px;
            width: 667px;
            padding: 40px;
            height: 510px;
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
                .actbox{
                    color: #fff;
                    width: 667px;
                    height: 63px;
                    line-height: 63px;
                    background: url(https://img2.epetbar.com/nowater/2021-03/10/15/bc4e989bccede01debd0d7b80d9f1106.png) no-repeat;
                    .title{
                        padding: 20px;
                    }
                }
                .prs{
                    width:627px;
                    height: 55px;
                    line-height: 55px;
                    background: #f3f3f3;
                    padding: 0px 20px 10px 20px;
                    .c333{
                        color: #333;
                        margin-left: 10px;
                        font-size: 14px;
                    }
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
    .hotList{
        margin-left: 15px;
        .dogBtmbr{
            border-bottom: 2px solid #85BC56;
        }
        .carBtmbr{
            border-bottom: 2px solid #e74085;
        }
        .hottitle{
            height: 30px;
            line-height: 30px;
            background-color: #FFF;
            width: 180px;
            .h2{
                padding-left: 12px;
                display: block;
                font-size: 14px;
                font-weight: 700;
            }
        }
        .item{
            cursor: pointer;
            display: flex;
            width: 180px;
            padding: 10px 8px;
            border-bottom: 1px dashed #e3e3e3;
            height: auto;
            .itemc{
                margin-left: 10px;
            }
            img{
                width: 60px;
                height: 60px;
            }
            .name{
                color: #444;
                font-size: 12px;
                &:hover{
                    color: #248DCC;
                }
            }
            .price{
                margin-top: 8px;
                font-weight: 700;
                color: #F60;
            }
        }
    }
    .brands-nimg {
        width: 120px;
        height: 60px;
        border: 1px solid #d7d7d7;
        margin: 0 auto;
        img{
            width: 120px;
            height: 60px;
        }
    }
    .country-intro{
        width: 1000px;
        text-align: center;
    }
    .DetailsBotm{
        width: 1000px;
        margin: 0 auto;

        .c444{
            color: #444;
        }
        .gd_details img {
            display: block;
            margin: 0 auto;
            max-width: 882px;
        }
        img {
            vertical-align: middle;
        }
        .mt30 {
            margin-top: 30px;
        }
        .cstress {
            color: #f03e3e;
        }
        .bold {
            font-weight: 700;
        }
        .ft14 {
            font-size: 14px;
        }
        .c666 {
            color: #666;
        }
         .intro-bottom {
            background: url(../../assets/images/goods_intro_bottom.jpg) no-repeat center center;
            width: 100%;
            height: 880px;
        }
        .pricefont-zi{
            width: 800px;
            margin: 0 auto;
        }
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

    }
    .sqimg{
        img{
            width: 100%;
        }
    }
}
</style>