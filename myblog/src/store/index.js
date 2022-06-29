import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { gettotal,getallcomment,getuserinfo  } from '../api/index'

export default new Vuex.Store({
  state: {
    total:0,
    comment:0,
    userinfo: JSON.parse(sessionStorage.getItem('userinfo')) || {},
    login:false,
  },
  getters: {
    getuserinfo(state){
       return state.userinfo
    }
  },
  mutations: {
    changetotal(state,total){
      // console.log(total.message.total);
      state.total = total.message.total;
      console.log(state.total);
    },
    initcomment(state,comment){
      // console.log(total.message.total);
      state.comment = comment.message.total;
    },
    userinfo(state,user){
      state.userinfo = user.message[0]
      console.log(user.message[0]);
      sessionStorage.setItem('userinfo', JSON.stringify(user.message[0]));
      console.log(state.userinfo);
    },
    inituserinfo(state){
      state.userinfo = {};
    },
    changelogin(state,flag){
      state.login = flag;
      console.log(state.login);
    },
  },
  actions: {
    async total(context){
      const result = await gettotal();
      context.commit('changetotal',result);
    },
    async allcomment(context){
      const result = await getallcomment();
      context.commit('initcomment',result);
    },
    async getuserinfo(context,id){
        const result = await getuserinfo({id:id});
        context.commit('userinfo',result);
    },
    changelogin(context,flag){
      context.commit('changelogin',flag);
    }
  },
  modules: {
  }
})
