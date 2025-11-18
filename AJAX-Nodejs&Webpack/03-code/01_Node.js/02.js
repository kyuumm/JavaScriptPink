/**
 * 目标：基于 fs 模块读写文件内容
 *  1. 加载 fs 模块对象
 *  2. 写入文件内容
 *  3. 读取文件内容
 */
// 1. 加载 fs 模块对象
const fs = require('fs')
// 2. 写入文件内容
fs.writeFile('./test.txt', 'hello en', (err) => {
  if (err) {
    console.log(err);
  }
  else console.log('success');
})
//写错了，写的是write，
// fs.write(fd, buffer, callback) 
// 需要先通过 fs.open() 获取文件描述符（数字），再传入 fd 参数。

//正确的语法 fs.writeFile('路径', content, callback)

// 3. 读取文件内容
//fs.readFile('路径', (err, buffer数据流对象data是16禁止的) => {
fs.readFile('./test.txt', (err, data) => {
  if (err) console.log(err)
  else console.log(data.toString());
  //data是buffer 16进制显示的
  //可以用toString()转换字符串正常显示


})
//fs模块：读写文件，
// 模块：类似插件，封装了方法和属性
// fs模块 ：封装； 与本机文件系统交互的方法/属性