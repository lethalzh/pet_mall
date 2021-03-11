<template>
    <div class="navbar">
        <div class="userStatus">
            <div class="uHeader">
                <div class="leftHeader">
                    <el-link :underline="false"  href="/">{{$getState('cache','Animal')=='cat'?welcomeCat:welcomeDog}} <i class="el-icon-s-home"></i></el-link>
                    <span v-if="$getState('user','userName')==null">
                        <el-link :underline="false" href="/login">[请登录]</el-link>
                        <el-link :underline="false" href="/register">[免费注册]</el-link>
                    </span>
                    <span v-else>
                         你好！！{{$getState('user','userName')}}
                    </span>
                </div>
                <div class="rightHeader">
                    <span v-if="$getState('user','userName')!=null">
                        <el-link :underline="false" href="/shopcart"><i class="el-icon-shopping-cart-1"></i> 购物车</el-link>
                         <el-link :underline="false" href="/order"><i class="el-icon-s-order"></i>我的订单</el-link>
                    </span>
                    <span v-else>
                          <el-link :underline="false" href="/shopcart"><i class="el-icon-shopping-cart-1"></i> 购物车</el-link>
                         <el-link :underline="false" href="/order"><i class="el-icon-s-order"></i>我的订单</el-link>
                    </span>
                    <el-link :underline="false" href="" type="danger">问题反馈</el-link>
                </div>
            </div>
        </div>
        <div class="navHeader" v-if="mode!=2">
            <div class="logo"><img :src="$getState('cache','Animal')=='dog'?dogLogo:catLogo"/></div>
            <div class="search">
                <div class="searchTop">
                    <input type="text" placeholder="请输入" v-model="search" :class="$getState('cache','Animal')=='dog'?'borderdog':'bordercat'"/>
                    <button :class="$getState('cache','Animal')=='dog'?'dogBgColor':'catBgColor'" @click="toProduct(search)">搜索</button>
                </div>
                <div class="searchBtm">
                    <span>热门搜索：</span>
                </div>
            </div>
            <div class="shopcart"><img :src="$getState('cache','Animal')=='dog'?dogCart:catCart"/>
                <el-badge :value="cartInNum" class="item" type="primary">
                    <el-link :underline="false"   href="/shopcart">购物车</el-link>
                </el-badge>
            </div>
        </div>

        <div class="navBody" v-if="mode!=2">
            <div class="navSpan">
                <div class="spans" ref="ani"  @mouseenter="aniHover">{{$getState('cache','Animal')=='dog'?'狗狗':'猫猫'}}
                    <i class="doubledown"></i>
                    <ul class="spUl" ref="spUl" :class="mode==0?'navCarousel':'disNone'">
                        <li class="dog_box" @click="setStats('dog')">
                            <span class="imgDog"></span>
                            <p><span>{{$getState('cache','AnimalSum').dog}}</span>种精选宝贝</p>
                            <a class="inmain" v-if="$getState('cache','Animal')=='dog'">正在狗狗站溜达</a>
                            <a class="doga" v-else>切换到狗狗站</a>
                            <img src="@/assets/images/dogpack.jpg" >
                        </li>
                        <li class="cat_box" @click="setStats('cat')">
                            <span class="imgCat"></span>
                            <p><span>{{$getState('cache','AnimalSum').cat}}</span>种精选宝贝</p>
                            <a class="inmain" v-if="$getState('cache','Animal')=='cat'">正在猫猫站溜达</a>
                            <a class="cata" v-else>切换到猫猫站</a>
                            <img src="@/assets/images/catpack.jpg" >
                        </li>
                    </ul>
                </div>

                <div class="spans" ref="sp" @mouseenter="spHover">商品分类
                    <i class="sdown"></i>
                    <ul class="spanUl" ref="spanUl">
                        <li v-for="(item,index) of titles " :key="index">
                            <p>
                                <span class="a" @click="toProduct(item[0].titel)">{{item[0].titel}}</span>
                                <span class="a" @click="toProduct(item[1].titel)">{{item[1].titel}}</span>
                            </p>
                            <div class="navLeft" ref="navLeft" :key="index+'a'">
                                <div class="card" >
                                    <div>
                                        <div class="tit">
                                            <img :src="item[0].timg" >
                                            <span class="a" @click="toProduct(item[0].titel)" >{{$getState('cache','Animal')=='dog'?'狗狗':'猫猫'}}{{item[0].titel}}</span>
                                            <i></i>
                                        </div>
                                        <hr>
                                        <div class="cont" v-for="(ty,j) of item[0].type" :key="j">
                                            <span class="ab" @click="toProduct(ty.name)" >{{ty.name}}</span>
                                            <img :src="ty.nameimg" alt="">
                                            <span v-for="(sup,i) of ty.subtitle" class="a" @click="toProduct(sup.subtit)" :key="i">{{sup.subtit}}</span>
                                        </div>
                                        <hr>
                                        <div>
                                            <div class="tit">
                                                <img :src="item[1].timg" >
                                                <span class="a" @click="toProduct(item[1].titel)">{{$getState('cache','Animal')=='dog'?'狗狗':'猫猫'}}{{item[1].titel}}</span>
                                                <i></i>
                                            </div>
                                            <hr>
                                            <div class="cont" v-for="(ty,j) of item[1].type" :key="j">
                                                <span class="ab" @click="toProduct(ty.name)" >{{ty.name}}</span>
                                                <img :src="ty.nameimg" alt="">
                                                <span v-for="(sup,i) of ty.subtitle" class="a" @click="toProduct(sup.subtit)" :key="i">{{sup.subtit}}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </li>
                    <li style="display: flex;align-items: center;justify-content: center; color: #666;"><img src="@/assets/images/active.png">正在进行品牌特卖</li>
                    </ul>

                </div>
            </div>
           <div class="navUl">
                <ul>
                    <li><i  :class="$getState('cache','Animal')=='dog'?'dogEat':'catEat'"></i>品牌热卖</li>
                    <li><i  :class="$getState('cache','Animal')=='dog'?'dogEat':'catEat'"></i>潮品视频</li>
                    <li><i  :class="$getState('cache','Animal')=='dog'?'dogEat':'catEat'"></i>宠爱课堂</li>
                    <li><i  :class="$getState('cache','Animal')=='dog'?'dogEat':'catEat'"></i>清仓特价</li>
                </ul>
                <div :class="mode==0?'navCarousel':'disNone'">
                    <el-carousel height="360px">
                        <el-carousel-item v-for="item of carousels" :key="item.cid">
                            <router-link :to="item.clink">
                                <img :src="item.cimg" alt="" style="width: 770px;height: 360px"></router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="dogbr" ref="mybr"></div>
            <div  :class="mode==0?'navRight':'disNone'">
                <div>
                    <img src="@/assets/images/about1.jpg" alt="">
                </div>
                <div>
                    <img src="@/assets/images/about2.jpg" alt="">
                </div>
                <div>
                    <img src="@/assets/images/about3.png" alt="">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import dogLogo from '@/assets/images/dog-logo.png'
    import catLogo from '@/assets/images/cat-logo.png'
    import dogCart from '@/assets/images/dog-cart.gif'
    import catCart from '@/assets/images/cat-cart.gif'
    export default {
        name: "NavStatus",
        props:{
            mode:{
                default:0,
                type:Number,
            },
            search:{
                default:'',
                type:String
            }
        },
        data(){
            return {
                welcomeCat:'喵喵，欢迎来宠爱',
                welcomeDog:'汪汪，欢迎来宠爱',
                dogLogo:dogLogo,catLogo:catLogo,dogCart:dogCart,catCart:catCart,
                // search:'',
                cartInNum:0,
                carousels:[],
                titles:[],
            }
        },
        methods:{
            toProduct(Url){
                window.location.href=`${this.$getState('dict','thisUrl')}product/${Url}`;
            },
            async getCarousel(){
                let [err,res] = await this.$apis.home.getCarousels()
               if(res.msg=='success'){
                   this.carousels= res.data;
               }else {
                   this.$message.error('轮播数据获取失败');
               }
           },
            async getNavData(){
                let [err,res] = await this.$apis.home.getNavData({Animal:this.$getState('cache','Animal')})
                if(res.msg=='success'){
                    this.titles= res.data;
                    let arr=this.titles,Arrs=[];
                    for(let i=0;i<this.titles.length;i+=2){
                        Arrs.push([arr[i],arr[i+1]])
                    }
                    this.titles=Arrs;
                }else {
                    this.$message.error('导航数据获取失败');
                }
            },
            aniHover(){
                this.$refs.spUl.style.display="block";
                this.$refs.spanUl.style.display="none";
                let str2 = this.$getState('cache','Animal') =='dog'?' dogbg':' catbg'
                this.$refs.ani.classList.value='spans'+str2
                this.$refs.sp.classList.value='spans'+str2
            },
            spHover(){
                this.$refs.spUl.style.display="none";
                this.$refs.spanUl.style.display="block";
                let str = this.$getState('cache','Animal') =='dog'?'#62a727':'#e74085'
                let str2 = this.$getState('cache','Animal') =='dog'?' dogbg':' catbg'
                this.$refs.ani.classList.value='spans'+str2
                this.$refs.sp.classList.value='spans'+str2
                for(let i of this.$refs.navLeft)
                    i.style='border-color:'+  str;
                // this.$refs.navLeft.style.backgroundColor=str

            },
            setStats(anm){
                sessionStorage.setItem('Animal',anm)
                let str = this.$getState('cache','Animal') =='cat'?'#62a727':'#e74085'
                this.$refs.mybr.style.backgroundColor=str;
                this.$setState('cache','Animal',sessionStorage.getItem('Animal'))
            },
        },
        created() {
            let name = sessionStorage.getItem('userName')
            let id =   sessionStorage.getItem('userId')
            this.$setState('user','userName',name||null)
            this.$setState('user','userId',id||null)
            if(this.mode==0){
                this.getCarousel();
                this.getNavData();
            }else if(this.mode==1){
                this.getNavData();
            }

        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    $catColor: #e63f85;
    $dogColor:#4d9b35;
    .borderdog{
        border: $dogColor solid 2px;
    }
    .bordercat{
        border: $catColor solid 2px;
    }
    .dogBgColor{
        background-color: $dogColor;
    }
    .catBgColor{
        background-color: $catColor;
    }
    .imgCat,.imgDog{
        overflow: hidden;
        display: inline-block;
        width: 60px;
        height: 60px;
        vertical-align: middle;
        background-image: url("../assets/images/new_petcate.png");
    }
    .imgDog{
        background-position: 0 -0;
        margin-top: 10px;
    }
    .imgCat{
        background-position: 0 -60px;
        margin-top: 10px;
    }
    .doubleup,.doubledown,.sup,.sdown{
        width: 16px;
        height: 13px;
        display: inline-block;
        vertical-align: middle;
        margin-top: -2px;
        background: url(../assets/images/download.png);
        margin-left: 5px;
    }
    .doubledown{
        background-position: -17px -1257px;
    }
    .doubleup{
        background-position: 0px -1257px;
    }
    .sdown{
        width: 13px;
        height: 7px;
        background-position: -17px -1276px;
    }
    .sup{
        background-position: 0 -1276px;
    }
    .dogEat,.catEat{
        display: inline-block;
        width: 13px;
        height: 17px;
        background: url(../assets/images/download.png);
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 6px;
        transition: transform 0.8s ease-in;
    }
    .dogEat{
        background-position: -35px -1280px;
    }
    .catEat{
        background-position: -35px -1298px;
    }
    .disNone{
        display: none ;
    }
    .navbar{
        .dogbr,.catbr{
            height: 2px;
            background-color: $dogColor;
            width: 99.1vw;
            position: absolute;
            top: 176px;
            left: 0;
        }
        .catbr{
            background-color: $dogColor;
        }
        .userStatus{
            font-size: 12px;
            height: 28px;
            line-height: 28px;
            background: #f2f2f2;
            -webkit-transform: translate3d(0,0,0);
            border-bottom: 1px solid #e5e5e5;
            .uHeader{
                display: flex;
                justify-content: space-between;
                margin: 0 auto;
                width: 1200px;
                .leftHeader{
                    .el-link{
                        margin-right: 15px;
                        i{
                            color: $dogColor;
                        }
                    }
                }
                .rightHeader{
                    .el-link{
                        margin-left: 15px;
                        i{
                            color: $catColor;
                        }
                    }
                }
            }

        }
        .navHeader{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            width: 1200px;
            .logo{
            }
            .search{
                .searchTop{
                    input{
                        background: 0 0;
                        padding: 0 5px 0 15px;
                        width: 382px;
                        height: 30px;
                        outline: 0;
                        line-height: 30px;
                        font-size: 14px;
                        float: left;
                        box-sizing: inherit;
                    }
                    button{
                        border: 0;
                        width: 73px;
                        height: 34px;
                        vertical-align: top;
                        cursor: pointer;
                        color: #FFF;
                        font-size: 14px;
                        &:hover {
                            box-shadow: 0 0 8px rgba(0,0,0,.3);
                        }
                    }
                }
                .searchBtm{
                    font-size: 12px;
                    margin: 10px 0;
                    width: 498px;
                    height: 17px;
                    overflow: hidden;
                    color: #999;
                }
            }
            .shopcart{
                position: relative;
                .item{
                    position: absolute;
                    left: 55px;
                    line-height: 39px;
                }
            }
        }
        .navBody{
            width: 1200px;
            margin: 0 auto;
            display: flex;

            .navSpan{
                display: flex;
                position: relative;
                .navLeft{
                    border: 1px solid  ;
                    background: #f5f5f5;
                    display: none;
                    width: 570px;
                    position: absolute;
                    top: 0;
                    left: 226px;
                    line-height: 30px;
                    z-index: 90;
                    box-shadow: 3px 3px 4px #777;
                    .card{
                        padding: 10px;
                        width: 550px;
                        background: #FFF;
                        float: left;
                        min-height: 358px;
                        /*height: 358px;*/
                        .tit{
                            padding-left: 10px;
                            display: flex;
                            img{
                                /*float: left;*/
                                height: 35px;
                                width: 35px;
                                line-height: 35px;
                            }
                            .a{
                                font-size: 16px;
                                padding-left: 10px;
                                text-decoration: none;
                                color: #444;
                            }
                            i{
                                width: 35px;
                                background: url(../assets/images/bg.png) -470px -240px no-repeat;
                                /*float: right;*/
                                height: 35px;
                                line-height: 35px;
                            }
                            hr{
                                line-height: 30px;
                                height: 5px;
                                margin-bottom: 5px;
                                border-bottom: 1px #ddd dotted;
                            }
                        }
                        .cont{
                            display: flex;
                            font: 12px 'Microsoft Yahei',Tahoma,Simsun;
                           .ab{
                               width: 115px;
                               text-align: right;
                               height: 25px;
                               line-height: 25px;
                               color: green;
                               font-weight: 700;
                           }
                            img{
                                padding-left: 15px;
                                padding-right: 15px;
                                vertical-align: middle;
                                height: 25px;
                                width: 25px;
                            }
                            .a{
                                display: inline-block;
                                padding: 0 6px 0 7px;
                                border-left: 1px #ddd solid;
                                height: 16px;
                                line-height: 16px;
                                color: #444;
                            }
                        }
                    }
                }
                .dogbg:hover {
                    background-color: $dogColor;
                    border: 1px solid $dogColor;
                    color: #f2f2f2;
                }
                .catbg:hover {
                    background-color: $catColor;
                    border: 1px solid $catColor;
                    color: #f2f2f2;
                }
                .spans{
                    width: 112px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    border: 1px solid #e1e1e1;
                    color: #666;
                    cursor: pointer;
                    font-size: 16px;

                    .spUl{
                        position: absolute;
                        margin-top: 5px;
                        list-style: none;
                        width: 187px;
                        background-color: #f2f2f2;
                        display: block;

                        li{
                            background-color: #f2f2f2;
                            position: relative;
                            margin-left: -40px;
                            height: 180px;
                            text-align: center;
                            /*margin-bottom: 10px;*/
                            img{
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: -1;
                                transition: left .3s;
                            }
                            p{
                                span{
                                    color: red;
                                }
                                color: #666;
                            }
                            a,.inmain{
                                display: inline-block;
                                width: 108px;
                                height: 28px;
                                line-height: 30px;
                                text-align: center;
                                border-radius: 3px;
                                margin-top: -15px;
                                border: 1px solid #aeaeae;
                                color:#aeaeae;
                                font-size: 12px;
                            }
                            .doga{
                                border: 1px solid #459d36;
                                color: #459d36;
                            }

                            &:hover .doga{
                                background:$dogColor;
                                color: white;
                            }
                            &:hover .cata{
                                background:$catColor;
                                color: white;
                            }
                            &:hover .inmain{
                                color: #aeaeae;
                                background: #ebebeb;
                            }
                            &:hover img{
                                left:-27px;

                            }
                            .cata{
                                border: 1px solid #e74085;
                                color: #e74085;
                            }
                        }
                    }
                    .spanUl{
                        display: none;
                        position: absolute;
                        margin-top: 5px;
                        list-style: none;
                        width: 187px;
                        margin-left: -113px;
                        background-color: #fff;
                        li:hover .navLeft{
                            display: block;
                        }
                        li {
                            height: 51px;
                            background-color: #f2f2f2;
                            /*position: relative;*/
                            margin-left: -40px;
                            p{
                                background-image: url("../assets/images/download.png");
                                background-position: right -1206px;
                                background-repeat: no-repeat;
                                margin-block-start: 0;
                                margin-block-end: 0;
                                padding-left: 16px;
                                font-weight: 400;
                                height: 50px;
                                line-height: 50px;
                                background-color: #fcfcfc;

                                .a{
                                    color: #444;
                                    font-size: 14px;
                                    display: inline-block;
                                    width: 88px;
                                    overflow: hidden;
                                    height: 50px;
                                }
                            }
                        }

                    }

                    i{
                        transition: transform 0.3s ease-in;
                    }
                    &:hover i{
                        transform:rotate(180deg);
                    }
                }
            }

            .navUl{
                margin-top: -15px;
                ul{
                    margin-left: -20px;
                    display: flex;
                    li{
                        list-style: none;
                        line-height: 34px;
                        font-size: 16px;
                        color: #000;
                        font-weight: 700;
                        padding-right: 20px;
                        text-decoration: none;
                        boutline: 0;
                        height: 34px;
                        &:hover i{
                            transform:rotate(360deg);
                        }
                    }
                }
                .navCarousel{
                    width: 770px;

                    margin-top: -13px

                }
            }
            .navRight{
                margin-top: 37px;
               // margin-left: 200px;
                width: 200px;
                height: 360px;
                background: #fff;
                z-index: 10;
                overflow: hidden;
            }

        }

    }

</style>