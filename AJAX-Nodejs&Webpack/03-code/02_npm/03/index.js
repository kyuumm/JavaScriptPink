/**
 * 目标：基于 ECMAScript 标准语法，"命名"导入，工具属性和方法使用
 */

/* 
按需加载，用命名导出导入
全部加载用默认导出导入

*/
// 命名导入
import { baseURL, getArraySum } from './utils.js'
console.log(baseURL);
console.log(getArraySum);
console.log(getArraySum([1, 2, 3]));


/* 
commonJs**********************
module.exports={

}
const obj = require('./utils.js')

ECMAScript********************
export default {
  
}

import obj from './utils.js'
命名导入*****************************************
export const baseURL = 'http://hmajax.itheima.net'
export const getArraySum =  xxxxx

import { baseURL, getArraySum } from './utils.js'
*/


