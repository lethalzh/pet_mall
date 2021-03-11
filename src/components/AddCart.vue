<template>
   <div class="AddCart">
       <el-dialog
               title="添加成功"
               :visible.sync="dialogVisible"
               width="35%"
           >
          <div class="msg">
              <img src="../assets/images/buy_cat.gif" height="145" width="192"/>
              <div>
                  <p>恭喜小主 ,成功添加到购物车咯~</p>
                  <el-button @click="dialogVisible = false">继续购物</el-button>
                  <el-button type="primary" @click="goShopCart()">立即结算</el-button>
              </div>
          </div>
       </el-dialog>
   </div>
</template>

<script>
    export default {
        name: "AddCart",
        data() {
            return {
                dialogVisible: false
            }
        },
        methods:{
            goShopCart(){
                this.$router.push({name:'shopcart'})
                this.dialogVisible = false
            },
            open(){
                this.dialogVisible=true
            }
        }
    }
</script>

<style scoped lang="scss">
.AddCart{
    .msg{
        display: flex;
        div{
            margin-left: 45px;
        }
    }
}
</style>