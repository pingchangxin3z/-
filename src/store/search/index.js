import { reqSearchList } from '@/api'
// search模块的小仓库
const state = {
    searchList: {}
};

const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchList(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};

const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
//主要作用:简化仓库中的数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}