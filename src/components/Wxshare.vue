<template>
  <div class="wx-share" id="share">
  </div>
</template>
<script>
import AppWeixinShareUtil from '@/assets/js/wx-share-util'
export default {
  name: 'wx-share',
  props: ['shareData'],
  methods: {
    async getWXShare (sharedata, testAction) {
      console.log(testAction)
      const url = 'http://api.oceanus-data.com/api/weixin/js/config'
      const param = {
        title: sharedata.title,
        desc: sharedata.desc,
        link: sharedata.link,
        imgUrl: sharedata.imgUrl,
        visiting_url: window.location.href,
        weixin: 1
      }
      const response = await this.axios.post(url, param)
      let config = response.data.data
      config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
      config.debug = false
      let shareP = param
      AppWeixinShareUtil.setupWeixinShare(config, shareP)
    },
    setWxShare (sharedata, testAction) {
      console.log(testAction)
      AppWeixinShareUtil.setupWeixinShareOnly(sharedata)
    }
  },
  watch: {
    shareData () {
      this.setWxShare(this.shareData, 'watch 监测share发生变化  设置分享地址')
    }
  },
  mounted () {
    this.getWXShare(this.shareData, 'mounted 设置分享地址')
  }
}
</script>
