/**
 * 目标：基于 http 模块创建 Web 服务程序
 *  1.1 加载 http 模块，创建 Web 服务对象
 *  1.2 监听 request 请求事件，设置响应头和响应体
 *  1.3 配置端口号并启动 Web 服务
 *  1.4 浏览器请求（http://localhost:3000）测试
 */
// URL端口号：http://hmajax.itheima.net:80/api/province，
//          协议        域名           端口号    资源路径
//  :80就是端口号， 标记服务器里不同功能的服务程序，可用来访问不同功能
// 端口号范围0~65535，  0~1023被系统程序占用

//http协议默认访问80端口
//URL：统一资源定位器，访问服务器里的资源

// 1.1 加载 http 模块，创建 Web 服务对象
const http = require('http')
const server = http.createServer();

// 1.2 监听 request 请求事件，设置响应头和响应体
server.on('request', (req, res) => {
  //req接受发过来的请求的参数

  //设置响应头-内容类型-普通文本-中文编码格式
  res.setHeader('Content-Type', 'text/plain;character=utf-8')

  //设置响应体内容，结束本次请求和响应
  res.end('欢迎啊')
})

// 1.3 配置端口号并启动 Web 服务
server.listen(3000, () => {
  console.log('服务启动成功');

})

//ctrl+c结束进程，这个进程是一直持续进行的
//浏览器打开输入http://localhost:3000就能看见