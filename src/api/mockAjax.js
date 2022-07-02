//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';

//1.利用axios对象的方法create 去创建一个axios实例
let requests = axios.create({
    baseURL: "/mock",
    timeout: 5000
});
//请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(config => {
    //config：配置对象，对象里面一个属性很重要  headers请求头
    nprogress.start();
    return config;
});

requests.interceptors.response.use(
    (res) => {
        //进度条结束
        nprogress.done();
        //相应成功做的事情
        return res.data;
    },
    () => {
        alert("服务器响应数据失败");
    }
);
//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests;