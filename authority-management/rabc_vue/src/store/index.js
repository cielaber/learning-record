import Vue from 'vue'
import Vuex from 'vuex'

import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : {}
  },
  mutations: {
    changeUserInfo(state, info) {
      state.userInfo = info;
      // 由于状态层刷新，数据没有了，但是希望登录数据还在，所以存储在本地存储中
      // console.log(info)
      if (info.id) { //如果不是空对象，则表示登录存储信息
        sessionStorage.setItem("userInfo", JSON.stringify(info))
      } else { //如果是一个空对象则表示退出登录，则删除用户信息
        sessionStorage.removeItem("userInfo")
      }
    },
  },
  actions: {
    changeUserInfoAction(context, info) {
      context.commit("changeUserInfo", info)
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
  },
  modules: {
    menu,
    role,
    manage,
  }
})