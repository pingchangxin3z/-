import Mock from 'mockjs'

//图片、json数据格式 默认对外暴露
import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页大的轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });