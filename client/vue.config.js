module.exports = {
  configureWebpack: {
    watchOptions: {
      poll: 1000,
    },
      devtool: 'source-map'
  },
  devServer: {
    proxy: 'http://localhost:3000'
  },
}