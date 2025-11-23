//index.js
import { checkPhone, checkCode } from "../utils/check.js";
console.log(checkPhone('12345678910'));
console.log(checkCode('123123123123'));
//webpack环境


//编写js代码
document.querySelector('.btn').addEventListener('click', () => {
  const phone = document.querySelector('.login-form [name=mobile]').value
  const code = document.querySelector('.login-form [name=code]').value

  if (!checkPhone(phone)) {
    console.log('手机号长度错');
    return

  }
  if (!checkCode(code)) {
    console.log('验证码长度错');
    return

  }
  console.log('提交到服务器');


})


import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'//不用from,webpack自己处理

//css文件可以被浏览器缓存，减少js文件体积

/**
 * 目标8：打包 less 代码
 *  8.1 新建 less 代码（设置背景图）并引入到 src/login/index.js 中
 *  8.2 下载 less 和 less-loader 本地软件包
 *  8.3 配置 webpack.config.js 让 Webpack 拥有功能
 *  8.4 打包后观察效果
 */
// 8.1 新建 less 代码（设置背景图）并引入到 src/login/index.js 中
import './index.less'