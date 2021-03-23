<template>
  <div class="home">
      <Dog-Or-Cat v-if="this.$getState('cache','Animal')==null"></Dog-Or-Cat>
      <Nav-Status></Nav-Status>
      <Home-Body></Home-Body>
      <Footer-Status></Footer-Status>
    <div><router-view/></div>

  </div>
</template>

<script>
// @ is an alias to /src
import NavStatus from '@/components/NavStatus.vue'
import DogOrCat from '@/components/DogOrCat.vue'
import HomeBody from './HomeBody.vue'
import FooterStatus from '@/components/FooterStatus.vue'
export default {
   name: 'Home',
   components: {
    DogOrCat,NavStatus,HomeBody,FooterStatus
    },
    data(){
      return{Animal:null}
    },
    methods:{

    },
    created() {
          this.Animal=sessionStorage.getItem('Animal')
          this.$setState('cache','Animal',this.Animal)
          console.log(sessionStorage.getItem('Animal'),'home-----------')
    },
    mounted() {

    }
}
</script>
<style scoped lang="scss">
    .home{
        z-index: 10;

    }
</style>
