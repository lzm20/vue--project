<template>
<transition name="fade">
   <div class="page-collection">
      <img src="@/assets/images/logo.png" alt="" class="page-logo">
      <img src="@/assets/images/p2.jpg" alt="" class="page-bg-img">
      <div v-for="(items, index) in item" :class="'collection-item-'+(index+1)" @click="lookCollection(index)"></div>
      <transition name="fade">
        <div class="collection-pops" v-show="collectionPops">
          <div class="close-pops" @click="closePops"></div>
          <img :src="collectionImg" alt="">
          <div class="btn-go-form" @click="go_form" :class="{'btn-go-form-stree':btnStree}"></div>
        </div>
      </transition>
   </div>
</transition>
</template>
<script>
export default {
  name: 'page-collection',
  data () {
    return {
      msg: '答题宝典',
      collectionImg: '',
      collectionImgData: [
        require('@/assets/images/interest.png'),
        require('@/assets/images/target-users.png'),
        require('@/assets/images/advantage.png')
      ],
      item: [
        'interest',
        'target-users',
        'advantage'
      ],
      collectionPops: false,
      btnStree: false
    }
  },
  methods: {
    lookCollection (i) {
      this.collectionPops = true
      this.collectionImg = this.collectionImgData[i]
      if (i === 2) {
        this.btnStree = true
      } else {
        this.btnStree = false
      }
    },
    closePops () {
      this.collectionPops = false
    },
    go_form () {
      this.$emit('setGotoPage', 'Collection', 'Form')
    }
  }
}
</script>
<style scoped>
  .collection-item-1{
    position: absolute;
    top:6.85rem;
    left: 0.44rem;
    width:2.9rem;
    height: 1rem;
    z-index: 2;
  }
  .collection-item-2{
    position: absolute;
    top:7.9rem;
    left:3.1rem;
    width:2.9rem;
    height: 1rem;
    z-index: 2;    
  }
  .collection-item-3{
    position: absolute;
    top:8.25rem;
    left: 0.5rem;
    width:2.2rem;
    height: 1rem;
    z-index: 2;    
  }
  .collection-pops{
    position: absolute;
    width: 6.4rem;
    height:9.01rem;
    bottom: 0.2rem;
    left: 0rem;
    z-index: 9;
  }
  .collection-pops img{
    width: 6.4rem;
    height:9.01rem;
  }
  .btn-go-form{
    position: absolute;
    bottom: 0.44rem;
    left: 50%;
    -webkit-transform:translate3d(-50%,0rem,0rem);
    width:3.16rem;
    height: 1rem;
  }
  .btn-go-form-stree{
    bottom:1.2rem;
  }
  .close-pops{
    position: absolute;
    top:0rem;
    right:0.1rem;
    width:1rem;
    height:1rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

