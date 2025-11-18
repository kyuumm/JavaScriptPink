/**
 * 目标1：压缩 html 代码
 * 需求：把回车符 \r，换行符 \n 去掉，写入到新 html 文件中
 *  1.1 读取源 html 文件内容
 *  1.2 正则替换字符串
 *  1.3 写入到新的 html 文件中
 */
// 1.1 读取源 html 文件内容

//混淆了dirname的作用：是运行脚本的时候方便找其他文件
//解决的是 “脚本内部读取其他文件时的路径问题”
//但是终端运行代码还是要在代码本身路径上
const fs = new require('fs')
const path = require('path')
fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
  if (err) console.log(err);
  else {
    console.log(data.toString());
    const htmlStr = data.toString()
    const resultStr = htmlStr.replace(/[\r\n]/g, '')
    console.log(resultStr);

    //写回
    fs.writeFile(path.join(__dirname, 'dist/index.html'), resultStr, err => {
      if (err) console.log(err);
      else {
        console.log('写入成功');

      }

    })
  }
})
