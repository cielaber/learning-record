import {userListReq,userCountReq} from "../../utils/request"
const state = {
    //菜单的list
    userList:[],
    //每页数量
    size:2,
    //总数
    total:0,
    //页码
    page:1,
}

const mutations = {
    //修改list数据
    changeList(state,arr){
        state.userList = arr;
    },
    //修改总数
    changeTotal(state,total){
        state.total = total
    },
    //修改页数
    changePage(state,page){
        state.page = page;
    }
}

const actions ={
    //页面请求
    reqListAction(context){
        userListReq({size:context.state.size,page:context.state.page}).then((res)=>{
            //如果取list的时候，取到null，可能是最后一页，需要减一页在请求
            let list = res.data.list? res.data.list:[];
            if(context.state.page>1 && list.length == 0){
                context.commit("changePage",context.state.page-1);
                context.dispatch("reqListAction");
                return;
            }
            
            //正常情况发起请求
            context.commit("changeList",res.data.list)
        })
    },
    //修改总数
    reqTotalAction(context){
        userCountReq().then((res)=>{
            context.commit("changeTotal",res.data.list[0].total);
        })
    },
    //修改页码
    reqPageAction(context,page){
        //改变页码
        context.commit("changePage",page);
        //重新请求
        context.dispatch("reqListAction");
    }
}

const getters = {
    userList(state){
        return state.userList
    },
    size(state){
        return state.size
    },
    total(state){
        return state.total
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}