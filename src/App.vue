<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    //派发一个action 获取商品分类的三级列表的数据
    this.$store.dispatch("catagoryList");
  }
}
</script>

<style>

</style>
