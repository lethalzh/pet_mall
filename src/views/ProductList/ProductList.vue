<template>
    <div class="ProductList">
        <Nav-Status :mode="1" :search="search"></Nav-Status>

        <div class="ProductBody">
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
                </el-select>
            </div>
            <div class="Pbody">
                <div class="leftP"></div>
                <div class="rightP">
                   <div style="margin-bottom: 15px">
                       <div class="filBlock">
                           <div class="title"><span>品牌:</span></div>
                           <div class="Block">
<!--                                 <div class="fil_li">-->
<!--                                     <span @click="getProductList(0,search)">全部</span>-->
<!--                                 </div>-->
                                 <div class="fil_li" v-for="(bandr,index) of brands" :key="index" @click="getProductList(0,bandr)">
                                     <span>{{bandr}}</span>
                                 </div>
                           </div>


                       </div>
<!--                       <div class="filBlock h40">-->
<!--                           <div class="tit"><span>品牌:</span></div>-->
<!--                           <div class="h40"><div class="tag">aa13</div><div class="tag">a123a</div></div>-->
<!--                       </div>-->
<!--                       <div class="filBlock h40">-->
<!--                           <div class="tit"><span>品牌:</span></div>-->
<!--                           <div class="h40"><div class="tag">a123a</div></div>-->
<!--                       </div>-->
                   </div>
                    <div>
                        <div style="height: 15px;background-color: #e1e1e1;">
                        </div>
                        <div class="select">
                            <span :class="$getState('cache','Animal')=='dog'?'spanDog':'spanCat'" @click="getProductList(0)">默认</span>
                            <span :class="$getState('cache','Animal')=='dog'?'spanDog':'spanCat'" @click="getProductList(1)">销量</span>
                            <span :class="$getState('cache','Animal')=='dog'?'spanDog':'spanCat'" @click="getProductList(2)" class="ccc">价格</span>
                        </div>
                    </div>
                    <div>
                        <div style="height: 15px;background-color: #e1e1e1;">
                        </div>
                        <div class="splist">
                            <div class="spitem" v-for="i in productData" :key="i.com_id+'d'">
                                <router-link :to="'/details/'+i.com_id">
                                <img :src="i.com_imgs"/>
                                <p>
                                    <img class="activityico" src="https://static.epetbar.com/static_wap/appmall/lib/list/activity.png?version=2016120201">
                                  <span v-html='i.com_name_highlights'></span>

                                </p>
                                <p><span class="old">${{i.com_oldprice}}</span>${{i.com_price}}</p>
                                <p>月销{{i.com_msales}}(袋)</p>
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
                    </div>

                </div>
            </div>
        </div>
        <Footer-Status></Footer-Status>

    </div>
</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'

    export default {
        name: "ProductList",
        components: {
            NavStatus,FooterStatus
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
                productData:[],
                page:1,
                total:0,
                search:'',
                brands:[],
            }
        },
        methods:{
            async getProductList(flag=0,bandr=''){
                if(bandr!='')
                    this.search=bandr+'+'+this.$route.params.search;
                else
                    this.search=this.$route.params.search;
                let [err,res] = await this.$apis.product.getProductList({search:this.search,flag:flag,page:this.page})
                if(res.msg=='success'){
                    this.total= res.total
                    this.productData = res.data
                    this.brands= res.brands
                    this.productData = this.productData.map(item => {
                        for (let key in item) {
                            if (key === 'com_name') {
                                let str= this.search
                                let replaceRegs=str.split('+')
                                for(let i of replaceRegs){
                                    let replaceReg = new RegExp(i, 'g')
                                    let replaceString = '<span style="color: #ff5134">' + i + '</span>'
                                    item[key + '_highlights'] = item[key].replace(replaceReg, replaceString)
                                    item[key] = item[key + '_highlights']
                                    console.log( item[key + '_highlights'],item[key].replace(replaceReg, replaceString),'----------------------')
                                }

                            }
                        }
                        return item
                    })
                }else {
                }
                // this.search.replace('+',' ')
            },
            changePage(val){
                this.page= val
                this.getProductList()
            }
        },
        created() {
            this.getProductList()
        }
    }
