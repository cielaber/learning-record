# RABC模式权限管理-Vue前端实现



### 步骤

1. 菜单管理将路由页面的indexRoutes形成菜单树形结构。
2. 角色管理形成角色，将菜单中不同页面分配给不同角色。
3. 管理员管理通过不同角色形成具有不同权限的管理员。
4. 登录时后端返回的用户信息包含用户所拥有的权限（即各个页面地址），根据这些地址动态生成侧边栏。
5. 登录时将用户信息存在sessionStorage中，vuex中进行读取放入状态层供项目使用。
6. 为防止通过地址进入没有权限的页面，可通过路由独享守卫，通过判断用户信息中是否包含该页面地址而进行拦截。
7. 路由全局守卫通过用户信息是否存在进行掉线处理。



### 缺点：

使用页面作为权限进行分配，权限分配不够细致。



### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


