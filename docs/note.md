# 修改ant design 组件样式
```scss
:global(.ant-btn){

}
```
# 为scss文件生成声明文件
global.d.ts  `declare module '*.scss'`
# 可拖拽菜单
- [archive/react-beautiful-dn](https://booboom.github.io/archive/react-beautiful-dnd.html)
## 问题
### 无法拖动
- [react-beautiful-dnd-i-get-unable-to-find-draggable](https://stackoverflow.com/questions/60029734/react-beautiful-dnd-i-get-unable-to-find-draggable-with-id-1)

删除 StrictMode
### react-beautiful-dnd需要jsx拼接，ant design menu不需要
拼装好放到label属性里

# react-router-dom
## 嵌套路由
```js
const routes=[
  {
    path: "/",
    element: <Dashboard />,
    children:[
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "button",
        element: <MyButton />,
      },
    ]
  },
]
```
在组件中通过`<Outlet/>`组件拿到子组件
# 虚拟列表
- [react-window](https://react-window.vercel.app/#/examples/grid/variable-size)