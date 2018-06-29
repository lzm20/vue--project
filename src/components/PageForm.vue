<template>
    <div class="page-form">
      <img src="@/assets/images/p3.jpg" alt="" class="page-bg-img">
      <img src="@/assets/images/logo.png" alt="" class="page-logo">
      <div class="form-box">
        <div class="form-item">
          <div class="item-label">姓名</div>
          <input v-focus type="text" name="name" v-model="name" max-lenght="25">
        </div>
        <div class="form-item">
          <div class="item-label">员工号</div>
          <input type="text" v-model="employee_id">
        </div>
        <div class="form-item " v-if="form_error">
          <span class="form-error">请补充完整信息</span>
        </div>
      </div>
      <div class="btn-submit-form" @click="submitForm">
        <img src="@/assets/images/start-answer.png" alt="" class="page-bg-img">
      </div>
      <div class="btn-look-collection" @click="go_collection">
        查看宝典
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'page-form',
  data () {
    return {
      msg: '手机号/员工号',
      name: null,
      employee_id: null,
      form_error: false
    }
  },
  methods: {
    async submitForm () {
      if (this.name && this.employee_id) {
        /* 保存用户姓名及员工号 */
        const urlKey = '/ajax/app/sap/hana/cloud/setUserInfo'
        const _openid = sessionStorage.getItem('openid')
        const q = `?openid=${_openid}&employee_code=${this.employee_id}&title=${this.name}`
        const url = `${urlKey}${q}`
        const response = await axios.get(url)
        if (response.data.status === 200) {
          // 保存用户id
          const userid = response.data.data.id
          sessionStorage.setItem('userid', userid)
          this.$emit('setGotoPage', 'Form', 'Answer')
        } else {
          this.initBaseMethod.errorPrompt('数据异常', this)
        }
      } else {
        this.form_error = true
      }
    },
    go_collection () {
      this.$emit('setGotoPage', 'Form', 'Collection')
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
<style scoped>
.btn-submit-form{
    position: absolute;
    top:6.45rem;
    left:1.71rem;
    width:2.99rem;
    height: 0.82rem;
    z-index: 2;
 }
 .btn-submit-form img{
    width:2.99rem;
    height: 0.82rem;
 }
 .form-box{
   position: absolute;
   top:3.18rem;
   left:1.25rem;
   width: 3.9rem;
 }
 .form-item{
   margin-bottom: 0.2rem;
 }
 .form-item .item-label{
   height: 0.36rem;
   line-height: 0.36rem;
   color:#fff;
   font-size: 0.22rem;;
   font-weight: bold;
   text-align: left;
 }
 .form-item input{
   width:3.9rem;
   height: 0.72rem;
   padding-left:0.15rem;
   background-color: #fff;
   border:1px solid #b8c0c6;
   border-radius: 0rem;
 }
 .form-error{
   color:#f1ab00;
   font-size: 0.22rem;
   font-weight: bold;
   text-align: left;
   display: block;
 }
.btn-look-collection{
  position: absolute;
  top:9rem;
  left: 50%;
  -webkit-transform:translate3d(-50%,0rem,0rem);
  width:1.1rem;
  text-align: center;
  color:#fff;
  font-size: 0.26rem;
  height: 0.36rem;
  line-height: 0.36rem;
  border-bottom:1px solid #1c91df;
}
</style>
