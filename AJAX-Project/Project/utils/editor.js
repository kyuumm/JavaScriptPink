// 富文本编辑器
// 创建编辑器函数，创建工具栏函数
const { createEditor, createToolbar } = window.wangEditor

//编辑器配置对象
const editorConfig = {
  //占位提示文字
  placeholder: 'Type here...',
  onChange(editor) {
    //获取富文本内容
    const html = editor.getHtml()
    console.log('editor content', html)
    // 也可以同步到 <textarea>
    //收集表单内容
    document.querySelector('.publish-content').value = html
    //获取的文本内容
    // 在<textarea name="content" class="publish-content"></textarea>
    //属性默认是hidden
  },
}

//创建编辑器
const editor = createEditor({
  //创建的位置
  selector: '#editor-container',
  html: '<p><br></p>',
  //默认内容
  config: editorConfig,
  //配置集成模式，可看文档
  mode: 'default', // or 'simple'
})

//工具栏配置对象
const toolbarConfig = {}

//创建工具栏
const toolbar = createToolbar({
  //为指定编辑器创建工具栏
  editor,
  //工具栏创建位置，其余同上
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default', // or 'simple'
})