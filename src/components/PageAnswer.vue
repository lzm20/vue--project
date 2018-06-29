<template>
  <div class="page-answer">
    <img src="@/assets/images/logo.png" alt="" class="page-logo">
    <img src="@/assets/images/p4.jpg" alt="" class="page-bg-img">
    <div class="answer-box">
      <div class="answer-part-one" v-if="showAnswer">
        <div class="answer-item"   v-for="(answer,Aindex,key) in answers">
          <div v-if="key<2">
            <div class="answer-topic">{{answer.title}}</div>
            <div class="answer-option" >
              <div class="option" :class="{current:answers[Aindex].options[index].isChecked}" :id="'option'+key+index"  v-for="(option, index) in answer.options">
                <label :for="'option-'+key+index"  v-if="key===0" >
                  <span class="option-value">{{option.val}}</span>
                  <input @change="inputchange0($event,Aindex,key,index)" type="checkbox" :id="'option-'+key+index" :value="lettersArray[index]">
                </label>
                <label :for="'option-'+key+index"  v-else>
                  <span class="option-value">{{option.val}}</span>
                  <input @change="inputchange1($event,Aindex,key,index)" type="checkbox" :id="'option-'+key+index" :value="lettersArray[index]">
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="answer-next"  @click="nextAnswer">下一页</div>
      </div>
      <div class="answer-part-two" v-if="!showAnswer">
        <div class="answer-item" :key="key" v-for="(answer,Aindex,key) in answers">
          <div v-if="key>1">
            <div class="answer-topic">{{answer.title}}</div>
            <div class="answer-option" >
              <div class="option" :class="{current:answers[Aindex].options[index].isChecked}" :id="'option'+key+index" v-for="(option, index) in answer.options" >
                <label :for="'option-'+key+index" v-if="key===2">
                  <span class="option-value">{{option.val}}</span>
                  <input @change="inputchange2($event,Aindex,key,index)" type="checkbox" :id="'option-'+key+index" :value="lettersArray[index]" >
                </label>
                <label :for="'option-'+key+index" v-else-if="key===3">
                  <span class="option-value">{{option.val}}</span>
                  <input @change="inputchangeR3(Aindex,index)"  type="radio" :id="'option-'+key+index" :value="lettersArray[index]" v-model="checkedOption3">
                </label>
                <label :for="'option-'+key+index" v-else-if="key===4">
                  <span class="option-value">{{option.val}}</span>
                  <input @change="inputchangeR4(Aindex,index)"  type="radio" :id="'option-'+key+index" :value="lettersArray[index]" v-model="checkedOption4" >
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-submit-answer" @click="submitAnswer">提交答案</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'page-answer',
  props: ['answers'],
  data () {
    return {
      msg: '答题页',
      showAnswer: true,
      isActive: null,
      checkedOption0: {'A': '', 'B': '', 'C': '', 'D': ''},
      checkedOption1: {'A': '', 'B': '', 'C': '', 'D': ''},
      checkedOption2: {'A': '', 'B': '', 'C': ''},
      checkedOption3: [],
      checkedOption4: [],
      lettersArray: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
      ],
      checkedAll: ['', '', '', '']
    }
  },
  methods: {
    async submitAnswer () {
      console.log(this.checkedAll)
      if (this.checkedAll[2] !== '' && this.checkedAll[3] !== '' && this.checkedAll[4] !== '' && this.checkedAll.length === 5) {
        console.log(this.checkedAll)
        /* 都选中之后 保存问题答案及parentid */
        /* 保存问题答案及parentid */
        const urlKeyAns = '/ajax/app/sap/hana/cloud/setUserAns'
        const _id = sessionStorage.getItem('userid')
        const _parentid = sessionStorage.getItem('parentid')
        const _answer = JSON.stringify(this.checkedAll)
        let ans
        if (_parentid === null) {
          ans = `?id=${_id}&answers=${_answer}`
        } else {
          ans = `?id=${_id}&parentid=${_parentid}&answers=${_answer}`
        }
        const url = `${urlKeyAns}${ans}`
        let errorResponse
        const response = await axios.get(url).catch(() => errorResponse)
        if (response.data.status === 200) {
          this.$emit('datiEndSetShare')
        }
      } else {
        this.initBaseMethod.errorPrompt('还有未选择的项', this)
      }
    },
    nextAnswer () {
      console.log(this.checkedAll)
      if (!this.checkedAll[0] || !this.checkedAll[1]) {
        this.initBaseMethod.errorPrompt('还有未选择的项', this)
      } else {
        this.showAnswer = false
      }
    },
    isEmptyArray (ele) {
      return ele.length !== 0
    },
    inputchange0 (e, o, k, i){
      console.log(e)
      console.log(o)
      console.log(k)
      console.log(i)
      this.checkedAll[0] = ''
      const value = e.target.value
      const isChecked = e.target.checked
      if (isChecked) {
        this.checkedOption0[value] = i
      } else {
        this.checkedOption0[value] = ''
      }
      this.answers[o].options[i].isChecked = !this.answers[o].options[i].isChecked
      /* 第一题 */
      for (const s0 in this.checkedOption0){
        if (this.checkedOption0[s0] !== ''){
          if (this.checkedAll[0] !== ''){
            this.checkedAll[0] += ',' + s0
          } else {
            this.checkedAll[0] += s0
          }
        }
      }
      console.log(this.checkedAll[0])
    },
    inputchange1 (e, o, k, i){
      const value = e.target.value
      const isChecked = e.target.checked
      if (isChecked) {
        this.checkedOption1[value] = i
      } else {
        this.checkedOption1[value] = ''
      }
      this.answers[o].options[i].isChecked = !this.answers[o].options[i].isChecked
      /* 第二题 */
      this.checkedAll[1] = ''
      for (const s1 in this.checkedOption1){
        if (this.checkedOption1[s1] !== ''){
          if (this.checkedAll[1] !== ''){
            this.checkedAll[1] += ',' + s1
          } else {
            this.checkedAll[1] += s1
          }
        }
      }
      console.log(this.checkedAll[1])
    },
    inputchange2 (e, o, k, i){
      const value = e.target.value
      const isChecked = e.target.checked
      if (isChecked) {
        this.checkedOption2[value] = i
      } else {
        this.checkedOption2[value] = ''
      }
      this.answers[o].options[i].isChecked = !this.answers[o].options[i].isChecked
      /* 第三题 */
      this.checkedAll[2] = ''
      for (const s2 in this.checkedOption2){
        if (this.checkedOption2[s2] !== ''){
          if (this.checkedAll[2] !== ''){
            this.checkedAll[2] += ',' + s2
          } else {
            this.checkedAll[2] += s2
          }
        }
      }
      console.log(this.checkedAll[2])
    },
    inputchangeR3 (o, i) {
      for (const j in this.answers[o].options){
        this.answers[o].options[j].isChecked = false
      }
      this.answers[o].options[i].isChecked = true
      this.checkedAll[3] = this.checkedOption3
    },
    inputchangeR4 (o, i) {
      for (const j in this.answers[o].options){
        this.answers[o].options[j].isChecked = false
      }
      this.answers[o].options[i].isChecked = true
      this.checkedAll[4] = this.checkedOption4
    }
  }
}
</script>
<style scoped>
  .answer-box{
    position: absolute;
    top:1.85rem;
    left: 50%;
    -webkit-transform:translate3d(-50%,0rem,0rem);
    transform:translate3d(-50%,0rem,0rem);
    width:5.2rem;
  }
  .answer-item{
    margin-bottom:0.3rem;
  }
  .answer-topic{
    color:#fff;
    font-size: 0.2rem;
    font-weight: bold;
  }
  .answer-option{
    margin-top:0.3rem;
  }
  .answer-option .option{
    width:5.2rem;
    padding:0.1rem 0.2rem;
    border:2px solid #2793dc;
    border-radius: 0.08rem;
    background-color: #0b5fa6;
    color:#fff;
    font-size: 0.18rem;
    margin:0.1rem 0rem;
    position: relative;
  }
  .answer-option .option.current{
    background-color: #f5ad00;
    border: 2px solid #2793dc;
  }
  input[type="checkbox"],input[type="radio"]{
    position: absolute;
    top:0rem;
    left: 0rem;
    width:100%;
    height:100%;
  }
  .answer-next{
    width:2.2rem;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    color:#fff;
    font-size: 0.28rem;
    font-weight: bold;
    border-radius:0.35rem;
    margin:0 auto;
    background-color: #f5ad00;
    transition: all 1s;
  }
  .btn-submit-answer{
    width:2.2rem;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    color:#fff;
    font-size: 0.28rem;
    font-weight: bold;
    border-radius:0.35rem;
    margin:0 auto;
    background-color: #f5ad00;
  }
</style>
