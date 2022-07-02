import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push和replace
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve, reject) {
        //call参数逗号隔开，apply参数用数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve, reject) {
        //call参数逗号隔开，apply参数用数组
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

let router = new VueRouter({
        routes,
        //滚动行为
        scrollBehavior(to, from, savePosition) {
            return { y: 0 }; //滚动条在最顶部
        }
    })
    //全局前置守卫
router.beforeEach(async(to, from, next) => {
    next();
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        if (to.path == '/login') {
            next();
        } else {
            if (name)
                next();
            else {
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //可能token信息失效 重新登录
                    await store.dispatch('userLogout');
                    alert('身份信息失效，请重新登录！');
                    next('/login');
                }
            }
        }
    } else {
        let toPath = to.path;
        console.log(to);
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
})

export default router;