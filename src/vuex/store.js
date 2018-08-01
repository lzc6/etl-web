import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);



export default new Vuex.Store({
    state: {
        loginstate: 0,
        name:'', 
        gh:'',
        depflag: ''
    },
    mutations: {
        login (state,pare) {
            sessionStorage.setItem("name",pare.name);
            sessionStorage.setItem("gh",pare.gh);
            sessionStorage.setItem("isLogin",true);
            sessionStorage.setItem("depflag",pare.depflag);
            state.name = pare.name;
            state.gh = pare.gh;
            state.depflag = pare.depflag;
            state.isLogin = true;
        },
        checklog(state){
             var name = sessionStorage.getItem('name');
             var gh = sessionStorage.getItem('gh');
             var depflag = sessionStorage.getItem('depflag');
            state.name = name;
            state.gh = gh;
            state.depflag = depflag;
            state.isLogin = true;
        },
        logout (state) {
            state.loginstate = 0 
        }
        // name (state,name){
        //     state.name = name
        // },
        // gh (state,gh) {
        //     state.gh = gh
        // }
    }
})