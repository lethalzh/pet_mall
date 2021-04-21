<template>
    <div class="OrderPay">
        <el-dialog
                title="支付"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <img  src="@/assets/images/pay.jpg" height="200" width="200" />
<!--            <img src="" alt="">-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="setPay(-1)">未支付</el-button>
                <el-button type="primary" @click="setPay(1)">支付完成</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "OrderPay",
        data() {
            return {
                dialogVisible: false
            };
        },
        methods:{
            setPay(set){
                this.$parent.payStatus=set;
                this.$parent.setOder();
                this.dialogVisible=false
            }
        }
    }
</script>

<style scoped lang="scss">
    ::v-deep .el-dialog__body{
    text-align: center;
}
</style>