<template>
  <div class=" dis-flex flex-x  flex-x-center header">
    <i class="iconfont icon-back header-back" @click="goBack" v-if="showBack" ></i>

    <span class="header-title">{{title}}</span>
    <i class="iconfont icon-input header-right" @click="rightClick" v-if="showRight"></i>

  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: ['showBack','title','showRight'],
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      rightClick(){
        this.$emit('rightClick');
      }
    }
  }

</script>

<style scoped>

  .header {
    height: 50px;
    background:#fff;
  }

  .header-title {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    color:#333;
    font-size:18px;
    font-weight:300;
    z-index:1;
    width: 10rem;
    text-align: center;
  }

  .header-back {
    position: absolute;
    left: 10px;
    z-index:2
  }
  .header-right{
    position: absolute;
    right: 10px;
    z-index:2

  }

</style>
