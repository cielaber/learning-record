import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"

Vue.use(VueRouter)

//路由独享守卫
//通过判断用户信息中是否包含目标地址，从而进行拦截
function checkedEnter(url,next){
  let menus_url = store.state.userInfo.menus_url;
  if(menus_url.includes(url)){
    next();
  }else{
    next("/")
  }
}

export const indexRoutes = [
  {
    path:"menu",
    component:()=>import("../views/menu/menu.vue"),
    name:"菜单管理",
    beforeEnter(to,from,next){
      checkedEnter("/menu",next)
    }
  },
  {
    path:"manage",
    component:()=>import("../views/manage/manage.vue"),
    name:"管理员管理",
    beforeEnter(to,from,next){
      checkedEnter("/manage",next)
    }
  },
  {
    path:"role",
    component:()=>import("../views/role/role.vue"),
    name:"角色管理",
    beforeEnter(to,from,next){
      checkedEnter("/role",next)
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path:"/login",
      component:()=>import("../views/login/login.vue")
    },{
      path:"/",
      component:()=>import("../views/index/index.vue"),
      children:[
        {
          path:'',
          component:()=>import("../views/menu/menu.vue")
        },
        ...indexRoutes
      ]
    }
  ]
})

//路由守卫，进行未登录用户拦截
router.beforeEach((to,form,next)=>{
  if(to.path == "/login"){//前往登录页不拦截
    next();
    return;
  }

  if(store.state.userInfo.token){//用户已登录不拦截
    next();
    return;
  }

  next("/login");//都不满足则前往登录页
  
})

export default router
