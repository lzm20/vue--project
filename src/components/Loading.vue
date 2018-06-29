<template>
   <div class="loading" v-if="isLoading">
      <img class="loadingC" src="../assets/images/loading/_loadingC.png" alt="">
      <img class="loadingZ" style="" src="../assets/images/loading/_loadingZ.png" alt="">
   </div>
</template>
<script>
export default {
  name: 'loading',
  data () {
    return {
      msg: 'loading'
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style>
  .loading{
    position: fixed;
    top:0rem;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    background-color: #000;
    z-index: 99;
  }
  .loadingC{
    position: absolute;
    width: 30%;
    height: auto;
    left: 35%;
    top: 3.5rem;
  }
  .loadingZ{
    position: absolute;
    width: 30%;
    height: auto;
    left: 35%;
    top:  3.5rem;
    -webkit-animation: _loading 2s linear infinite;
    animation: _loading 2s linear infinite
  }
  @-webkit-keyframes _loading
  {
      0%   {-webkit-transform:rotate(0deg);}
      100% {-webkit-transform:rotate(360deg);}
  }
  @keyframes _loading
  {
      0%   {transform:rotate(0deg);}
      100% {transform:rotate(360deg);}
  }
</style>


