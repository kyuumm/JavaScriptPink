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
          <td data-id=${item.id}>
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

//图书提交POST***************************************************
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
//图书删除***************************************************
document.querySelector('.list').addEventListener('click', e => {
  if (e.target.classList.contains('del')) {
    // 获取id

    //review:  parentNode获取母集属性
    const theId = e.target.parentNode.dataset.id;
    console.log(theId);

    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`,
      method: 'DELETE'
    }).then(() => {
      getBooksList()
    })
  }
})

const editDom = document.querySelector('.edit-modal');
const editModal = new bootstrap.Modal(editDom);//弹框本框

//图书修改弹窗&数据回写***************************************************
document.querySelector('.list').addEventListener('click', e => {
  //打开弹窗&数据回写
  if (e.target.classList.contains('edit')) {
    editModal.show();
    const theId = e.target.parentNode.dataset.id;
    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`
    }).then(result => {
      const bookObj = result.data.data;
      //数据对象属性和标签类名相同，采用遍历的方法，利用属性获取标签，赋值
      const keys = Object.keys(bookObj)
      keys.forEach(key => {
        document.querySelector(`.edit-form .${key}`).value = bookObj[key];
      });
    })


  }
})
//图书修改***************************************************
document.querySelector('.edit-btn').addEventListener('click', () => {

  //收集表单数据
  const editForm = document.querySelector('.edit-form')
  const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true });

  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`,
    method: 'PUT',//修改图书方法
    data: {
      bookname,
      author,
      publisher,
      creator
    }
  }).then(result => {
    getBooksList();

    editForm.reset();

    getBooksList();
    editModal.hide();
  })

})