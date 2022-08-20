import { createRouter, createWebHashHistory } from 'vue-router'

//组件
import Home from '../page/Home/Home.vue';
const routes=[
    {
        path:"/",   //不写/
        component:Home,
    },
    {
        path:"/home",
        component:()=>import('../page/Home/Home.vue'),
    },
    {
        path:"/carList",
        component:()=>import('../page//carList/CarList.vue'),
    },
    {
        path:"/orderList",
        component:()=>import('../page/orderList/OrderList.vue'),
    },
    {
        path:"/login",
        component:()=>import('../page/login/Login.vue'),
    },
    {
        path:"/register",
        component:()=>import('../page/register/Register.vue'),
    },
    {
        path:"/shop/:id",
        component:()=>import('../page/shop/Shop.vue'),
    },
    
]

const router=createRouter({
    routes,      
    history:createWebHashHistory()    
})

router.beforeEach((to) => {
    if(to.path!=='/login'){   
        const token=window.localStorage.getItem('token')  //获取用户在登录信息
        if(!token){    //如果没有登陆信息，拦截跳转到登陆页
            return '/login'
        }
    }
  })

export default router