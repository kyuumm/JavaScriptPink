/**
 * 目标：导入 utils 软件包，使用里面封装的工具函数
 */
const obj = require('./utils')
const result = obj.getArraySum([1, 2, 3])
console.log(result);
//包：模块，代码，资料聚合的文件夹
//分为项目包 和 软件包
//package.json记录包的名字，入口文件
//导入包默认找的是index.js文件或者main属性指定的文件