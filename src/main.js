import Vue from 'vue'
import App from './App.vue'
//三级联动组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//注册全局组件 第一个参数 组件名字  第二个参数 哪个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

import { Button, MessageBox } from 'element-ui';
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import router from '@/router'
Vue.config.productionTip = false
import store from '@/store'
//引入mockServe.js
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
//将api中所有方法引入
import * as API from '@/api'

import lazy from '@/assets/lazy.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: lazy,
})
import "@/plugins/validate"
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;

    },
    //注册路由
    router,
    store,
}).$mount('#app')