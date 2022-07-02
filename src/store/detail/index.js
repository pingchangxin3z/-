import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'

const state = {
    goodsInfo: {},
};

const actions = {
    async goodsInfo(context, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            context.commit('GOODSINFO', result.data);
        }
    },
    async addToShopCart(context, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // console.log(context);
        if (result.code == 200)
            return 'ok';
        else
            return Promise.reject(new Error('fail'));
    },

};

const mutations = {
    GOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    },
};
//简化数据
const getters = {
    categoryView(state) {
        //加上||{} 避免返回undefined
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || [];
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}