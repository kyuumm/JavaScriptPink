/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */
//这个数组像一个小型数据库，所有函数的功能依靠这个数组来判断
const queryObj = {
  status: '',//文章状态，1 待审，2审核通过
  channel_id: '',//文章频道 id ：空字符串
  page: 1,//当前页面
  per_page: 2//当前页面条数
}

let totalCount = 0 //总条数

//封装的设置文章列表函数
async function setArticleList() {
  const res = await axios({
    url: '/v1_0/mp/articles',
    params: queryObj
  })
  console.log(res);

  const htmlStr = res.data.results.map(item => {
    return `
    <tr>
                <td>
                  <img src="${item.cover.type === 0 ? 'https://img2.baidu.com/it/u=2640406343,1419332367&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=708&amp;h=500' : item.cover.images[0]} alt = "" >
                </td >
                <td>${item.title}</td>
                <td>
                ${item.status === 1 ? `<span class="badge text-bg-success">待审核</span>` : `<span class="badge text-bg-primary">审核通过</span>`}
                </td>
                <td>
                  <span>${item.pubdate}</span>
                </td>
                <td>
                  <span>${item.read_count}</span>
                </td>
                <td>
                  <span>${item.comment_count}</span>
                </td>
                <td>
                  <span>${item.like_count}</span>
                </td>
                <td data-id=${item.id}>
                  <i class="bi bi-pencil-square edit"></i>
                  <i class="bi bi-trash3 del"></i>
                </td>
              </tr > `
  }).join('')

  document.querySelector('.art-list').innerHTML = htmlStr

  totalCount = res.data.total_count
  document.querySelector('.total-count').innerHTML = `共${totalCount}条`


  document.querySelector('.page-now ').innerHTML = `第${queryObj.page}页`
}
setArticleList();
/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 * 
 **/

//设置下拉频道列表（从服务器获取）
async function setChannelList() {
  const res = await axios({
    url: '/v1_0/channels'
  })
  // console.log(res);

  const htmlStr = `<option value="" selected="">请选择文章频道</option>` + res.data.channels.map(item =>
    `<option value="${item.id}">${item.name}</option>
    `).join('')

  //map使用大括号时候需要return显式返回值，否则去掉大括号隐式返回
  document.querySelector('.form-select').innerHTML = htmlStr
}

setChannelList()

//  *  2.2 监听筛选条件改变，保存查询信息到查询参数对象数组

document.querySelectorAll('.form-check-input').forEach(element => {
  element.addEventListener('change', e => {
    queryObj.status = e.target.value
    //为什么要分开写？如果点击了审核，但是直接点击筛选/下一页，也会按要求更新列表
    //如果不分开写，点击下一页的时候，因为筛选才会获取status，所以页面不会按要求筛选
  })

});

document.querySelector('.form-select').addEventListener('change', e => {
  queryObj.channel_id = e.target.value
})

//  *  2.3 点击筛选时，传递查询参数对象到服务器
//  *  2.4 获取匹配数据，覆盖到页面展示
document.querySelector('.sel-btn').addEventListener('click', e => {
  queryObj.page = 1
  //筛选的时候页面设置为1，要不然会超出范围没法显示
  setArticleList();

})

/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */

document.querySelector('.next').addEventListener('click', e => {
  if (queryObj.page < Math.ceil(totalCount / queryObj.per_page)) {
    queryObj.page++;
    setArticleList();
  }
})
document.querySelector('.last').addEventListener('click', e => {
  if (queryObj.page > 1) {
    queryObj.page--;
    setArticleList();
  }
})

/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */

// document.querySelectorAll('del').forEach(item => item.addEventListener('click', e => {

// }))
//为什么不这样写？因为页面生成的时候这个函数立即执行，但是文章列表还没有获得，绑定的是空的
//而给亲元素绑定，亲元素静态存在，可以直接绑

document.querySelector('.art-list').addEventListener('click', async e => {
  if (e.target.classList.contains('del')) {
    const delId = e.target.parentNode.dataset.id
    const res = await axios({
      url: `v1_0/mp/articles/${delId}`,
      method: 'DELETE'
    })
    //bug 一页只有一个元素，删除之后空白，不能往前显示之前的元素
    //检查现在的孩子个数
    const children = document.querySelector('.art-list').children
    if (queryObj.page !== 1 && children.length === 1) { }
    queryObj.page--;
  }
  setArticleList()
})

document.querySelector('.art-list').addEventListener('click', async e => {
  if (e.target.classList.contains('edit')) {
    const editId = e.target.parentNode.dataset.id
    location.href = `../publish/index.html?id=${editId}`

  }
  // 回到发布文章的js
})

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去

