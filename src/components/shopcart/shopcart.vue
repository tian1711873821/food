<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'hightlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'hightlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'hightlight':totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryprice}}元</div>
        </div>
        <div class="content-right" @click.stop="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
<!--        <transition name = "drop">-->
<!--          <div v-for="ball in balls" v-show="ball.show" class="ball"></div>-->
<!--            <div class="inner"></div>-->
<!--        </transition>-->
      </div>
      <transition name="fold">
      <div class="shopcartlist" v-show="listshow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="wrapper">
          <ul>
            <li class="food border-1px" v-for="food in selletFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <addshop :food="food"></addshop>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <transition name="fade">
    <div class="list-mask" v-show="listshow" @click="hidelist"></div>
    </transition>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import addshop from '../addshop/addshop'
    export default {
        name: "shopcart",
      data(){
          return{
            fold:true
          }
      },
      props:{
        deliveryprice:Number,
        minprice:Number,
        selletFoods:{
          type:Array,
          default(){
            return [];
          }
        }
      },
      computed:{
          totalPrice(){
            let total=0;
            this.selletFoods.forEach((food)=>{
              total+=food.price * food.count
            })
            return total;
          },
        totalCount(){
            let count=0;
          this.selletFoods.forEach((food)=>{
            count+=food.count
          })
          return count;
        },
        payDesc(){
            if(this.totalPrice===0){
              return `￥${this.minprice}元起送`;
            }else if(this.totalPrice<this.minprice){
              let diff=this.minprice-this.totalPrice
              return `还差￥${diff}元起送`;
            }else {
              return "去结算"
            }
        },
        payClass(){
            if (this.totalPrice<this.minprice) {
              return 'not-enough'
            }else {
              return 'enough'
            }
        },
        listshow(){
          if(!this.totalCount>0){
            this.fold=true
            return false
          }
          let show=!this.fold
          if(show){
            this.$nextTick(()=>{
              this.scrool=new Bscroll(this.$refs.wrapper,{
                click:true
              })
            })
          }
          return show;
        }
      },
      components:{
        addshop
      },
      methods:{
        toggleList() {
          if (!this.totalCount) {
            return;
          }
          this.fold = !this.fold;
          // console.log("flod-----"+this.fold)
          console.log("listshow-----"+this.listshow)
        },
        empty(){
          this.selletFoods.forEach((food)=>{
            food.count=0
          })
        },
        hidelist(){
          this.fold=true
        },
        pay(){
          if (this.totalPrice<this.minprice){
            return
          }
          window.alert(`需要支付${this.totalPrice}钱`)
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
.shopcart
  position: fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height:48px
  .content
    display flex
    font-size 0
    background #141d27
    color: rgba(255,255,255,0.4)
    .content-left
      flex: 1;
      .logo-wrapper
        display inline-block
        position: relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background #000
        .num
          position: absolute
          top 0px
          right 0px
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius  16px;
          font-size 9px
          font-weight 700
          color #fff
          background rgb(240,20,20)
          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .logo
          width 100%
          height 100%
          border-radius 50%
          background #2b343c
          text-align center
          &.hightlight
            background rgb(0,160,220)
          .icon-shopping_cart
            font-size 24px
            color: #80858a
            line-height 44px
            &.hightlight
              color: #fff
      .price
        display inline-block
        vertical-align top
        line-height 24px
        margin-top 12px
        box-sizing border-box
        padding-right 12px
        border-right: 1px solid rgba(255,255,255,0.1)
        font-size 16px
        font-weight 700
        &.hightlight
          color: #fff
      .desc
        display inline-block
        vertical-align top
        line-height 24px
        margin 12px 0 0 12px
        box-sizing border-box
        font-size 10px
    .content-right
      flex 0 0 105px
      width 105px
      right 0px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        background #2b333b
        /*&.not-enough*/
        /*  background  #2b333b*/
        &.enough
          background #00b43c
          color: #fff
  .shopcartlist
    position absolute
    top: -217px
    left 0
    z-index -1
    width 100%
    transition .5s
    &.fold-enter-active,&.fold-leave-active
      opacity: 1;
      transition .5s
      transform translate3d(0,100%,0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      border-bottom 1px solid rgba(7,17,27,0.1)
      .title
        float left
        font-size 14px
      .empty
        float right
        font-size 12px
        color rgb(0,160,220)
    .list-content
      padding 0 18px
      max-height 217px
      min-height 217px
      background #fff
      overflow hidden
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        border-1px(rgba(7,17,27,0.1))
        .name
          line-height 24px
          font-size 14px
          color: rgb(7,17,27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color: rgb(240,20,20)
        .cartcontrol-wrapper
          position absolute
          right 0px
          bottom 6px


.list-mask
  position fixed
  top:0px
  left:0px
  width 100%
  height: 100%
  z-index 40
  background rgba(7,17,27,0.6)
  backdrop-filter blur(10px)
  &.fade-enter-active
    transition: opacity 1s;
  &.fade-leave-active
    transition: opacity .5s;
  &.fade-enter, &.fade-leave-to
    opacity: 0;
</style>
