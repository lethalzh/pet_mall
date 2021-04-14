<template>
  <div class="home">
      <Dog-Or-Cat v-if="$getState('cache','Animal')==null"></Dog-Or-Cat>
      <Nav-Status></Nav-Status>
      <Home-Body></Home-Body>
      <Footer-Status></Footer-Status>
<!--      <el-cascader-->
<!--              size="large"-->
<!--              :options="options"-->
<!--              v-model="selectedOptions"-->
<!--              @change="handleChange">-->
<!--      </el-cascader>-->
<!--      aaa-->
    <div><router-view/></div>


  </div>
</template>

<script>

import { regionData,provinceAndCityData,provinceAndCityDataPlus,regionDataPlus,CodeToText,TextToCode } from 'element-china-area-data'
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
      return{Animal:null,
          options: regionData,
          selectedOptions: []
      }
    },
    methods:{
        handleChange (value) {
            console.log(value,this.selectedOptions)
        }
    },
    created() {
          this.Animal=sessionStorage.getItem('Animal');
          this.$setState('cache','Animal',this.Animal);
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
