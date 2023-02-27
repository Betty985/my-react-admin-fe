React + MobX + TypeScript + React-router
# todo
- [x] scss声明文件
- [x] 路由守卫
- [ ] 页面
- [x] husky
- [ ] react_devtools_backend.js:4026 marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options 
# bug
## 无法使用 JSX，除非提供了 "--jsx" 标志。ts(17004)
重启编译器
```shell
# 查看ts版本
npm view typescript version 
```
# 笔记
## pwa
PWA：运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。PWA 是可被发现、易安装、可链接、独立于网络、渐进式、可重用、响应性和安全的。
从Create React App 4开始,您可以将 `src/service-worker.js` 文件添加到项目中，以使用 Workbox 的 `InjectManifest `插件的内置支持，它将编译您的service worker，并向其中注入一个要修改的 URL 列表。
## web-vitals库
web-vitals库是一个小型 (~1K) 模块化库，用于测量真实用户的所有Web Vitals指标，其方式与 Chrome 测量它们的方式以及向其他 Google 工具（例如Chrome 用户体验报告、页面Speed Insights，Search Console 的速度报告）。
## tsm(TypeScript 模块加载器)
特征
- 支持node <file>使用
- 支持ESM--loader使用
- 支持--require钩子使用
- 用于每个扩展自定义的可选配置文件
# react-router 
[RouteObject](https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/router.ts#L86-L96)
# 参考资料
- [React结合TypeScript和Mobx初体验](https://segmentfault.com/a/1190000015002112)
- [progressive-web-app](https://create-react-app.dev/docs/making-a-progressive-web-app/)
- [MDN:PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [react-admin](https://github.com/marmelab/react-admin)
- [react-mobx-realworld-example-app](https://github.com/gothinkster/react-mobx-realworld-example-app/tree/master/src)
- [mobx-router](https://github.com/kitze/mobx-router)
- [react-router](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)
- [ Provider/inject迁移指南](https://mobx-react.js.org/recipes-migration)
- [路由守卫](https://juejin.cn/post/7101925921103282183)
## 工具包
- [reactrouter](https://v5.reactrouter.com/web/guides/primary-components)
- [web-vitals](https://www.npmjs.com/package/web-vitals)