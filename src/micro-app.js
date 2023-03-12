const microApps = [
  {
    name: 'conduit',
    entry: '//localhost:7900',
    activeRule: '/conduit',
  },
  // {
  //   name: 'vueApp',
  //   entry: 'http://localhost:8080',
  //   activeRule: '/app-vue',
  // },
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#container', // 子应用挂载的div
  }
})

export default apps
