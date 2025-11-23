/**
 * 目标：基于 ECMAScript 标准语法，封装属性和方法并"默认"导出
 */
//node默认支持commonJs
//如果需要使用ECMAScript语法，在运行模块所在文件夹新建package.json文件
//里面写内容
/*
{
"type":"module"
}
json内不允许有注释（好吧！）
*/
const baseURL = 'http://hmajax.itheima.net'
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0)

// 默认导出
export default {
  url: baseURL,
  arraySum: getArraySum
}
//commonjs方法：module.exports={}