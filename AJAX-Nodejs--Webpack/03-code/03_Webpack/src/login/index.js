//index.js
import { checkPhone, checkCode } from "../utils/check.js";
console.log(checkPhone('12345678910'));
console.log(checkCode('123123123123'));
//webpack环境


//编写js代码
/* document.querySelector('.btn').addEventListener('click', () => {
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


}) */


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

//js引入本地图片用import方式
//如果是网络图片，字符串可以直接写
import imgObj from './assets/logo.png'
//图片小于8kb
const theImg = document.createElement('img')
theImg.src = imgObj
document.querySelector('.login-wrap').appendChild(theImg)

//axios下载包
//使用封装函数和bootstrap
import myAxios from '../utils/request.js'
import { myAlert } from '../utils/alert.js'
document.querySelector('.btn').addEventListener('click', () => {
  const phone = document.querySelector('.login-form [name=mobile]').value
  const code = document.querySelector('.login-form [name=code]').value

  if (!checkPhone(phone)) {
    myAlert(false, '手机号长度错')
    console.log('手机号长度错');
    return

  }
  if (!checkCode(code)) {
    myAlert(false, '验证码长度错')
    console.log('验证码长度错');
    return

  }

  myAxios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: phone,
      code: code
    }
  }).then(result => {
    myAlert(true, '登录成功')
    console.log('提交到服务器');

  }).catch(error => {
    myAlert(false, error.response.data.message)

  })


})

//webpack-dev-server借助http模块创建8080默认web服务
//默认以public文件夹作为服务器

//实现同一个代码作用不同环境（开发/生产）
if (process.env.NODE_ENV === 'production') {
  console.log = function () { };

}
console.log('development用，production下失效');

//source map

// consolee.warning('123')
//console.warn('right')
//会显示报错的具体位置

//解析别名
import youAxios from '@/utils/request.js'
console.log(youAxios);

//CDN：内容分发网络，一组分布在各个地区的服务器的集合
//把静态资源文件/第三方库放在CDN 网络中各个服务器中，供用户就近请求获取
//减轻服务器请求，物理延迟低
//开发模式用本地第三方库，生产模式用CDN加载引入
