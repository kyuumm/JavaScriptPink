/**
 * 目标：在 Node.js 环境的代码中，应使用绝对路径
 * 原因：代码的相对路径是以终端所在文件夹为起点，而不是 Vscode 资源管理器
 *  容易造成目标文件找不到的错误
 */
const fs = require('fs')
// 1. 引入 path 模块对象
const path = require('path')
// 2. 调用 path.join() 配合 __dirname 组成目标文件的绝对路径
console.log(__dirname)

fs.readFile(path.join(__dirname, '../test.txt'), (err, data) => {
  if (err) console.log(err)
  else console.log(data.toString())
})
//__dirname是这个js文件所在的位置
//D:\Project\javascript\03
//  ..\test.txt   test这个文件在03文件夹外，在javascript内
//path.join把路径拼接在一起

//path.join 和 join不是一个东西，
//path.join专门拼接路径，自动处理/ 和\，处理..\相对路径操作