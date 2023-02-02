const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@sb': path.resolve(__dirname, './src'),
      }
    }
  },
  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: () => true
        }
      }
    }
  }
}