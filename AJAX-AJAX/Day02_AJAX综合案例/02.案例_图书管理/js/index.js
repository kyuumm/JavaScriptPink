/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
//封装这个函数
const creator = 'AAA'
function getBooksList() {
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'GET',
    params: {
      creator: creator
      // creator，在服务器查询相应的代码，这里是随便的
    }

  }).then(result => {
    const booksList = result.data.data;
    console.log(booksList);

    //渲染数据
    const str = booksList.map((item, index) => {
      return `
  <tr>
          <td>${index + 1}</td>
          <td>${item.bookname}</td>
          <td>${item.author}</td>
          <td>${item.publisher}</td>
          <td>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>`
    }).join('');

    document.querySelector('.list').innerHTML = str;

  })
}
//网页加载后调用第一次
getBooksList()

// 2
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)

//点击保存按钮后隐藏弹框
document.querySelector('.add-btn').addEventListener('click', () => {
  //收集表单数据
  const addForm = document.querySelector('.add-form')
  const bookObj = serialize(addForm, { hash: true, empty: true });
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'POST',
    data: {
      ...bookObj,
      creator
    }
  }).then(result => {
    console.log(result)
    console.log(result.data.message)
    getBooksList();

    addForm.reset();
    addModal.hide();
  })


})
