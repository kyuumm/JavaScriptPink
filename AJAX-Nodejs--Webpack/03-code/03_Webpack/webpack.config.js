//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
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
      filename: path.resolve(__dirname, 'dist/login/index.html')//输出文件
    }),
    new MiniCssExtractPlugin(),
  ],

  //加载器 
  module: {
    rules: [
      {
        test: /\.css$/i,
        //use: ["style-loader", "css-loader"]

        use: [MiniCssExtractPlugin.loader, "css-loader"]
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
          'style-loader',
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
};


