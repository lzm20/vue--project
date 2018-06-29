<template>
   <div class="page-home">
    <img src="@/assets/images/p1.jpg" alt="" class="page-bg-img">
    <img src="@/assets/images/logo.png" alt="" class="page-logo">
    <div class="btn-go-answer-collection" @click="Gocollection"></div>
    <div class="btn-go-answer" @click="Goanswer"> </div>
   </div>
</template>
<script>
export default {
  name: 'page-home',
  data () {
    return {
      msg: '首页'
    }
  },
  methods: {
    Gocollection () {
      this.$emit('setGotoPage', 'Home', 'Collection')
    },
    Goanswer () {
      this.$emit('setGotoPage', 'Home', 'Form')
    }
  }
}
</script>
<style scoped>
  .btn-go-answer-collection{
    position: absolute;
    top: 7rem;
    width: 3rem;
    height: 1.5rem;
    /* border: 1px solid red; */
    z-index: 3;
    left: 2.6rem;
  }
  .btn-go-answer{
    position: absolute;
    top: 8rem;
    width: 1.8rem;
    height: 1.2rem;
    /* border: 1px solid red; */
    z-index: 3;
    left: .4rem;
  }
</style>