</script>

<style scoped lang="scss">
    .highlights-text {
        color: #ff5134 !important;
    }
    .ProductList{
        .ProductBody{
            margin-top: -20px;
            background-color: #e1e1e1;
            .nav{
                width: 700px;
                margin: 0 auto 10px;
                padding-top: 10px;
                .el-select{
                    width: 105px;
                }
            }
            .Pbody{
                width: 1280px;
                margin: 0 auto;
                display: flex;
                .leftP{
                    width: 290px;

                }
                .rightP{
                    background-color: #f2f2f2;
                    width: 980px;
                    .h40{
                        height: 20px;
                    }
                    .filBlock{
                        border-bottom: 1px #EFEFEF dashed;
                        /*vertical-align: middle;*/
                        line-height: 20px;
                        padding: 10px 0 0;
                        display: flex;
                    
                        .tag{
                            line-height: 20px;
                            padding-right: 8px;
                            display: inline-block;
                            margin-bottom: 5px;
                            margin: 0 0 5px 5px;
                            font-size: 12px;
                            &:hover{
                                background-image: url(../../assets/images/newbtn.png);
                                background-position: right -150px;
                                background-repeat: no-repeat;
                               // background-color: #ff4400;
                                border-radius: 15px;
                                padding:0 8px 0 8px;
                                display: inline-block;
                                height: 20px;
                                line-height: 20px;

                            }
                        }
                    }
                    .title,.tit{
                        margin:30px 10px;
                        width: 80px;
                        text-align: right;
                        color: #999;
                        font-size: 14px;
                    }
                    .tit{
                        margin:0 10px;
                    }
                    .Block{
                        display: flex;
                        flex-wrap: wrap;
                        .fil_li{
                            display: inline;
                            font-size: 14px;
                            margin: 20px -1px -1px 0;
                            position: relative;
                            overflow: hidden;
                            z-index: 10;
                            width: 121px;
                            height: 38px;
                            line-height: 38px;
                            text-align: center;
                            border: #ddd solid 1px;
                            &:hover{
                                background: #fff6ef;
                                color: #ff6302;
                            }
                        }
                    }

                    .select{
                        height: 53px;
                        .spanDog{
                            height: 53px;
                            border-right: 1px solid #ddd;
                            display: block;
                            float: left;
                            padding: 0 23px 0 18px;
                            line-height: 53px;
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
                            height: 53px;
                            border-right: 1px solid #ddd;
                            display: block;
                            float: left;
                            padding: 0 23px 0 18px;
                            line-height: 53px;
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
                    .splist{
                        display: flex;
                        flex-wrap: wrap;
                        .spitem{
                            position: relative;
                            padding: 14px 10px 0;
                            width: 213px;
                            height: 330px;
                            display: inline;
                            border: 1px solid #e6e6e6;
                            line-height: 18px;
                            margin: 0 10px 10px 0;
                            overflow: hidden;
                            background-color: #FFF;
                            :nth-child(2){
                                img{
                                    width: 32px;
                                    height: 16px;
                                }
                                line-height: 17px;
                                height: 36px;
                                font-size: 12px;
                                color: #444;
                                text-align: left;
                                overflow: hidden;
                            }
                            :nth-child(3) {
                                line-height: 16px;
                                font-weight: 700;
                                color: #F60;
                                font-size: 14px;
                            }
                            :nth-child(4){
                                color: #999;
                                font-size: 12px;
                            }
                            .old{
                                color: #999;
                                margin-right: 10px;
                                text-decoration: line-through;
                            }
                            img{
                                width: 200px; height: 200px;margin-left: 6.5px;
                            }
                        }
                    }

                }
            }
        }
    }

</style>