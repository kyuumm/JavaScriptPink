/**
 * 目标：基于 CommonJS 标准语法，封装属性和方法并导出
 * 模块化：每个文件都是独立的文件
 * 
 * commonJs导出导入模块module.exports，require
 * 内置模块可以直接写名字，例子fs，path，http
 * 自定义模块写模块文件路径，例子 ./utils.js
 */
// 导入
const baseURL = 'http://hmajax.itheima.net';
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0)

//导出：(名字是自定义的)
module.exports = {
  url: baseURL,
  arraySum: getArraySum
}