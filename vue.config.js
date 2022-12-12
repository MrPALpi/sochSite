const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: 'https://xn--i1ahcl5aza.xyz/'
    proxy:{
      "^/auth":{
        target  : 'https://xn--i1ahcl5aza.xyz/auth/',
        changeOrigin  : true,
        pathRewrite: {'^/auth' : ''}
      },
      "^/api":{
        target  : 'https://xn--i1ahcl5aza.xyz/api/',
        changeOrigin  : true,
        pathRewrite: {'^/api' : ''}
      },
      // "^/":{
      //   target  : 'https://xn--i1ahcl5aza.xyz/',
      //   changeOrigin  : true,
      //   ws: false,
      //   pathRewrite: {'^/roma/' : ''}
      // },
      // "^/roma":{
      //   target  : 'https://xn--i1ahcl5aza.xyz/',
      //   changeOrigin  : true,
      //   pathRewrite: {'^/roma' : ''}
      // },
      "^/flask":{
        target  : 'http://127.0.0.1:5000',
        changeOrigin  : true,
        pathRewrite: {'^/flask' : ''}
      },
    }
  }
});

