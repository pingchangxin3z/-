import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
    address: [],
    orderInfo: {},
};

const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取地址失败'));
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取商品失败'));
        }
    },

};

const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
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