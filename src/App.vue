<template>
  <div id="app">
    <header1 :seller="seller"></header1>
    <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
  import header1 from './components/header/header.vue'
  export default{
    data() {
      return {
         seller: {}
      }
    },
    created() {
      this.axios.get('/api/seller').then((response) => {
        if (response.data.errno === 0) {
          this.seller = response.data.data
          console.log(this.seller)
        }
      })
    },
    components: { header1 }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align:center
      & >a
        display:block
        font-size:14px
        color:rgb(77,85,93)
        text-decoration:none
        &.router-link-active
          color:rgb(240,20,20)
</style>
