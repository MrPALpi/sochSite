const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: 'https://xn--i1ahcl5aza.xyz/'
    proxy:{
      "^/roma":{
        target  : 'https://xn--i1ahcl5aza.xyz/',
        changeOrigin  : true,
        pathRewrite: {'^/roma' : ''}
      },
      "^/flask":{
        target  : 'http://127.0.0.1:5000',
        changeOrigin  : true,
        pathRewrite: {'^/flask' : ''}
      },
    }
  }
});

