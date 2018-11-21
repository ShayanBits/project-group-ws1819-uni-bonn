module.exports = {
  configureWebpack: {
    watchOptions: {
      poll: 1000,
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/img': {
        target: 'http://localhost:3000',
      }
    },
  },
}