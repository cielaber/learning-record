import {roleListReq} from "../../utils/request"

const state ={
    roleList:[]
}

const mutations ={
    changeList(state,list){
        state.roleList = list;
    }
}

const actions = {
    reqListAction(context){
        roleListReq().then((res)=>{
            let list=res.data.list?res.data.list:[];
            context.commit("changeList",list)
        })
    }
}

const getters={
    roleList(state){
        return state.roleList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}