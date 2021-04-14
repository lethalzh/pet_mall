<template>
    <div class="OrderInfo">
        <el-dialog
                title="订单详情"
                :visible.sync="dialogVisible"
                width="60%">
            <div class="OrderInfoBody">
                <div class="title"><span>商品详情</span></div>
                <el-table
                        :data="toInfodata"
                        style="width: 100%">
                    <el-table-column
                            label="照片"
                            width="180">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.com_imgs">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="com_name"
                            label="商品名称"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="com_price"
                            label="单价">
                    </el-table-column>
                    <el-table-column
                            prop="s_num"
                            label="数量">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-tag type="success" @click="SeeCol(scope.row.c_id)">查看</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="title"><span>订单信息</span></div>
                <div class="oInfo" >
                    <el-col :span="6"  :offset="6">
                        <div>订单编号: <span>{{toInfodata[0].o_id}}</span></div>
                        <div>订单总金额:<span class="daon">￥{{toInfodata[0].o_totalPrice}}</span></div>
                        <div>物流方式: <span>{{toInfodata[0].o_deli}}</span></div>
                        <div>下单时间: <span>{{toInfodata[0].o_createDate}}</span></div>
                    </el-col>

                    <div>收获人: <span>{{toInfodata[0].add_name}}</span></div>
                    <div>收货人电话: <span>{{toInfodata[0].add_number}}</span></div>
                    <div>收货人地址: <span>{{toInfodata[0].add_address}}</span></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "OrderInfo",
        props:{
            toInfodata:{
                default:[]
            }
        },
        data(){
            return{
                dialogVisible:false,
            }
        },
        methods:{
            SeeCol(id){
                // console.log(id,'ididid')
                window.location.href=`${this.$getState('dict','thisUrl')}details/${id}`;
                this.dialogVisible=false
            }
        }
    }
</script>

<style scoped lang="scss">
.OrderInfo{
    .OrderInfoBody{
        .el-table{
            text-align: center;
        }
        .title{
            height: 38px;
            line-height: 38px;
            padding: 0 10px;
            border-bottom: 1px solid #b4e4c8;
            border-top: 1px solid #b4e4c8;
            background: #e9f7f0;
            font-size: 14px;
        }
        .oInfo{
            line-height: 28px;
            color: #666;
            .o_id{
                color: #ff4400;
            }
            .daon{
                color: #F60;
                font-size: 16px;
            }
        }
    }
}
</style>