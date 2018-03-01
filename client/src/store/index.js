import Vue from 'vue';
/** Vuex **/
import Vuex from 'vuex';
import Auth from '../services/auth.service';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        isAuthenticated: state => {
            return !!state.user;
        },

        getCurrentUser: state => {
            return state.user;
        }
    },
    mutations: {
        login: (state, data) => {
            state.user = data;
        },
        logout: state => {
            state.user = null;
        }
    },
    actions: {
        login: ({ commit }, body) => {
            return Auth.login(body)
            .then(user => {
                commit('login', user);
            })
            .catch(err => {
                console.log(err);
            });
        },

        logout: ({ commit }) => {
            localStorage.removeItem('token');
            commit('logout');
        },

        init: ({commit}) => {
            console.log('initing')
            return Auth.getCurrentUser()
            .then(user => {
                commit('login', user);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
});