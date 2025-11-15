// axios 公共配置
// 基地址
//作用：提取公共前缀地址，
axios.defaults.baseURL = 'http://geek.itheima.net'

// 添加请求拦截器****************************************
//请求拦截器：拦截 “出去的请求”，在请求发送前执行
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //在请求发起之前触发的配置函数，对请求参数进行额外配置
  //核心功能是：给所有请求自动添加身份令牌（token），让后端知道 “谁在发请求”

  //统一携带token令牌字符串在请求头上
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = `Bearer ${token}`)
  //如果存在token 就把他添加到请求头的Authorization字段中，
  //格式Bearer xxx 这个是后端约定的
  return config;
  //把处理后的配置返回，让请求继续发送
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


//有了拦截器后，所有请求会自动带上 token，
// 省去了重复代码，也保证了身份验证的统一性


// 添加响应拦截器***************************************
//响应拦截器：拦截 “回来的响应”，在响应到达业务代码前执行。
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  //
  //axios直接接受服务器返回的响应结果，不用再写data.data
  const result = response.data
  return result;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  // 对401处理,token失效
  //token由前端判断有无，后端判断有效性

  //?. 是可选链操作符，避免因为中间某个属性不存在而抛出错误
  //这种写法等价于传统的嵌套判断：
  // error && error.response && error.response.status
  //只有当error和error.response都存在的时候，才会继续访问status
  if (error?.response?.status === 401) {
    alert('身份验证失败')
    localStorage.clear()
    location.href = '../login/index.html'
  }
  console.log(error);


  return Promise.reject(error);
});

//响应回到then/catch之前，触发的拦截函数，对响应结果统一处理