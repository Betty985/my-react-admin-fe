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