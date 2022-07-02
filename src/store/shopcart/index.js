import { reqCartList, reqDeleteCartById, reqUpdateChecked } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
    cartList: [],
    //游客临时身份
    uuid_token: getUUID(),
};

const actions = {
    async getCartList({ commit }, params = {}) {
        let result = await reqCartList(params);
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('删除出错'));
        }
    },
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    deleteAllCheckedCart(context) {
        let promiseAll = [];
        context.getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? context.dispatch('deleteCartList', item.skuId) : '';
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll);
    },
    updateCheckedAll(context, isChecked) {
        let promiseAll = [];
        context.state.cartList[0].cartInfoList.forEach(item => {
            let promise = context.dispatch('updateChecked', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll);
    }
};

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
//主要作用:简化仓库中的数据
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}