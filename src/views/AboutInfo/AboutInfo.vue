<template>
    <div class="AboutInfo">
        <Nav-Status :mode="1"></Nav-Status>
        <about-Nav></about-Nav>
        <div class="aboutBody">

            <div class="aboutCard" v-for="(card,index) of AboutInfos" :key="index">
                <div class="cardherd">
                    <div :id="'aboutNav'+index"><img :src="card.A_ico"></div>
                    <div class="content"><p>{{card.A_title}}</p><span>{{card.infoArr.length}}条相关</span></div>
                </div>
                <div class="titimg"></div>
                <img :src="card.A_img" alt="">
                <div class="aboutCardItem" :class="$getState('cache','Animal')=='dog'?'dogBor':'catBor'"  v-for="(info,j) of card.infoArr" :key="j" @click="toAboutDetails(info.Ac_imgs)">
                    <img :src="info.Ac_img" alt="">
                    <span class="see"><i class="el-icon-view"></i>{{info.Ac_see}}</span>
                    <p class="title">{{info.Ac_title}}</p>
                    <div class="aboutCardItemCon">
                        <span><img src="//static.epetbar.com/www/zt/knowledge/images/ql.png" alt=""></span>
                        <p>{{info.Ac_content}}</p>
                        <span><img src="//static.epetbar.com/www/zt/knowledge/images/qr.png" alt=""></span>
                    </div>
                </div>
            </div>
            <div class="aboutFoot">
                <img src="../../assets/images/more_activity.png"/>
            </div>
         </div>

        <Footer-Status></Footer-Status>
    </div>
</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import aboutNav from '@/components/aboutNav.vue'
    export default {
        name: "AboutInfo",
        components:{NavStatus,FooterStatus,aboutNav},
        data(){
            return{AboutInfos:[]}
        },
        methods: {
            async getAboutInfo() {
                let [err, res] = await this.$apis.other.getAboutInfo({mode:true});
                if (res.msg == 'success'){
                    let id = '',j=-1;
                    for(let i of res.data){
                        if(id != i.Abcon_id) {
                            j++;
                            id = i.Abcon_id;
                            this.AboutInfos[j] = {A_ico: i.A_ico, A_img: i.A_img, A_title: i.A_title, infoArr: [i]}
                        }
                        else{
                            this.AboutInfos[j].infoArr.push(i)
                        }
                    }
                    this.AboutInfos=Array.from(this.AboutInfos);
                    console.log(this.AboutInfos ,'------------------')
                }

            },
            toAboutDetails(imgs){
                let imgArr = imgs.split(',');
               // console.log(imgArr,'---------imgArr')
                this.$router.push({
                    name:'AboutDetails',
                    params:{imgArr:imgArr}
                })
            }
        },
        created() {
            this.getAboutInfo()
        }

    }
</script>

<style scoped lang="scss">
.AboutInfo{
    position: relative;
    .aboutBody{
        margin-top: -5px;
        background-image: url("../../assets/images/aboutbgimg.jpg");
        background-repeat:no-repeat;
        background-attachment:fixed;
        height:1200px;
        overflow: scroll;
      //  width:1920px;
        .aboutCard{
            width: 965px;
            margin: auto;
            padding: 15px 2px 25px 31px;
            border: 2px solid #fff;
            background-color: #fff;
            overflow: hidden;
            .cardherd{
                display: flex;
                .content{
                    margin-left: 10px;
                    p{
                        font-size:20px;
                        color: #444;
                        &:hover{
                            color: #248DCC;
                        }
                    }
                    span{
                        font-size: 12px;
                        color: #777777;
                    }
                }
                p{
                    margin-block-start: 0;
                    margin-block-end: 0;
                }
            }
            .titimg{
                height: 22px;
                margin-left: -33px;
                margin-bottom: 15px;
                background: url(../../assets/images/cmall-titBg.png) 0 50% repeat-x;
            }
            .dogBor:hover {
                border: 2px solid #1fac75;
            }
            .catBor:hover {
                border: 20px solid #e74085;
            }
            .aboutCardItem{
                position: relative;
                display: inline-block;
                vertical-align: top;
                margin: 10px 15px 17px 0;
                width: 300px;
                height: 455px;
                cursor: pointer;
                background-color: #fff;
                border: 1px solid #eaeaea;
                text-align: left;
                .see{
                    position: absolute;
                    text-align: center;
                    top: 274px;
                    right: 0;
                    padding: 0 10px;
                    height: 25px;
                    color: #fff;
                    font-size: 12px;
                    line-height: 25px;
                    background-color: rgba(0,0,0,0.4);
                    i{
                        margin-right: 5px;
                    }
                }
                .title{
                    font-size: 16px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding: 20px 15px;
                    color: #333;
                }
                p{
                    margin-block-start: 0;
                    margin-block-end: 0;
                }
                .aboutCardItemCon{
                    display: flex;
                    margin:-2px 15px;
                    line-height: 2;
                    color: #777;
                    p{
                        margin: 0 10px 0 15px;
                    }
                }
            }

        }
    }
    .aboutFoot{
        display: flex;
        justify-content: center;
    }
}
</style>