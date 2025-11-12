/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */

axios({
  url: 'http://hmajax.itheima.net/api/province',
  method: "GET",
}).then(result => {
  console.log(result.data.list);

  const list = result.data.list;
  const provinceList = list.map(item => {
    return `
<option value="${item}">${item}</option>
`
  }).join('')
  document.querySelector('.province').innerHTML += provinceList
})

document.querySelector('.province').addEventListener('change', async (e) => {
  const result = await axios({
    url: 'http://hmajax.itheima.net/api/city',
    params: { pname: e.target.value }
  })
  const list = result.data.list;
  const provinceList = list.map(item => {
    return `
  <option value="${item}">${item}</option>
  `
  }).join('')
  document.querySelector('.city').innerHTML += provinceList

  console.log(result);

  //清空地区数据（当上次还有遗留数据的时候，点击切换城市，地区列表恢复原状）
  document.querySelector('.area').innerHTML = '<option value="">地区</option>'

})
document.querySelector('.city').addEventListener('change', async (e) => {
  const province = document.querySelector('.province').value
  const result = await axios({
    url: 'http://hmajax.itheima.net/api/area',
    params: { pname: province, cname: e.target.value }
  })

  const list = result.data.list;
  const areaList = list.map(item => {
    return `
  <option value="${item}">${item}</option>
  `
  }).join('')
  document.querySelector('.area').innerHTML += areaList

  console.log(result);

})

document.querySelector('.btn-secondary').addEventListener('click', async () => {
  const form = document.querySelector('.info-form')
  //serialize收集表单数据
  const data = serialize(form, { hash: true, empty: true })

  console.log(data);
  console.log('1');


  //axios提交保存，显示结果
  try {
    const result = await axios({
      url: 'http://hmajax.itheima.net/api/feedback',
      method: 'POST',
      data
    })
    // params: {
    //   province: data.province,
    //   city: data.city,
    //   area: data.area,
    //   nickname: data.nickname,
    //   feedback: data.feedback
    // }
    //收集的对象和接口文档参数名一样
    console.log('2');

    console.log(result);
    form.reset();
  } catch (error) {
    console.dir(error);
    alert(error.response.data.message)
  }


  // alert(result.data.message)
})
