<template>
    <div class="addshop">
      <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline"
           v-show="food.count>0" @click.stop="decreaseCart">
<!--        <span class="inner icon-remove_circle_outline"></span>-->
      </div>
      </transition>
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "addshop",
        data(){
          return{

          }
        },
      props:{
          food:{
            type:Object
          }
      },
      methods:{
        addCart(event){
          if(!this.food.count){
            Vue.set(this.food,"count",1)
          } else {
            this.food.count++
          }
          // this.$dispatch('cart.add',event.target)
        },
        decreaseCart(){
          if(this.food.count){
            this.food.count--
          }
        }
      }
    }
</script>

<style scoped lang="stylus">
.addshop
  font-size 0
  .cart-decrease
    display inline-block
    line-height 24px
    font-size 24px
    padding 6px
    color: rgb(0,160,220)
    &.move-enter, &.move-leave-to
      opacity: 0;
      transition .5s
      transform translate3d(24px,0,0)
    &.move-enter-active
      transition: opacity
      transition .5s
    &.move-leave-active
      transition: opacity
      transition .5s
      transform translate3d(24px,0,0)
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color: rgb(147,153,159)
  .cart-add
    display inline-block
    line-height 24px
    font-size 24px
    padding 6px
    color: rgb(0,160,220)


</style>
