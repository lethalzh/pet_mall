<template>
    <div class="FooterStatus">
        <div class="footrTop">
            <div class="footImgs">
                <span class="zp">正品保障</span>
                <span class="pl">品类丰富</span>
                <span class="fw">优质服务</span>
                <span class="kx">科学养宠</span>
                <span class="gy">宠爱公益</span>
            </div>
        </div>
        <div class="footerWrapper">
            <div class="info">
                <div class="leftInfo">
                    <img :src="$getState('cache','Animal')=='dog'?dogPhone:catPhone" alt="">
                    <div class="content">
                        <h4>售后电话：</h4>
                        <p>4000000000</p>
                        <p>023-12345678</p>
                        <p>服务时间：09:00--18:30（周一到周日）</p>
                    </div>
                </div>
                <div class="gwzn">
                    <h4>购物指南</h4>
                    <p>新人优惠</p>
                    <p>购物问题</p>
                    <p>支付问题</p>
                </div>
                <div class="gwzn">
                    <h4>售后服务</h4>
                    <p>退换货政策</p>
                    <p>退款说明</p>
                    <p>售后问题</p>
                </div>
                <div class="other">
                    <p>了解更多qq</p>
                    <img src="//static.epet.com/www/images/dw2.png?v=10" alt="">
                </div>
                <div class="other">
                    <p>了解更多微信</p>
                    <img src="//static.epet.com/www/images/dw2.png?v=10" alt="">
                </div>
            </div>
        </div>
        <div class="footAbout">
            <div class="aboutBox">
                <span>关于我们</span>
                <span>
                    <img src="//static.epet.com/static_web/pc/src/images/background/weibo_logo.png" alt="">
                    宠爱商城
                </span>
                <span>
                    <img src="//static.epet.com/static_web/pc/src/images/background/weixin_logo.png" alt="">
                    宠爱商城
                </span>
                <span>
                    <img src="//static.epet.com/static_web/pc/src/images/background/baidu_log.png" alt="">
                    宠爱商城
                </span>
                <span>
                    <img src="//static.epet.com/static_web/pc/src/images/background/toutiao_logo.png" alt="">
                    宠爱说
                </span>
                <span>宠爱公益</span>
                <span>联系我们</span>
                <span>应急响应</span>
                <span>仓库中心</span>
                <span>用户协议</span>
            </div>
        </div>
        <div class="footCopy">
            <p>　　
                <span>渝ICP备10002905号-1</span>
                <span>渝ICP备10002905号-3</span>
                <span>营业执照</span>
                <span>兽药经营许可证</span>
                <span>增值电信业务经营许可证：渝00-20200000 Copyright © 20021-2021 　宠爱有限公司</span>
            </p>
        </div>
    </div>
</template>

<script>
    import dogPhone from '@/assets/images/dog_phone.gif'
    import catPhone from '@/assets/images/cat_phone.gif'
    export default {
        name: "FooterStatus",
        data(){
            return{
                dogPhone,catPhone,

            }
        }
    }
</script>

<style scoped lang="scss">
    .FooterStatus{
        background: #f5f5f5;
        .footrTop{
            border-bottom: 1px solid #e5e5e5;
            height: 85px;
            .footImgs{
                width: 1000px;
                display: flex;
                margin: 0 auto;
                padding-top: 10px;
                span{
                    background: url(../assets/images/footer_logo.png) no-repeat;;
                    display: block;
                    width: 128px;
                    height: 62px;
                    padding-left: 72px;
                    line-height: 62px;
                    color: #444;
                    font-weight: 700;
                    transition: all .8s ease;
                    font-size: 18px;
                    &:hover{
                        color: #ed4044;
                        transform: translateY(-5px);
                    }
                }
                .zp{
                    background-position:0 0;
                }
                .pl{
                    background-position:0 -162px;
                }
                .fw{
                    background-position:0 -242px;
                }
                .kx{
                    background-position:0 -82px;
                }
                .gy{
                    background-position:0 -322px;
                }


            }
        }
        .footerWrapper{
            width: 1200px;
            margin: 10px auto;
            .info{
                display: flex;
                .leftInfo{
                    display: flex;
                    padding-bottom: 25px;
                    border-bottom: 1px solid #e5e5e5;
                    img{
                        width: 105px;
                        height: 99px;
                    }
                    .content{
                        margin-left: 30px;
                        h4{
                            font-weight: 700;
                            color: #666666;
                            font-size: 14px;
                            margin-block-start: 1em;
                            margin-block-end: 1em;
                        }
                        p{
                            font-size: 16px;
                            margin-block-start: .9em;
                            margin-block-end: .9em;
                        }
                    }
                }
                .gwzn{
                    margin: 0 40px 0 90px;
                    font-size: 14px;
                    h4{
                        color: #666;
                    }
                    p{
                        color: #444;
                    }

                }
                .other{
                    margin-left: 100px;
                    font-size: 12px;
                    text-align: center;
                }
            }
        }
        .footAbout{
            padding-top: 20px;
            .aboutBox{
                width: 950px;
                height: 20px;
                line-height: 20px;
                margin: 0 auto;
                display: flex;
                font-size: 12px;
                text-align: center;
                vertical-align: middle;
                span{
                    display: inline-block;
                    margin: 0 15px 10px 0;
                    color: #999;
                    width: 80px;
                    img{
                        width: 18px;
                        height: 18px;
                    }
                }
            }
        }
        .footCopy{
            padding: 20px 0 40px;
            color: #000;
            margin: 0 auto;
            width: 865px;
            p{
                font-size: 12px;
                span{
                    margin-left: 10px;
                }
            }
        }
    }

</style>