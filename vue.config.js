const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
    // 开发服务器
    devServer: {
        port: 16444, // 修改启动端口号
        proxy: {
            '/admin': { // 请求相对路径以 /user 开头的，才会走这里的配置
                target: 'http://localhost:17818', // 这个就是后端地址
                changeOrigin: true
            },
            '/boss': {
                target: 'http://localhost:17818',
                changeOrigin: true
            },
            '/login': {
                target: 'http://localhost:17818',
                changeOrigin: true
            }
        }
    },
    publicPath: './'
}
