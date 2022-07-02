import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
// home模块的小仓库
const state = {
    catagoryList: [],
    bannerList: [],
    floorList: []
};

const actions = {
    async catagoryList(context) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            context.commit('CATEGORYLIST', result.data);
        }
    },
    async getBannerList(context) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            context.commit('GETBANNERLIST', result.data);
        }
    },
    async getfloorList(context) {
        let result = await reqFloorList();
        if (result.code === 200) {
            context.commit('GETFLOORLIST', result.data);
        }
    }
};

const mutations = {
    CATEGORYLIST(state, catagoryList) {
        catagoryList.pop();
        state.catagoryList = catagoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};

const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}