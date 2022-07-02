<template>
  <div>
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="list in bannerList"
          :key="list.id"
        >
          <img :src="list.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props:['bannerList'],
  watch:{
    bannerList:{
      immediate:true,
      handler(){
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper,{
          loop:true,
          pagination:{
            el:'.swiper-pagination',
            clickable:true,
          },
          navigation:{
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev',
          }
    })
        })
      }
    }
  }
};
</script>

<style>
</style>