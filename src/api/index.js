import requests from "./request";
import mockRequests from "./mockAjax";

export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner");
//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");
//获取搜索数据 参数至少是一个空对象
export const reqSearchList = (params) => requests({ url: '/list', method: 'post', data: params });

export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

export const reqCartList = () => requests({ url: `/cart/cartList`, method: 'get' });
//删除购物车商品
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
//修改商品状态
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data })

export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, method: 'post', data })

export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });