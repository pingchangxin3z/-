import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'

const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {},
};

const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取失败'));
        }
    },
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            localStorage.setItem('TOKEN', result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('USERINFO', result.data);
        }
    },
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit('CLEAR');
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
};

const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem('TOKEN');
    }
};
//主要作用:简化仓库中的数据
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}