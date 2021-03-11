<template>
    <div class="home">
        <div class="homeBody">
            <div class="leftBody">
                <div class="title"><i></i><span>狗狗主粮</span></div>
                <div class="img">
                    <a href=""><img src="https://img2.epetbar.com/nowater/2020-04/26/11/1ce336674ef947814ec8c5bb1830c799.jpg" alt=""></a>
                    <div class="leftSpans">
                        <div class="leftSpansTitle">
                            <span>——————————————————</span>
                            <i></i> <b>最热HOT</b>
                            <span>——————————————————</span>
                        </div>
                        <div class="leftSpans">
                            <el-tag type="info" size="small" >标签三</el-tag>
                            <el-tag type="info" size="small" >标签三</el-tag>
                            <el-tag type="info" size="small" >标签三</el-tag>
                    </div>
                    </div>
                </div>
                <div class="contner"></div>
            </div>
            <div class="rightBody">
                <el-tabs type="card" >
                    <el-tab-pane label="热门推荐">
                        <div class="content">
                            <div class="topImg">
                                <router-link to="aa">
                                    <div class="leftImg">
                                        <div class="ad_font">
                                            <p>aa</p>
                                            <p>cc</p>
                                        </div>
                                        <img style="width: 389px;height: 299px" src="//img2.epet.com/2019-04/25/15/dd01e3d56b5d35a60d9106c77ef9fc1e.jpg@!water" alt="">
                                    </div>
                                </router-link>
                                <div>
                                    <router-link to="aa">
                                        <div class="rightImg">
                                            <div class="ad_font">
                                                <p>aa</p>
                                                <p>cc</p>
                                            </div>
                                            <img style="width: 465px;height: 149px" src="//img2.epet.com/2019-04/25/15/8a6fae0494f19540b20f156e26cc288e.jpg@!water" alt="">
                                        </div>
                                    </router-link>
                                    <router-link to="aa">
                                        <div class="rightImg">
                                            <div class="ad_font">
                                                <p>aa</p>
                                                <p>cc</p>
                                            </div>
                                            <img style="width: 465px;height: 149px" src="//img2.epet.com/2019-04/25/16/9f08060e66a2606d85d32158279fb3b9.jpg@!water" alt="">
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="btmImg">
                                <router-link to="aa">
                                    <div class="rightImg">
                                        <div class="ad_font">
                                            <p>aa</p>
                                            <p>cc</p>
                                        </div>
                                        <img src="//img2.epet.com/2019-04/25/16/da7f04d5a8d573096113dccae6d95f80.jpg@!water" alt="">
                                    </div>
                                </router-link>
                                <router-link to="aa">
                                    <div class="rightImg">
                                        <div class="ad_font">
                                            <p>aa</p>
                                            <p>cc</p>
                                        </div>
                                        <img src="//img2.epet.com/2019-04/25/16/da7f04d5a8d573096113dccae6d95f80.jpg@!water" alt="">
                                    </div>
                                </router-link>
                                <router-link to="aa">
                                    <div class="rightImg">
                                        <div class="ad_font">
                                            <p>aa</p>
                                            <p>cc</p>
                                        </div>
                                        <img src="//img2.epet.com/2019-04/25/16/da7f04d5a8d573096113dccae6d95f80.jpg@!water" alt="">
                                    </div>
                                </router-link>

                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="热门商品">
                        <div class="content">
                            <div class="item" v-for="i in 8" :key="i">
                                <router-link to="a">
                                    <div class="cimg">
                                        <img src="//img1.epet.com/common/upload/commonfile/2020/02/03/140054_145161.jpg@!200w-c" alt="">
                                    </div>
                                    <p>csac1211111111111111111111111111111111111111111111111111111</p>
                                    <span>￥q1212</span>
                                </router-link>
                            </div>
                        </div>
                    </el-tab-pane>

                </el-tabs>
            </div>
        </div>
        <div class="Btmimgs">
            <div class="imgs" v-for="i in 8" :key="i">
                <router-link :to="i+'a'">
                    <img src="http://img2.epetbar.com/nowater/brand_logo/2018-01/17/15/dcdd9aa566992eae9360447c5da128c5.jpg?x-oss-process=style/fill&$1=100&$2=48" alt="">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeBody",
        data(){
            return {
                bodyData:[{title:''}]
            }
        }
    }
