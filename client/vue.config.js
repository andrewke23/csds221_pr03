const path = require('path');

module.exports = {
  publicPath: '/csds221_pr03/',
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  }
}