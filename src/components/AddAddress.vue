<template>
    <div class="AddAddress">
        <el-dialog
                title="添加收货地址"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                width="35%"
                >
            <div>
                <el-form ref="form" :model="form" label-width="130px">
                    <el-form-item label="收货人姓名" required>
                        <el-input v-model="form.add_name"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" required>
                        <el-cascader
                                size="large"
                                :options="options"
                                v-model="form.add_arrs"
                               >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" required>
                        <el-input  v-model="form.add_address"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" required>
                        <el-input  v-model="form.add_number"></el-input>
                    </el-form-item>
                    <el-form-item label="设为默认收货地址" >
                        <el-switch
                                :active-value="'true'"
                                :inactive-value="'false'"
                                v-model="form.add_flag"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存收货地址</el-button>
                    </el-form-item>
                </el-form>
            </div>
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--            </span>-->
        </el-dialog>/
    </div>
</template>

<script>
    import { regionData } from 'element-china-area-data'
    export default {
        name: "AddAddress",
        props:{
            addData:{
                type:Object
            },
            inserORedit:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                dialogVisible: false,
                form:{},
                options: regionData,
            };
        },
        methods:{
           async onSubmit(){
               console.log(this.addData,'add address')
               let userId = this.$getState('user','userId')||sessionStorage.getItem('userId');
               if(this.inserORedit){
                   var [err,res] = await this.$apis.home.EditAddress({id:userId,data:this.form,aid:this.addData.id })
               }else{
                   var [err,res] = await this.$apis.home.AddAddress({id:userId,data:this.form })
               }

               if(res.msg=='success'){
                   this.$message({
                       message:res.data,
                       type: 'success'
                   });
                   this.$parent.getAddress()
                   this.openORclose()
               }else {
                   this.$message({
                       message: res.data,
                       type: 'warning'
                   });
               }
            },
            openORclose(){
               this.dialogVisible=!this.dialogVisible
            },

        },
        // created() {
        //   this.form = this.addData
        // },
        updated() {
            this.form = this.addData
        }
    }
</script>

<style scoped lang="scss">
    .AddAddress{
        .el-input{
            width: 218px;
        }
    }

</style>