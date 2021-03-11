<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{info}}
    <button @click="getapi">get</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      info:'',
    }
  },
  methods:{
    async getapi(){
      let [err,res] =await this.$apis.company.getcs();
      this.info=res.data;
      console.log(err)
    }
  },
   created() {
   this.getapi
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
