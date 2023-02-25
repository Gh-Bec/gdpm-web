import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    //  公共data
    state: {
        count: 0
    },
    //  公共methods
    mutations: {
        add(state) {
            state.count++
        },
        reduce(state) {
            state.count--
        }
    },
    actions: {},
    modules: {}
})