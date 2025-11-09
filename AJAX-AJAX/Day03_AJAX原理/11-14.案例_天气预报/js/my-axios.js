/* function myAxios(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (config.params) {
      const paramsObj = new URLSearchParams(config.params)
      const queryString = paramsObj.toString()
      config.url += `?${queryString}`
    }
    xhr.open(config.method || 'GET', config.url)
    xhr.addEventListener('loadend', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject(new Error(xhr.response))
      }
    })
    if (config.data) {
      const jsonStr = JSON.stringify(config.data)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(jsonStr)
    } else {
      xhr.send()
    }
  })
}
 */

function myAxios(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    //查询data
    if (config.params) {
      const newP = new URLSearchParams(config.params);
      const newP2 = newP.toString();
      config.url += `?${newP2}`;
    }
    xhr.open(config.method || 'GET', config.url)

    xhr.addEventListener('loadend', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        //传入的是对象，把json转对象
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.response))
      }

    })

    //上传data
    if (config.data) {
      //对象转json
      const dataSend = JSON.stringify(config.data);
      xhr.setRequestHeader('Content-type', 'application/json')
      xhr.send(dataSend)
    } else {
      xhr.send()
    }
  })
}