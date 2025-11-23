//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  //有两种，development文件大，有注释，适合调试 ； production文件小，用来专门打包
  entry: './src/login/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './login/index.js',
    clean: true//生成内容前清空输出目录
  },
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

    ]

  },
  //优化
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
};


