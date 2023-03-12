# tailwind干扰antD样式
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
会使Image组件预览图片位于左下角。
## 解决
如果您想完全禁用 Preflight - 可能是因为您要将 Tailwind 集成到现有项目中，或者是因为您想提供自己的基本样式 - 您所需要做的就是在 tailwind.config.js 文件的 corePlugins 部分，设置 preflight 为 false：
```js
  // tailwind.config.js
  module.exports = {
    corePlugins: {
     preflight: false,
    }
  }
```
# 可拖拽菜单仅支持inline模式
# basename与Form
` const location = useLocation();`加上basename后，react-router的location没有记录basename。而form的action直接拼接pathname，导致接口访问问题。
# application 'conduit' died in status LOADING_SOURCE_CODE: Failed to fetch
这个错误通常发生在远程子应用加载失败的情况下。可能是以下几个原因导致的：

1. 子应用代码未正确部署：请确保子应用的代码已经成功部署在了对应的地址上，并可以被主应用正常访问。可以尝试手动访问子应用代码的地址，验证是否可以访问到。

2. 跨域问题：如果子应用和主应用的地址不在同一个域名下，可能会因为浏览器的同源策略导致跨域问题。可以尝试在子应用的服务器端添加 CORS 头信息，允许主应用访问子应用的资源。

3. 网络问题：可能是由于网络问题导致子应用无法加载。可以检查网络连接是否正常，或者尝试在浏览器中手动访问子应用的地址，查看是否可以正常加载。

4. 配置问题：可能是由于配置问题导致子应用无法正确加载。请检查主应用的配置文件中是否正确配置了子应用的地址和名称等相关信息。

如果以上方法都没有解决问题，可以尝试查看浏览器的开发者工具中的网络面板，查看是否有加载失败的资源，并尝试排查问题。
根据提供的错误信息来看，应用程序“conduit”已经死亡，错误原因是“LOADING_SOURCE_CODE”的状态失败了。这通常表示它无法加载远程应用程序的源代码。

根据提供的错误信息，看起来应用程序“conduit”是在本地端口7900上运行的。请确认该端口是否正确，并且该应用程序是否已启动。

如果应用程序已经启动并且端口号也正确，那么问题可能是跨域资源共享（CORS）的问题。错误消息中提到引用来源网址政策是“strict-origin-when-cross-origin”，这意味着浏览器尝试跨域请求时会发送一些附加的请求标头来保护用户数据。在这种情况下，服务器可能需要响应这些请求标头以允许跨域请求。
