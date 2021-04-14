<template>
    <div class="home"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.6)"
    >
        <div v-for="(data,index) of bodyData" :key="index">
            <div class="homeBody" >
                <div class="leftBody">
                    <div class="title"><i></i><span>{{data.hottitel}}</span></div>
                    <div class="img">
                        <a href=""><img :src="data.hotimg" alt=""></a>
                        <div class="leftSpans">
                            <div class="leftSpansTitle">
                                <span>——————————————————</span>
                                <i></i> <b>最热HOT</b>
                                <span>——————————————————</span>
                            </div>
                            <div class="leftSpans">
                                <el-tag type="info" size="small" v-for="(char,j) of data.hotchars" :key="j"
                                        @click="toProduct(char)"
                                >{{char}}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                    <div class="contner"></div>
                </div>
                <div class="rightBody">
                    <el-tabs type="card">
                        <el-tab-pane label="热门推荐">
                            <div class="content">
                                <div class="topImg">
                                    <div class="leftImg" @click="toProduct(data.hotCons[0].con_titile)">
                                        <div class="ad_font">
                                            <p>{{data.hotCons[0].con_titile}}</p>
                                            <p>{{data.hotCons[0].con_content}}</p>
                                        </div>
                                        <img style="width: 389px;height: 299px" :src="data.hotCons[0].con_img">
                                    </div>
                                    <div>
                                        <div class="rightImg" @click="toProduct(data.hotCons[1].con_titile)">
                                            <div class="ad_font">
                                                <p>{{data.hotCons[1].con_titile}}</p>
                                                <p>{{data.hotCons[1].con_content}}</p>
                                            </div>
                                            <img style="width: 465px;height: 149px"
                                                 :src="data.hotCons[1].con_img">
                                        </div>
                                        <div class="rightImg" @click="toProduct(data.hotCons[2].con_titile)">
                                            <div class="ad_font">
                                                <p>{{data.hotCons[2].con_titile}}</p>
                                                <p>{{data.hotCons[2].con_content}}</p>
                                            </div>
                                            <img style="width: 465px;height: 149px"
                                                 :src="data.hotCons[2].con_img">
                                        </div>
                                    </div>
                                </div>
                                <div class="btmImg">
                                    <div class="rightImg" @click="toProduct(data.hotCons[3].con_titile)">
                                        <div class="ad_font">
                                            <p>{{data.hotCons[3].con_titile}}</p>
                                            <p>{{data.hotCons[3].con_content}}</p>
                                        </div>
                                        <img :src="data.hotCons[3].con_img">
                                    </div>
                                    <div class="rightImg" @click="toProduct(data.hotCons[4].con_titile)">
                                        <div class="ad_font">
                                            <p>{{data.hotCons[4].con_titile}}</p>
                                            <p>{{data.hotCons[4].con_content}}</p>
                                        </div>
                                        <img :src="data.hotCons[4].con_img">
                                    </div>
                                    <div class="rightImg" @click="toProduct(data.hotCons[5].con_titile)">
                                        <div class="ad_font">
                                            <p>{{data.hotCons[5].con_titile}}</p>
                                            <p>{{data.hotCons[5].con_content}}</p>
                                        </div>
                                        <img :src="data.hotCons[5].con_img">
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="热门商品">
                            <div class="content">
                                <div  v-for="(da,i) of data.arr" :key="i">
                                    <div class="item" v-if="da.com_id>0" >
                                        <router-link :to="'/details/'+da.com_id">
                                            <div class="cimg">
                                                <img :src="da.com_imgs">
                                            </div>
                                            <p>{{da.com_name}}</p>
                                            <span>￥{{da.com_oldprice}}</span>
                                        </router-link>
                                    </div>
                                </div>

                            </div>
                        </el-tab-pane>

                    </el-tabs>
                </div>
            </div>
            <div class="Btmimgs">
                <div class="imgs" v-for="(br,l) of data.brand" :key="l">
                    <span @click="toProduct(br.titile)">
                        <img :src="br.logo">
                    </span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "HomeBody",
        data() {
            return {
                bodyData: [],
                loading:true,
            }
        },
        methods: {
            async getHomeBody() {
                let [err, res] = await this.$apis.home.getHomeBody();
                if (res.msg == 'success'){
                    this.bodyData = res.data;
                    this.loading=false
                }


            },
            toProduct(Url, ur = '') {
                let str = Url;
                if (ur != '')
                    str += '+' + ur;
                window.location.href = `${this.$getState('dict', 'thisUrl')}product/${str}`;
            },
        },
        created() {
            this.getHomeBody()
        }
    }
