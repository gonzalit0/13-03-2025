// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pwa: {
    name: 'Mi Aplicación',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#ffffff'
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/(fonts|cdnjs)\.com/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
          }
        },
        {
          urlPattern: /.*\.(?:js|css|json)/,
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'assets-cache'
          }
        }
      ]
    }
  }
}
