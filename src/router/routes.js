//路由懒加载
//当路由被访问时才加载对应组件

export default [{
        //重定向，项目跑起来时访问/ 立马定向到home页
        path: '*',
        redirect: "/home"
    },
    {
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        meta: { show: true },
    },
    {
        path: '/search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
        meta: { show: true },
        name: 'search',
        //props传参 布尔值 params参数作为路由组件身上的属性
        // props: true
        //对象写法
        // props: { a: 1, b: 2 }
        //函数写法
        // props: ($route) => {
        //     return {
        //         keyword: $route.params.keyword,
        //         k: $route.query.k
        //     }
        // }
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false },
    },
    {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false },
    },
    {
        name: 'detail',
        path: '/detail/:skuId?',
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true },
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true },
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true },
    },
    {
        name: 'register',
        path: '/register',
        component: () =>
            import ('@/pages/Home'),
        meta: { show: false },
    },
    {
        name: 'login',
        path: '/login',
        component: () =>
            import ('@/pages/Home'),
        meta: { show: false },
    },
    {
        name: 'trade',
        path: '/trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                //从哪来回哪去
                next(false);
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                //从哪来回哪去
                next(false);
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: true },
    },
    {
        name: 'center',
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        children: [{
                name: 'myorder',
                path: 'myorder',
                component: () =>
                    import ('@/pages/Center/MyOrder'),
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: () =>
                    import ('@/pages/Center/GroupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder',
            }
        ]
    },
]