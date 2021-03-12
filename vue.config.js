module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 10000,
    disableHostCheck: true,
    proxy: {
        '/backend': {
            target: 'http://127.0.0.1:10001/',
            changeOrigin: true,
            pathRewrite: {
                '^/backend': '/'
            }
        }
    }
}
}
