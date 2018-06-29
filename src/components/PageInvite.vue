<template>
  <div class="page-invite">
    <img src="@/assets/images/logo.png" alt="" class="page-logo">
    <img src="@/assets/images/p5.jpg" alt="" class="page-bg-img">
    <div class="invitations-number">您已经邀请了 <span>{{count}}</span> 人</div>
    <div class="btn-invite" @click="shareBtn">立即邀请</div>
    <div class="share-box" v-show="shareBoxShow" @click="shareBoxBtn">
      <img src="@/assets/images/share_1.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: ['count'],
  name: 'page-invite',
  data () {
    return {
      msg: '邀请页',
      shareBoxShow: false
    }
  },
  methods: {
    shareBtn () {
      this.shareBoxShow = true
    },
    shareBoxBtn () {
      this.shareBoxShow = false
    }
  }
}
</script>
<style scoped>
  .invitations-number{
    position: absolute;
    top:6.5rem;
    left: 0rem;
    text-align: center;
    width:100%;
    color:#fff;
    font-size: 0.32rem;
    font-weight: bold;
  }
  .invitations-number span{
    color:#f3ac00;
  }
  .btn-invite{
    position: absolute;
    top:8.7rem;
    left: 50%;
    -webkit-transform:translate3d(-50%,0rem,0rem);
    transform:translate3d(-50%,0rem,0rem);
    width:2.2rem;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    color:#fff;
    font-size: 0.28rem;
    font-weight: bold;
    border-radius:0.35rem;
    background-color: #f5ad00;
  }
  .share-box{
    position: fixed;
    top:0rem;
    left: 0rem;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 99;
  }
  .share-box img{
    width:100%;
  }
</style>

