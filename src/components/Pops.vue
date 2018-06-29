<template>
  <transition name="fade" mode="out-in" appear>
    <div class="prompt">
      {{showPopsData}}
    </div>
  </transition>
</template>
<script>
export default {
  name: 'prompt',
  props: ['showPopsData'],
  data () {
    return {
      msg: '信息必填'
    }
  },
  mounted () {
    setTimeout(() => {
      this.$emit('closePops')
    }, 800)
  }
}
</script>
<style>
   .prompt{
     position: fixed;
     top:50%;
     left:50%;
     -webkit-transform:translate3d(-50%,-65%,0rem);
     transform:translate3d(-50%,-65%,0rem);
     padding:0.2rem;
     background-color: rgba(0,0,0,0.8);
     color:#fff;
     font-size: 0.24rem;
   }
</style>


