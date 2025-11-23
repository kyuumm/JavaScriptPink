/**
 * 目标：基于 CommonJS 标准语法，导入工具属性和方法使用
 */

const obj = require('./utils.js')
console.log(obj);
const result = obj.arraySum([1, 2, 3])
console.log(result);
//不知道为什么vscode提交不显示记录
