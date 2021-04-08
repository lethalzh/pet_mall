<template>
    <div class="AboutDetails">
        <Nav-Status :mode="1"></Nav-Status>
       <div class="imgs">
           <div  v-for="(img,index) of imgArr" :key="index" :class="index!=0?'img':'imgtitle'">
               <img  :src="img" alt="">
           </div>
       </div>
        <Footer-Status></Footer-Status>
    </div>
</template>

<script>
    import NavStatus from '@/components/NavStatus.vue'
    import FooterStatus from '@/components/FooterStatus.vue'
    export default {
        name: "AboutDetails",
        components:{NavStatus,FooterStatus},
        data(){
            return{imgArr:[]}
        },
        created() {
         this.imgArr = this.$route.params.imgArr
        }
    }
</script>

<style scoped lang="scss">
.AboutDetails{

    .imgs {
        margin-top:-15px ;
        background-color: #FFDCF2;
        .imgtitle{
        }
        .img{
            width: 1000px;
            margin: 0 auto;
            img{
                margin-top: -5px;
            }
        }
    }
}
</style>