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
