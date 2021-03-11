<template>
    <div class="ShopCart">
        <Nav-Status :mode="2"></Nav-Status>
        <div class="ShopCartBody">
            <div class="titile"><span><i class="el-icon-shopping-cart-full"></i>宠爱购物车</span></div>
            <div class="ffbr"></div>
            <div class="ShopTable">
                <el-table
                        :data="tableData"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        style="width: 100%;text-align: center">
                    <el-table-column
                            type="selection"
                            label="全选"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="商品图片"
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
                            label="商品标题"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="数量">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.s_num"  size="small" :min="1" label="描述文字"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="价格"
                            width="180">
                        <template slot-scope="scope">
                            <div>${{(scope.row.com_price)*(scope.row.s_num)}}
                            <span>{{scope.com_price}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="操作"
                            width="180">
                        <template slot-scope="scope">
                            <el-tag type="danger" @click="deleteCol(scope.row.s_id)">删除</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
               <div class="btmTable">
                   <div><router-link to="/product"><el-button type="primary">继续购物</el-button></router-link></div>
                   <div class="rightButm"><p>总价格：<span>${{totalPrice}}</span></p><el-button type="primary" @click="Settlement()">去结算</el-button></div>
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
        name: "ShopCart",
        components: {
            NavStatus,FooterStatus
        },
        data() {
            return {
                tableData: [], multipleSelection: [],totalPrice:0
            }
        },
        methods: {
            async getCart() {
                let id = this.$getState('user','userId')||localStorage.getItem('userId');
                let [err,res]= await this.$apis.product.getCart({id:id})
                if(res.msg=='success'){
                    this.tableData=res.data
                }else{
                    this.$message({
                        message: '购物车获取失败！',
                        type: 'warning'
                    });
                }
            },
            async deleteCol(dId){
                let [err,res] = await this.$apis.product.delectCart({did:dId})
                if(res.msg=='success'){
                    this.$message({
                        message: '删除成功！',
                        type:'success'
                    });
                    this.getCart();
                }else{
                    this.$message({
                        message: '删除异常！',
                        type: 'warning'
                    });
                }

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.totalPrice=0
                for(let item of val){
                    this.totalPrice+=item.com_price*item.s_num
                }
            },
            async Settlement(){
                let id = this.$getState('user','userId')||sessionStorage.getItem('userId');
                if(this.multipleSelection.length!=0){
                    let [err,res]= await this.$apis.product.Settlement({commodity:this.multipleSelection,totalPrice:this.totalPrice,id:id})
                    if(res.msg=='success'){
                        this.$message({
                            message: '前往付款！',
                            type: 'success'
                        });
                        this.$router.push({name:'odergroup'})
                    }else{
                        this.$message({
                            message: '结算失败！',
                            type: 'warning'
                        });
                    }
                }else{
                    this.$message({
                        message: '没有结算商品',
                        type: 'warning'
                    });
                }

            }
        },
        created() {
            this.getCart();
        }
    }
</script>

<style scoped lang="scss">
.ShopCart{

    .ShopCartBody{
        width: 1200px;
        margin: 0 auto;
        .titile{
            margin-top: 30px;
            font-size: 18px;
            padding: 0 30px;
            color: #ff6600;
            position: relative;
            cursor: pointer;
        }
        .ffbr{
            position: absolute;
            width: 186px;
            height: 6px;
            border-bottom: 2px solid #ff6000;
        }
        .btmTable{
            display: flex;
            margin-top: 15px;
            justify-content: space-between;
            .rightButm{
                display: flex;
                span{
                    color: red;
                    margin-right: 10px;
                }
            }
        }


    }

}
</style>