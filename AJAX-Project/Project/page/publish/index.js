/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
async function setChannelList() {
  const res = await axios({
    url: '/v1_0/channels'
  })
  console.log(res);

  const htmlStr = `<option value="" selected="">请选择文章频道</option>` + res.data.channels.map(item =>
    `<option value="${item.id}">${item.name}</option>
    `).join('')

  //map使用大括号时候需要return显式返回值，否则去掉大括号隐式返回
  document.querySelector('.form-select').innerHTML = htmlStr
}

setChannelList()
/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */

//   <label for="img">封面：</label>
// < label for= "img" class= "place" > +</label >
//   <input class="img-file" type="file" name="img" id="img" hidden="">
//     <img class="rounded"></img>
//label：点击这个 <label> 时，会触发被关联表单元素的默认行为。因为label有for，和input的id值一样
//为什么？因为原生input不好修改样式
document.querySelector('.img-file').addEventListener('change', async e => {

  const file = e.target.files[0]

  if (file) {
    //这个有点忘了↓
    const fd = new FormData();
    fd.append('image', file);
    const res = await axios({ url: '/v1_0/upload', method: 'POST', data: fd })

    const imgURL = res.data.url;
    document.querySelector('.rounded').src = imgURL;
    document.querySelector('.rounded').classList.add('show');
    document.querySelector('.place').classList.add('hide');

  } else {
    return
  }

})

document.querySelector('.rounded').addEventListener('click', e => {
  //模拟点击用click
  document.querySelector('.img-file').click()
})
/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector('.send').addEventListener('click', async e => {
  const form = document.querySelector('.art-form')
  const data = serialize(form, { hash: true, empty: true })

  delete data.id
  //发布文章不需要id属性，id是为了后续编辑使用的
  //收集封面
  data.cover = {
    type: 1,//封面类型（后端给的）
    images: [document.querySelector('.rounded').src]
  }

  try {
    const res = await axios({
      url: '/v1_0/mp/articles',
      method: 'POST',
      data: data
    })
    console.log(res);
    myAlert(true, '发布成功')
    form.reset();//只能清空表单元素
    //封面手动重置
    document.querySelector('.rounded').src = '';
    document.querySelector('.rounded').classList.remove('show');
    document.querySelector('.place').classList.remove('hide');
    //富文本编辑器重置
    editor.setHtml();


    setTimeout(() => {
      location.href = '../content/index.html'
    }, 1500)
  } catch (error) {
    console.log(error);
    myAlert(false, error.response.data.message)

  }
})
/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */