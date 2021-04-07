<template>
    <div class="selectBox" ref="selectBox">
        <div class="DogOrCat" ref="DogOrCat">
            <div class="leftPet" ref="leftPet">
                <img :src="bigImg" class="bigImg">
                <div class="leftbox">
                    <div class="title"><img :src="Ttext" alt=""></div>
                    <div class="nums">
                        <div class="num1">
                            <div class="wa" style="position: relative">
                                <span>{{parseInt(this.products_num/10000%10)}}</span>
                                <span v-for="i in 10" :key="i">{{(i-1)%10}}</span>
                            </div>
                        </div>
                        <div class="num2">
                            <div class="qa" style="position: relative">
                                <span>{{parseInt(this.products_num/1000%10)}}</span>
                                <span v-for="i in 10" :key="i">{{(i-1)%10}}</span>
                            </div>
                        </div>
                        <div class="num3">
                            <div class="ba" style="position: relative">
                                <span>{{parseInt(this.products_num/100%10)}}</span>
                                <span v-for="i in 10" :key="i">{{(i-1)%10}}</span>
                            </div>
                        </div>
                        <div class="num4">
                            <div class="sh" style="position: relative">
                                <span>{{parseInt(this.products_num/10%10)}}</span>
                                <span v-for="i in 10" :key="i">{{(i-1)%10}}</span>
                            </div>
                        </div>
                        <div class="num5">
                            <div class="ge" style="position: relative">
                                <span>{{parseInt(this.products_num/1%10)}}</span>
                                <span v-for="i in 10" :key="i">{{(i-1)%10}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="contenr">
                        <img src="../assets/images/realtext.png">
                    </div>
                </div>
            </div>
            <div class="rightPet">
                <div class="title">选择我的宠物类型</div>
                <ul>
                    <li class="dogbox"  @mouseenter="dogboxHover" @click="setStats('dog')">
                        <span class="imgDog"></span><span class="dog">狗狗</span>
                        <div class="gotoHome">立即进入</div>
                        <span class="triangle"></span>
                    </li>
                    <li class="catbox"  @mouseenter="catboxHover" @click="setStats('cat')">
                        <span class="imgCat"></span><span  class="cat">猫猫</span>
                        <div class="gotoHome">立即进入</div>
                        <span class="triangle"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    import cattext from '@/assets/images/cattext.png'
    import dogtext from '@/assets/images/dogtext.png'
    import bigdog from '@/assets/images/bigdog.png'
    import bigcat from '@/assets/images/bigcat.png'
    export default {
        name: "DogOrCat",
        data(){
            return{cattext:cattext,dogtext:dogtext,bigcat:bigcat,bigdog:bigdog,Ttext:dogtext,bigImg:bigdog,
                numS:{dog:'',cat:''},
                products_num:0,
            }
        },
        methods:{
            dogboxHover(){
                this.products_num=this.numS.dog;
                this.Ttext=this.dogtext;
                this.bigImg=this.bigdog;
                this.$refs.leftPet.style.backgroundColor='#4d9b35'
            },
            catboxHover(){
                this.products_num=this.numS.cat;
                this.Ttext=this.cattext;
                this.bigImg=this.bigcat;
                this.$refs.leftPet.style.backgroundColor='#e63f85'
            },
            setStats(anm){
                sessionStorage.setItem('Animal',anm);
                this.$setState('cache','Animal',anm);
                this.$refs.DogOrCat.style.display='none';
                this.$refs.selectBox.style.display='none'
                // this.$bus.$emit('SetStats',anm)
            },
            async getSum(){
               let [err,res] =await this.$apis.home.getProducts_num();
                if(res.msg=='success'){
                    this.numS=res.products_num;
                    this.products_num=this.numS.dog;
                    this.$setState('cache','AnimalSum',this.numS)
                }
            },
            comp(){
                let w=parseInt(this.products_num/10000%10),
                    q=parseInt(this.products_num/1000%10),
                    b=parseInt(this.products_num/100%10),
                    s=parseInt(this.products_num/10%10),
                    g=parseInt(this.products_num/1%10);
                console.log(w,q,b,s,g)
            }
        },
        created(){
            this.getSum()


        },
        mounted() {


        }

    }

</script>

<style lang="scss" scoped>
    $dogColor: #4d9b35;
    $catColor: #e63f85;
    $changColor:#4d9b35;
    .selectBox{
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color:rgba(0,0,0,0.6) ;
        z-index: 1000;
    }
.DogOrCat{
    width: 880px;
    height: 375px;
    margin: calc(50vh - 220px) auto;
    display: flex;
    z-index: 1000;
    .leftPet{
        position:relative;
        color: white;
        text-align: left;
        width: 680px;
        height: 100%;
        z-index: 1004;
        background-color: $changColor;
        .bigImg{
            position: absolute;
            top: -55px;
            left: -233px;
            z-index: 1;
        }

        .leftbox{
            padding-left: 210px;
            .title{
                margin-top: 50px;
            }
            .contenr{
                margin: 30px 0 0 3px;
            }
            .nums{
                padding: 18px 0;
                height: 67px;
                width: 100%;
                margin-left: 3px;
                display: flex;

            }
            .num1,.num2,.num3,.num4,.num5{
                /*display: inline-block;*/
                span{
                    display: block
                }
                margin-left: 7px;
                width: 50px;
                height: 67px;
                line-height: 67px;
                overflow: hidden;
                background-color: #fff;
                text-align: center;
                font-size: 48px;
                font-weight: 700;
                color: #333;
                border-radius: 5px;
                -webkit-border-radius: 5px;
            }
        }

    }
    .rightPet{
        width: 210px;
        height: 100%;
        text-align: center;
        background-color: #fff;
        border-bottom-right-radius: 5px;
        .title{
            height: 23px;
            line-height: 23px;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
        ul{
            margin-left: -40px;
        }
        ul li{
            list-style: none;
            width: 100%;
            height: 80px;
            /*border-bottom: 2px dashed #f9f9f9;*/
            padding: 41px 0;
            button{
                border: none;
                background-color: transparent;
                outline: none;
            }
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
        }
        .imgCat{
            background-position: 0 -60px;
        }
        .dog,.cat{
            vertical-align: middle;
            margin-left: 10px;
            font-size: 20px;
            color: #333;
        }
        .dogbox{
            position: relative;
            color:#666;
            .gotoHome{
                display: none;
                width: 60px;
                height: 60px;
                line-height: 60px;
                top:40px;
                font-size: 14px;
                font-weight: 700;
                left: 48px;
                background: #000;
                -moz-opacity: .6;
                opacity: .6;
                border-radius: 50%;
                position: absolute;
            }
            .triangle{
                display: none;
                width:0;
                left: -14px;
                top: 55px;
                position: absolute;
                border-top: 12px solid transparent;
                border-right: 14px solid #fff;
                border-bottom: 12px solid transparent;
                z-index: 1011;
            }
            :hover{color: $dogColor;}
            &:hover{
                color: $dogColor;
                .gotoHome{
                    display: block;
                }
                .triangle{
                display: inline-block;
                }
            }
        }
        .catbox{
            color:#666;
            position: relative;
            .gotoHome{
                width: 60px;
                height: 60px;
                display: none;
                line-height: 60px;
                top:40px;
                font-size: 14px;
                font-weight: 700;
                left: 48px;
                background: #000;
                -moz-opacity: .6;
                opacity: .6;
                border-radius: 50%;
                position: absolute;
            }
            .triangle{
                display: none;
                width:0;
                left: -14px;
                top: 55px;
                position: absolute;
                border-top: 12px solid transparent;
                border-right: 14px solid #fff;
                border-bottom: 12px solid transparent;
                z-index: 1011;
            }
            :hover{color: $catColor;}
            &:hover{
                color: $catColor;
                .gotoHome{
                    display: block;
                }
                .triangle{
                    display: inline-block;
                }
            }
        }
    }
}
    @keyframes num0
    {
        0%   {top:0px}
        100%   {top:-67px}
    }
    @keyframes num1
    {
        0%   {top:0px}
        50%   {top:-67px}
        100%   {top: -134px;}
    }
    @keyframes num2
    {
        0%   {top:0px}
        33%   {top:-67px}
        66%   {top: -134px;}
        100%   {top: -201px;}
    }
    @keyframes num3
    {
        0%   {top:0px}
        25%   {top:-67px}
        50%   {top: -134px;}
        75%   {top: -201px;}
        100%   {top: -268px;}
    }
    @keyframes num4
    {
        0%   {top:0px}
        20%   {top:-67px}
        40%   {top: -134px;}
        60%   {top: -201px;}
        80%   {top: -268px;}
        100%   {top: -335px;}
    }
    @keyframes num5
    {
        0%   {top:0px}
        16%   {top:-67px}
        32%   {top: -134px;}
        64%   {top: -201px;}
        80%   {top: -268px;}
        96%   {top: -335px;}
        100%   {top: -402px;}
    }
    @keyframes num6
    {
        0%   {top:0px}
        14%   {top:-67px}
        28%   {top: -134px;}
        42%   {top: -201px;}
        56%   {top: -268px;}
        70%   {top: -335px;}
        84%   {top: -402px;}
        100%   {top: -469px;}
    }
    @keyframes num7
    {
        0%   {top:0px}
        12.5%   {top:-67px}
        25%   {top: -134px;}
        37.5%   {top: -201px;}
        50%   {top: -268px;}
        62.5%   {top: -335px;}
        75%   {top: -402px;}
        87.5%   {top: -469px;}
        100%   {top: -536px;}
    }
    @keyframes num8
    {
        0%   {top:0px}
        11.1%   {top:-67px}
        22.2%   {top: -134px;}
        33.3%   {top: -201px;}
        44.4%   {top: -268px;}
        55.5%   {top: -335px;}
        66.6%   {top: -402px;}
        77.7%   {top: -469px;}
        88.8%   {top: -536px;}
        100%   {top: -603px;}
    }
    @keyframes num9
    {
        0%   {top:0px}
        10%   {top:-67px}
        20%   {top: -134px;}
        30%   {top: -201px;}
        40%   {top: -268px;}
        50%   {top: -335px;}
        60%   {top: -402px;}
        70%   {top: -469px;}
        80%   {top: -536px;}
        90%   {top: -603px;}
        100%   {top: -670px;}
    }
</style>