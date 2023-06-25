import Vue from 'vue'
import axios from 'axios'
import qs from "qs"

import store from "../store"


// Vue.prototype.$imgPre = "http://u_back.eternitywith.xyz:3000"

let baseUrl = "http://u_back.eternitywith.xyz:3000"


//请求拦截，每次请求时带上token
axios.interceptors.request.use(req=>{
    //登录不拦截
    if(req.url !==baseUrl+"/api/login"){
        req.headers.authorization = store.state.userInfo.token;
    }
    return req;
})

//响应拦截
// axios.interceptors.response.use(res=>{
//     console.group("=====本次请求路径是："+res.config.url);
//     console.log(res);
//     console.groupEnd();
//     return res;
// })

//---------菜单管理
//菜单添加
export const menuAddReq=(data)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(data)
    })
}

//获取菜单列表
export const menuListReq=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}

//删除菜单
export const menuDelReq=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:'post',
        data:qs.stringify({id})
    })
}

//获取一条菜单数据
export const menuInfoReq=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id
        }
    })
}

//修改菜单
export const menuUpdateReq=(data)=>{
    return axios({
        url: baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(data)
    })
}

//---------角色管理
//角色添加
export const roleAddReq=(data)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:'post',
        data:qs.stringify(data)
    })
}

//角色列表
export const roleListReq=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:'get',
    })
}

//获取一条角色信息
export const roleInfoReq=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:'get',
        params:{
            id
        }
    })
}

//角色修改
export const roleEditReq=(data)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(data)
    })
}

//角色删除
export const roleDelReq=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:{
            id
        }
    })
}


// -----------管理员管理
//管理员添加
export const userAddReq=(data)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(data)
    })
}

//管理员总数
export const userCountReq=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}

//获取管理员列表（分页）
export const userListReq=(data)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:data
    })
}

//删除管理员
export const userDelReq=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:'post',
        data:qs.stringify({uid})
    })
}

//获取一条管理员数据
export const userInfoReq=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid
        }
    })
}

//修改管理员
export const userUpdateReq=(data)=>{
    return axios({
        url: baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(data)
    })
}

//管理员登录
export const userLoginReq=(data)=>{
    return axios({
        url:baseUrl+"/api/userLogin",
        method:"post",
        data:qs.stringify(data)
    })
}

