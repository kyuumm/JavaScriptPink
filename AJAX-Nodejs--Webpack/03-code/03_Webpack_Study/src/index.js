//webPack打包过程
//项目 & 源代码
import { checkPhone, checkCode } from './utils.js'
console.log(checkPhone('12345678910'));
console.log(checkCode('1234567'));

//webpack打包环境
//在package.json添加这个
//"script" :{ "build" : "webpack"}

//运行自定义命令
//npm run build

