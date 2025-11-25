//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack')


const config = {
  // mode: 'development',
  //有两种，development文件大，有注释，适合调试 ； production文件小，用来专门打包
  entry: './src/login/index.js',
  devServer: {
    static: './dist',
  },
  //以上配置告知 webpack-dev-server 将 dist 目录下的文件作为可访问资源部署在 localhost:8080。。

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].js',
    clean: true//生成内容前清空输出目录
  },
  //以output.path的值作为服务器根目录
  //插件，给webpack提供更多功能
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/login.html'),//模板文件
      filename: path.resolve(__dirname, 'dist/login/index.html'),//输出文件
      useCdn: process.env.NODE_ENV === 'production',
      //生产模式，直接用cdn的bootstrap和axios
    }),
    new MiniCssExtractPlugin({
      filename: './login/index.css'
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
    'axios': 'axios'
  }
}

module.exports = config


