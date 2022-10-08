import {menuListReq} from "../../utils/request"
const state = {
    //菜单的list
    list:[]
}

const mutations = {
    //修改list数据
    changeList(state,arr){
        state.list = arr;
    }
}

const actions ={
    //页面请求
    reqListAction(context){
        menuListReq().then((res)=>{
            //发起请求
            context.commit("changeList",res.data.list)
        })
    }
}

const getters = {
    list(state){
        return state.list;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}