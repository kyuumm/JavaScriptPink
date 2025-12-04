//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack')


const config = {
  // mode: 'development',
  //有两种，development文件大，有注释，适合调试 ； production文件小，用来专门打包
  entry: {
    'login': path.resolve(__dirname, 'src/login/index.js'),
    'content': path.resolve(__dirname, 'src/content/index.js'),
    'publish': path.resolve(__dirname, 'src/publish/index.js'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: ['./index.html'],      // ⭐ 启动时自动打开 login.html
  },
  //以上配置告知 webpack-dev-server 将 dist 目录下的文件作为可访问资源部署在 localhost:8080。。

  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'scripts/[name].js',
    filename: '[name].js',

    //[name]模块名占位

    clean: true//生成内容前清空输出目录
  },
  //以output.path的值作为服务器根目录
  //插件，给webpack提供更多功能
  plugins: [


    // ⭐ 新增：index.html，当成首页
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/login.html'), // 直接复用 login 页模板
      filename: 'index.html',                                 // 输出到 dist/index.html
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['login']                                       // 注入 login 入口脚本
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/login.html'),//模板文件
      filename: 'login.html',//输出文件
      useCdn: process.env.NODE_ENV === 'production',
      //生产模式，直接用cdn的bootstrap和axios
      chunks: ['login']//引入哪些打包后的模块（和entry的key值一致）
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/content.html'),//模板文件
      filename: 'content.html',//输出文件
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['content']//引入哪些打包后的模块（和entry的key值一致）
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/publish.html'),//模板文件
      filename: 'publish.html',//输出文件
      useCdn: process.env.NODE_ENV === 'production',
      chunks: ['publish']//引入哪些打包后的模块（和entry的key值一致）
    }),


    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      // 打包之后，这个插件会自动替换值
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  //加载器 
  module: {
    rules: [
      {
        test: /\.css$/i,
        //use: ["style-loader", "css-loader"]

        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除第三方包
        // 关键在这里：强制指定模块类型为 auto，允许 import/export
        type: "javascript/auto"
      },


      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }

    ]

  },
  //优化
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all', // 所有模块动态非动态移入的都分割分析
      cacheGroups: { // 分隔组
        commons: { // 抽取公共模块
          minSize: 0, // 抽取的chunk最小大小字节
          minChunks: 2, // 最小引用数
          reuseExistingChunk: true, // 当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
          name(module, chunks, cacheGroupKey) { // 分离出模块文件名
            const allChunksNames = chunks.map((item) => item.name).join('~') // 模块名1~模块名2
            return `./js/${allChunksNames}` // 输出到 dist 目录下位置
          }
        }
      }
    }
  },
  //解析别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};

//开发环境使用source map
if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map'
}

//生产环境下使用
if (process.env.NODE_ENV === 'production') {
  //生产环境下打包时，不需要打包下面的东西，防止import的包被打包进来
  // html内写了对应CDN链接
  config.externals = {
    // key:import from 语句后面的字符串
    // value:留在原地的全局变量(最好和 cdn 在全局暴露的变量一致)
    'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
    'axios': 'axios',
    'form-serialize': 'serialize',
    '@wangeditor/editor': 'wangEditor'

  }
}

module.exports = config


