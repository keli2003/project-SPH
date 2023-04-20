// 引入mockjs
import Mock from 'mockjs'
// 将JSON格式下的数据引入[JSON数据格式没有对外暴露，但是可以引入]
// webpack默认对外暴露的：图片、JSON格式数据
import banner from './banner.json'
import floor from './floor.json'

// Mock数据：第一个参数是请求的地址、第二个参数是请求的数据

Mock.mock('/mock/banner', { code: 200, data: banner }) //模拟首页轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor }) //模拟首页家用电器的数据



