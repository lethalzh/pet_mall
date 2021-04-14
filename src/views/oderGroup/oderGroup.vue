<template>
    <div class="oderGroup">
        <Nav-Status :mode="2"></Nav-Status>
        <div class="oder">
            <div class="oderHead">
                <h4>订单结算</h4>
            </div>
            <div class="oderBody">
                <div class="rowHead">
                    <span>收货人信息</span>
                    <span @click="newAddres"><i></i>新增收货地址</span>
                </div>
                <div class="rowList" v-for="(row,index) of addressArr" :key="index">
                    <span @click="setTool(row.add_id,1)" :class="$getState('cache','Animal')=='dog'?'dogbr':'catbr'">{{row.add_name}} {{row.add_address}} <i :class="row.add_flag!='true'?'':'i'"></i></span>
                    <div class="list">
                        <div class="leftList">
                            <span >{{row.add_address}} {{row.add_number}}</span>
                        </div>
                        <div class="rightList">
                            <span v-if="row.add_flag!='true'" @click="setTool(row.add_id,1)">设为默认地址</span>
                            <span @click="setTool(row.add_id,2)">编辑</span>
                            <span v-if="row.add_flag!='true'" @click="setTool(row.add_id,3)">删除</span>
                        </div>

                    </div>
                </div>
                <div class="row">
                    <span>付款方式</span>
                </div>
                <div class="rowbody">
                    <span :class="$getState('cache','Animal')=='dog'?'dogbr':'catbr'">在线支付 <i class="i"></i></span>
                </div>
                <div class="row">
                    <span>配送方式</span>
                </div>
                <div class="rowbody">
                    <span :class="$getState('cache','Animal')=='dog'?'dogbr':'catbr'" @click="ative(0)">丹鸟快递 <i ref="refi1" class="i"></i></span>
                    <span :class="$getState('cache','Animal')=='dog'?'dogbr':'catbr'" @click="ative(1)">顺丰航空 <i ref="refi2"></i></span>
                    <span :class="$getState('cache','Animal')=='dog'?'dogbr':'catbr'" @click="ative(2)">顺丰陆运 <i ref="refi3"></i></span>
                </div>
                <div class="row">
                    <span>结算信息</span>
                </div>
                <div class="rbody">
                    <p>应付总额：<span>￥{{totalPrice}}</span></p>
                    <el-button type="success" size="medium" @click="$refs.Pay.dialogVisible=true">结算生成订单</el-button>
                </div>
            </div>
        </div>
        <Footer-Status></Footer-Status>
        <Order-Pay ref="Pay"></Order-Pay>
        <Add-Address ref="Addre" :inserORedit="inserORedit" :addData='editData'></Add-Address>
    </div>
</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    import AddAddress from '@/components/AddAddress.vue'
    import OrderPay from  './OrderPay'

    export default {
        name: "oderGroup",
        components:{ NavStatus,FooterStatus,AddAddress,OrderPay},
        data(){
            return {
                addressArr:[],
                totalPrice:0,
                active:0,
                deli:['丹鸟快递','顺丰航空','顺丰陆运'],
                editData:{},
                inserORedit:false,
                payStatus:false
            }
        },
        methods:{
            async getAddress(){
                let userId = this.$getState('user','userId')||sessionStorage.getItem('userId');
                let [err,res] = await this.$apis.home.getAddress({id:userId});
                if(res.msg=='success'){
                    console.log(res.data,'data');
                        this.addressArr=res.data
                } else {
                    this.$message({
                        message: '数据访问异常',
                        type: 'warning'
                    });
                }
            },
            async  setTool(id,flag){
                let selectAdd={};
                this.inserORedit=false;
                if(flag==1){
                    for(let i of this.addressArr){
                        i.add_flag=i.add_id===id?'true':'false'
                    }
                }else if(flag==2){
                    for(let i of this.addressArr){
                        if(i.add_id===id)
                        this.editData=i;
                    }
                    this.editData.id=id;
                    this.inserORedit=true;
                    this.newAddres()
                }else {
                    this.inserORedit=false;
                    let [err,res] = await this.$apis.home.delectAddress({add_id:id});
                    if(res.msg=='success'){
                        this.$message({
                            message:res.data,
                            type: 'success'
                        });
                        this.getAddress()
                    }else {
                        this.$message({
                            message: res.data,
                            type: 'warning'
                        });
                    }
                }
            },
            newAddres(){
                this.$refs.Addre.openORclose()
            },
            ative(ref){
                let arr=['refi1','refi2','refi3'];
                    for(let i=0;i< 3;i++){
                        if(i==ref)
                            this.$refs[arr[i]].className='i';
                        else
                            this.$refs[arr[i]].className=''
                    }
                this.active=ref
            },
            async setOder(){
                let  commodity= this.$route.params.commodity;
                let id = this.$getState('user','userId')||sessionStorage.getItem('userId');
                let add_id=0;
                for(let i of this.addressArr){
                    if(i.add_flag=='true')
                        add_id=i.add_id
                }
                let [err,res]= await this.$apis.product.Settlement({
                    commodity:commodity,
                    totalPrice:this.totalPrice,
                    id:id,add_id:add_id,
                    deli:this.deli[this.active],
                    status:this.payStatus
                });
                if(res.msg=='success'){
                    this.$message({
                        message: '订单生成成功！',
                        type: 'success'
                    });
                    this.$router.push({name:'myinfo'})
                }else{
                    this.$message({
                        message: '订单生成失败！',
                        type: 'warning'
                    });
                }
            }
        },
        created() {
            this.getAddress();
            this.totalPrice= this.$route.params.totalPrice;
            // let  commodity= this.$route.params.commodity;
            // console.log(commodity,'commodity')
        }
    }
</script>

<style scoped lang="scss">
    .oderGroup{
        .dogbr{
            border: 2px solid #28b810 !important;
            background-color: white !important;
        }
        .catbr{
            border: 2px solid #e63f85 !important;
            background-color: white !important;
        }
        .fl{
            display: flex;
        }
        .oder{
            width: 1200px;
            margin: 0 auto;
            .oderHead{
            }
            .oderBody{
                .i{
                    width: 15px;
                    height: 15px;
                    background: url(../../assets/images/cart-ico.png) no-repeat 3px -1px;
                    display: inline-block;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
                .row{
                    position: relative;
                    height: 30px;
                    border-top: 1px solid #ddd;
                    margin-top: 30px;
                    span{
                        text-align: center;
                        background: #fff;
                        color: #333;
                        padding: 5px;
                        font-size: 12px;
                        position: absolute;
                        left: 20px;
                        top: -16px;
                    }

                }
                .rowbody{
                    height: 30px;
                    line-height: 30px;
                    span{
                        position: relative;
                        cursor: pointer;
                        font-size: 14px;
                        height: 30px;
                        line-height: 30px;
                        border: 1px solid #ddd;
                        color: #666;
                        padding: 0 20px;
                        margin-right: 10px;
                    }
                }
                .rowHead{
                    position: relative;
                    height: 30px;
                    border-top: 1px solid #ddd;
                    margin-top: 30px;
                    :first-child{
                        font-size: 14px;
                        left: 20px;
                    }
                    :last-child{
                        right: 20px;
                        font-size: 12px;
                        cursor: pointer;
                        border: 1px solid #e7e7e7;
                        i{
                            width: 15px;
                            height: 15px;
                            background: url(../../assets/images/cart-ico.png) no-repeat 0 -40px;
                            display: inline-block;
                            border:0px;
                        }
                    }
                    span{
                        background: #fff;
                        color: #333;
                        padding: 5px;
                        position: absolute;
                        top: -16px;
                        font-size: 12px;
                    }
                }
                .rowList{
                    display: flex;
                    margin-bottom:10px;
                    width: 1200px;
                    position: relative;
                    span{
                        position: relative;
                        font-size: 12px;
                        i{
                            position: absolute;
                            bottom: -5px;
                            right: -40px;
                        }
                    }
                    :first-child{
                        cursor: pointer;
                        height: 21px;
                        line-height: 21px;
                        padding: 0 20px;
                    }
                    .list{
                        display: flex;
                        .rightList{
                            position: absolute;
                            right: 45px;
                            font-size: 14px;
                            color: #999;
                            span{
                                padding: 0;
                                margin-left: 20px;
                            }
                        }

                    }
                }
                .rbody{
                    display: flex;
                    width: 1200px;
                    margin-bottom: 20px;
                    justify-content: flex-end;
                    font-size: 14px;
                    span{
                        font-size: 18px;
                        font-weight: 700;
                        color: #e61111;
                        margin-right: 10px;
                    }
                }
            }
        }
    }

</style>