</script>

<style scoped lang="scss">
    .home {
        width: 1200px;
        margin: 0px auto;

        .homeBody {
            display: flex;
            margin: 0px auto;
            padding-top: 20px;

            .leftBody {
                .title {
                    font-size: 20px;
                    color: #6f6f6f;
                    margin: 5px 0 10px 0;
                }

                .img {
                    position: relative;

                    .leftSpans {
                        background: rgba(255, 255, 255, .6);
                        position: absolute;
                        width: 300px;
                        height: 148px;
                        left: 0;
                        bottom: 0;
                        padding: 15px;
                        .el-tag{
                            cursor: pointer;
                        }
                        .leftSpansTitle {
                            display: flex;

                            span {
                                width: 87px;
                                overflow: hidden;
                            }

                            i {
                                background: url(../../assets/images/index-ico.png)  -113px -170px no-repeat;
                                width: 27px;
                                height: 27px;
                                margin-left: 10px;
                                background-position: -113px -170px;
                            }

                            b {
                                margin: 2px 5px 0 5px;
                                color: #666;
                                font-size: 14px;
                            }
                        }

                        .leftSpans {
                            width: 315px;
                            height: 102px;
                            margin-top: 10px;
                            display: flex;
                            flex-wrap: wrap;

                            span {
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

            .rightBody {
                .ad_font {
                    width: 160px;
                    position: absolute;
                    top: 30px;
                    left: 45px;
                    z-index: 1;

                    :first-child {
                        color: #000;
                        font-size: 16px;
                    }

                    :last-child {
                        color: #f40;
                        margin-top: 5px;
                        font-size: 14px;
                    }
                }

                .content {
                    width: 840px;
                    display: flex;
                    flex-wrap: wrap;

                    .topImg {
                        display: flex;
                        margin-top: -15px;

                        .leftImg {
                            position: relative;
                            cursor: pointer;

                            img {
                                transition: transform .5s, -webkit-transform .5s, -moz-transform .5s;
                            }

                            &:hover img {
                                transform: translateX(-5px);
                            }
                        }

                        .rightImg {
                            position: relative;
                            cursor: pointer;

                            img {
                                transition: transform .5s, -webkit-transform .5s, -moz-transform .5s;
                            }

                            &:hover img {
                                transform: translateX(-5px);
                            }
                        }
                    }

                    .btmImg {
                        display: flex;

                        .rightImg {
                            position: relative;
                            cursor: pointer;

                            img {
                                transition: transform .5s, -webkit-transform .5s, -moz-transform .5s;
                            }

                            &:hover img {
                                transform: translateX(-5px);
                            }
                        }

                        img {
                            width: 289px;
                            height: 171px;

                        }
                    }

                    .item {
                        border-bottom: 1px solid #e7e7e7;
                        border-right: 1px solid #e7e7e7;
                        width: 189px;
                        padding: 10px;
                        height: 220px;
                        margin-top: -10px;
                        cursor: pointer;

                        p {
                            font-size: 12px;
                            color: #666;
                            word-wrap: break-word;
                            overflow: hidden;
                        }

                        span {
                            color: #dd2727;
                            font-size: 16px;
                        }

                        .cimg {
                            width: 200px;
                            text-align: center;
                            margin-bottom: 15px;

                            img {
                                width: 136px;
                                height: 136px;
                                margin-top: 5px;
                            }

                        }
                    }
                }
            }
        }

        .Btmimgs {
            display: flex;
            .imgs {
                width: 148px;
                height: 66px;
                border-left: 1px solid #e7e7e7;
                overflow: hidden;
                text-align: center;
                cursor: pointer;
                :hover img {
                    opacity: .8;
                }

                img {
                    margin-top: 8px;
                }
            }
        }
    }

</style>