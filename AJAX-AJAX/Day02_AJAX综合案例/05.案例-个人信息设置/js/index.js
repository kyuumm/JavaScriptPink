/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '播仔'
axios({
  url: 'http://hmajax.itheima.net/api/settings',
  method: 'GET',
  params: {
    creator: creator
  }
}).then(result => {
  const userObj = result.data.data;
  Object.keys(userObj).forEach(key => {
    if (key == 'avatar') {
      document.querySelector('.prew').src = userObj[key]
    } else if (key === 'gender') {
      const female = document.querySelectorAll('.gender');
      female[userObj[key]].checked = true;
    } else {
      document.querySelector(`.${key}`).value = userObj[key];
      //注意， 表单元素（input，下拉框）用value获取或者输出值，
      //普通元素用textContent（纯文字），或者innerHTML（带有HTML结构）
    }
  })
})

document.querySelector('.upload').addEventListener('change', (e) => {
  const fd = new FormData;
  console.log(e.target.files[0]);

  fd.append('avatar', e.target.files[0]);
  fd.append('creator', creator)

  axios({
    url: 'http://hmajax.itheima.net/api/avatar',
    method: 'PUT',
    data: fd
  }).then(result => {
    const imgUrl = result.data.data.avatar;

    console.log(imgUrl);
    document.querySelector('.prew').src = imgUrl;
  })
})

document.querySelector('.submit').addEventListener('click', () => {
  const userForm = document.querySelector('.user-form');
  const userObj = serialize(userForm, { hash: true, empty: true })

  userObj.creator = creator;

  userObj.gender = + userObj.gender
  //把性别字符串转换为数字
  axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'PUT',
    data: userObj
  }).then(result => {
    console.log(result.data.message);

    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom);
    toast.show();
  })
})
