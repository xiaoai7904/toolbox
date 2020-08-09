const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  // 项目入口文件地址
  entry: {
    index: path.resolve(__dirname, './package', 'index.ts')
  },
  // 打包输出信息
  output: {
    // 输出文件的目标路径
    path: path.resolve(__dirname, './dist'),
    // 文件名
    filename: '[name].js',
  },
  resolve: {
    // 使用的扩展名
    extensions: ['.ts', 'tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    //这个本地开发环境运行时是基于哪个文件夹作为根目录
    contentBase: './dist',
    //当你有错误的时候在控制台打出
    stats: 'errors-only',
    //不启动压缩
    compress: false,
    host: 'localhost',
    port: 9999,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
