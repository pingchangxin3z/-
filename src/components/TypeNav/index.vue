<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(c1, index) in catagoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a 
                :data-categoryName="c1.categoryName"
                :data-category1Id="c1.categoryId"
                >{{c1.categoryName}}</a>
              </h3>
              <div
                class="item-list clearfix"
                v-show="currentIndex == index"
              >
                <!-- 二级分类 -->
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a 
                      :data-categoryName="c2.categoryName"
                      :data-category2Id="c2.categoryId"
                      >{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a 
                        :data-categoryName="c3.categoryName"
                        :data-category3Id="c3.categoryId"
                        >{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true
    };
  },
  mounted() {
    if(this.$route.path != '/home'){
      this.show = false;
    }
  },
  methods: {
    //鼠标进入更改颜色
    //节流
    changeIndex(index) {
      this.currentIndex = index;
    },
    leaveIndex() {
      this.currentIndex = -1;
    },
    goSearch(event) {
      //解构赋值
      let {categoryname, category1id, category2id, category3id} = event.target.dataset;
      if(categoryname){//如果是a标签
        let location = {name: 'search'};
        let query = {categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        }
        else if (category2id) {
          query.category2Id = category2id;
        }
        else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带传递过去
        if (this.$route.params) {//这里永远为真
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
        // push传入一个对象，第一项为name,第二项为一个对象 params/query参数
      }
    },
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != '/home') {  
        this.show = false;
      }
    }
  },
  computed: {
    ...mapState({
      //对象写法 右侧需要一个函数，当使用这个计算属性的时候，右侧函数会执行一次
      //参数state的值为大仓库的数据state
      catagoryList: (state) => {
        return state.home.catagoryList;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              text-decoration: none;
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter,.sort-leave-to{
      opacity: 0;
    }
    .sort-enter-to,.sort-leave{
      opacity: 1;
    }
    .sort-enter-active,.sort-leave-active{
      transition: all .1s linear;
    }
  }
}
</style>