</script>

<style scoped lang="scss">
    .home{
        width: 1200px;
        margin: 0px auto;
        .homeBody{
            display: flex;
            margin: 0px auto;
            padding-top: 20px;

            .leftBody{
                .title{
                    font-size: 20px;
                    color: #6f6f6f;
                    margin: 5px 0 10px 0;
                }
                .img{
                    position: relative;
                    .leftSpans{
                        background: rgba(255,255,255,.6);
                        position: absolute;
                        width: 300px;
                        height: 148px;
                        left: 0;
                        bottom: 0;
                        padding: 15px;
                        .leftSpansTitle{
                            display: flex;
                            span{
                                width: 87px;
                                overflow: hidden;
                            }
                            i{
                                background: url(../../assets/images/index-ico.png)  -113px -170px no-repeat;
                                width: 27px;
                                height: 27px;
                                margin-left: 10px;
                                background-position: -113px -170px;
                            }
                            b{
                                margin: 2px 5px 0 5px;
                                color: #666;
                                font-size: 14px;
                            }
                        }
                        .leftSpans{
                            width: 315px;
                            height: 102px;
                            margin-top: 10px;
                            display: flex;
                            flex-wrap: wrap;
                            span{
                                width: 100px;
                                height: 24px;
                                line-height: 24px;
                                border-radius: 30px;
                                margin: 5px 2px;
                                text-align: center;

                            }
                        }
                    }

                }
            }
            .rightBody{
                .ad_font{
                    width: 160px;
                    position: absolute;
                    top: 30px;
                    left: 45px;
                    z-index: 1;
                    :first-child{
                        color: #000;
                        font-size: 16px;
                    }
                    :last-child{
                        color: #f40;
                        margin-top: 5px;
                        font-size: 14px;
                    }
                }
                .content{
                    width: 840px;
                    display: flex;
                    flex-wrap: wrap;
                    .topImg{
                        display: flex;
                        margin-top: -15px;
                        .leftImg{
                            position: relative;
                            img{
                                transition: transform .5s,-webkit-transform .5s,-moz-transform .5s;
                            }
                            &:hover img{
                                transform: translateX(-5px);
                            }
                        }
                        .rightImg{
                            position: relative;
                            img{
                                transition: transform .5s,-webkit-transform .5s,-moz-transform .5s;
                            }
                            &:hover img{
                                transform: translateX(-5px);
                            }
                        }
                    }
                    .btmImg{
                        display: flex;
                        .rightImg{
                            position: relative;
                            img{
                                transition: transform .5s,-webkit-transform .5s,-moz-transform .5s;
                            }
                            &:hover img{
                                transform: translateX(-5px);
                            }
                        }
                        img{
                            width: 289px;
                            height: 171px;

                        }
                    }
                    .item{
                        border-bottom: 1px solid #e7e7e7;
                        border-right: 1px solid #e7e7e7;
                        width: 189px;
                        padding: 10px;
                        height: 220px;
                        margin-top: -10px;
                        p{
                            font-size: 12px;
                            color: #666 ;
                            word-wrap: break-word;
                            overflow: hidden;
                        }
                        span{
                            color: #dd2727 ;
                            font-size: 16px;
                        }
                        .cimg{
                            width: 200px;
                            text-align: center;
                            margin-bottom: 15px;
                            img{
                                width: 136px;
                                height: 136px;
                                margin-top: 5px;
                            }

                        }
                    }
                }
            }
        }
        .Btmimgs{
            display: flex;
            .imgs{
                width: 148px;
                height: 66px;
                border-left: 1px solid #e7e7e7;
                overflow: hidden;
                text-align: center;
                :hover img{
                    opacity: .8;
                }
                img{
                    margin-top: 8px;
                }
            }
        }
    }

</style>