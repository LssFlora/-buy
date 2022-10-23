// 引入路由组件
import Home from "@/pages/Home"
// import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from '@/pages/AddCartSuccess'
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import MyOrder from "@/pages/Center/MyOrder"
import GroupOrder from "@/pages/Center/GroupOrder"


export default [
    {
        path: "/home",
        component: Home,
        meta: {
            isFooterShow: true
        }
    },
    {
        name: 'search',
        path: "/search/:keyWord?",
        component: () => import('@/pages/Search'),
        meta: {
            isFooterShow: true
        }
    },
    {
        path: "/item/:skuId",
        component: Detail,
        meta: {
            isFooterShow: true
        }
    },
    {
        name: "cart",
        path: "/cart",
        component: ShopCart,
        meta: {
            isFooterShow: true
        }
    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: {
            isFooterShow: true
        }
    },
    {
        path: "/login",
        component: Login,
        meta: {
            isFooterShow: false
        }
    }, {
        path: "/register",
        component: Register,
        meta: {
            isFooterShow: false
        }
    }, {
        path: "/trade",
        component: Trade,
        meta: {
            isFooterShow: false
        },
        beforeEnter: (to, from, next) => {
            // reject the navigation
            if (from.path == "/cart") {
                next();
            } else {
                next(false)//指若不是则停留到当前
            }
        },
    }, {
        path: "/pay",
        component: Pay,
        meta: {
            isFooterShow: false
        },
        beforeEnter: (to, from, next) => {
            // reject the navigation
            if (from.path == "/trade") {
                next();
            } else {
                next(false)//指若不是则停留到当前
            }
        },
    }, {
        path: "/paysuccess",
        component: PaySuccess,
        meta: {
            isFooterShow: false
        },
        beforeEnter: (to, from, next) => {
            // reject the navigation
            if (from.path == "/pay") {
                next();
            } else {
                next(false)//指若不是则停留到当前
            }
        },
    }, {
        path: "/center",
        component: Center,
        meta: {
            isFooterShow: false
        },
        children: [
            {
                path: 'myorder',
                component: MyOrder,
                meta: {
                    isFooterShow: false
                },
            },
            {
                path: 'grouporder',
                component: GroupOrder,
                meta: {
                    isFooterShow: false
                },
            },
        ]
    },
    // 页面重定向，项目跑起来时，访问/立马回到首页
    {
        path: "/",
        redirect: "/home"
    }
]