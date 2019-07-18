<template>
  <div id="app">
    <div class="header">
      <myheader :seller="seller"></myheader>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/" >商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratins">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import myheader from './components/header/mheader'
  const ERROK=0;
export default {
  name: 'App',
  data(){
    return{
        seller:{}
    }
  },
  created(){
  this.$http.get('api/seller').then((res)=>{
        res=res.body;
    if (res.errno==ERROK) {
      // console.log("正确")
      this.seller=res.data
    }
    // console.log(this.seller)
  },(err)=>{
    console.log(err)
  })
  },
  components:{
    myheader
  }
}
</script>

<style lang="stylus">
  @import "./common/stylus/mixin.styl";
    .tab
      display :flex
      width :100%
      height: 40px
      line-height :40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex :1
        text-align: center
        a
          display:block
          font-size:14px
          color: rgb(77,85,93)
          &.active
            color: rgb(0, 160, 220)
</style>
