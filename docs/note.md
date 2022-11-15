
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

# Technical solutions
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


## [动态换肤](https://ant.design/components/config-provider-cn/#components-config-provider-demo-theme)

src/index.js

```js
import 'antd/dist/antd.variable.min.css';
import { ConfigProvider } from 'antd';
ConfigProvider.config({
    theme: {
        primaryColor: '#25b864',
    },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider>
        <App />
    </ConfigProvider>
);
```

src/components/Dashboard/MyToolbar.tsx

```js
const initColor = {
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
};
const ColorChange: FC = () => {
    const [color, setColor] = useState(() => initColor);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { globalStore } = useStores();
    // 配置选项卡内容
    const primary = (
        <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={color.primaryColor}
            onChange={({ hex }) => {
                onColorChange({
                    primaryColor: hex,
                });
            }}
        />
    );
    const error = (
        <SketchPicker
            presetColors={['#ff4d4f']}
            color={color.errorColor}
            onChange={({ hex }) => {
                onColorChange({
                    errorColor: hex,
                });
            }}
        />
    );
    const warning = (
        <SketchPicker
            presetColors={['#faad14']}
            color={color.warningColor}
            onChange={({ hex }) => {
                onColorChange({
                    warningColor: hex,
                });
            }}
        />
    );
    const success = (
        <SketchPicker
            presetColors={['#52c41a']}
            color={color.successColor}
            onChange={({ hex }) => {
                onColorChange({
                    successColor: hex,
                });
            }}
        />
    );
    const info = (
        <SketchPicker
            presetColors={['#1890ff']}
            color={color.infoColor}
            onChange={({ hex }) => {
                onColorChange({
                    infoColor: hex,
                });
            }}
        />
    );
    const items = Object.entries({ primary, success, error, warning, info }).map((item) => {
        const [label, children] = item;
        return {
            label,
            children,
            key: label,
        };
    });
    const onColorChange = (nextColor: Partial<typeof color>) => {
        const mergedNextColor = {
            ...color,
            ...nextColor,
        };
        setColor(mergedNextColor);
        // 组件共享theme
        globalStore.setTheme(mergedNextColor);
        ConfigProvider.config({
            theme: mergedNextColor,
        });
    };

    return <Tabs animated={true} items={items} />;
};
```

非 antd 组件的动态换肤
src/hooks/useTheme.ts

```js
import { useStores } from './useStores';
const useTheme = () => {
    const { globalStore } = useStores();
    const [theme, setTheme] = useState(globalStore.theme);
    const themeRef = useRef(theme);
    themeRef.current = theme;
    useEffect(() => {
        setTheme(globalStore.theme);
    });
    return { theme: themeRef.current };
};
export { useTheme };
```

## [富文本编辑器](https://www.wangeditor.com/v5/)

-   v1.0 富文本
-   v2.0 目录和 markdown

```js
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
export const MyEditor = () => {
    const [editor, setEditor] = (useState < IDomEditor) | (null > null);
    const toolbarConfig: Partial<IToolbarConfig> = {};
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容。。。',
    };
    // 及时销毁editor
    useEffect(() => {
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);
    return (
        <>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
                data-w-e-toolbar={true}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html.val}
                // onCreated属性有问题会使toolbar变成一条线
                onCreated={setEditor}
                onChange={(editor) => {
                    setHTML({ val: editor.getHtml() });
                    setTEXT({ val: editor.getText() });
                    setJSON({ val: editor.children });
                }}
                style={{ minHeight: '300px' }}
                mode="default"
            />
        </>
    );
};
```

## [前端水印](https://juejin.cn/post/6964357725652254734#heading-5)

原理：水印是一个或多个元素，通过[z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)将其设置在上层覆盖所有元素；[pointer-events](pointer-events)设置为 none 使元素永远不会成为鼠标事件的 target。但是，当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

## 多页签
src/components/Dashboard/MyMenu.tsx

点击 MenuItem时将当前菜单子项的标签和key传给状态管理库
```js
import { useStores } from '@/hooks';
const MyMenu = () => {
    const navigate = useNavigate();
     const { globalStore } = useStores();
    const onHandleClick = (e: any) => {
        let path = e.keyPath.reverse().join('/');
        navigate(path);
        globalStore.setTab({ label: e.key, key: path });
    };
    return <Menu onClick={onHandleClick} items={dragItems} mode="inline" theme="dark" />;
};
```

src/stores/global.ts
```js
const globalStore = makeAutoObservable({
    tab: { label: '', key: '' },
    setTab(tab: { label: string; key: string }) {
        this.tab = tab;
    },
});
```
src/components/Dashboard/MyTabs.tsx

状态库的当前标签信息改变时，添加标签页；
```js

export const MyTabs: React.FC = () => {

    const { globalStore } = useStores();
    const navigate = useNavigate();
    useEffect(() => {
        if (globalStore.tab.label !== '' && globalStore.tab.key !== '') {
            add(globalStore.tab);
        }
    }, [globalStore.tab]);
      const onTabClick = (key: string) => {
        const regexp = /.+(?=\*\*)/;
        const res = regexp.exec(key) || [];
        navigate(res[0] || '');
    };
    return (
        <>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                onTabClick={onTabClick}
                items={items}
            />
        </>
    );
};
```
## [图片验证码](https://juejin.cn/post/6970724598073524238)
核心代码
```js
  const canvas = document.getElementById('code') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        let code = '';
        /*绘制4位验证码*/
        for (let i = 4; i > 0; i--) {
            const num = randomNum(0, 9) + '';
            /**设置每个验证码的x,y坐标和旋转角度 */
            const x = (canvas.width / 6) * i + randomNum(-10, 10);
            const y = randomNum(35, 45);
            const r = (randomNum(-30, 30) * Math.PI) / 180;
            code = num + code;
            // 先定原点再旋转
            ctx?.translate(x, y);
            ctx?.rotate(r);
            // fillStyle设置验证码样式，fillText绘制验证码
            ctx!.fillStyle = `rgba(${randomNum(10, 50)},${randomNum(10, 50)},${randomNum(
                10,
                50
            )},0.6)`;
            ctx!.font = `${randomNum(30, 40)}px Arial`;
            ctx!.shadowOffsetX = 3;
            ctx!.shadowOffsetY = 3;
            ctx!.shadowBlur = 3;
            ctx!.shadowColor = 'rgba(0,0,0,0.5)';
            ctx?.fillText(num, 0, 0);
            // 设置完一位验证码后，撤销位移和旋转设置
            ctx?.rotate(-r);
            ctx?.translate(-x, -y);
        }
        /**绘制干扰线和干扰点 */
        ctx?.beginPath();
        for (let i = 0; i < randomNum(2, 4); i++) {
            /*确定干扰线起点和终点坐标*/
            const startX = randomNum(0, canvas.width / 2);
            const startY = randomNum(0, canvas.height);

            const endX = randomNum(canvas.width / 2, canvas.width);
            const endY = randomNum(0, canvas.height);

            /*使用stroke方法绘制干扰线*/
            ctx!.strokeStyle = `rgba(${randomNum(100, 130)},${randomNum(100, 130)},${randomNum(
                100,
                130
            )},${randomNum(0.3, 0.6)})`;
            ctx?.moveTo(startX, startY);
            ctx?.lineTo(endX, endY);
            ctx?.stroke();
        }
        for (let i = 0; i < randomNum(10, 20); i++) {
            /*确定干扰点坐标*/
            let x = randomNum(0, canvas.width);
            let y = randomNum(0, canvas.height);

            /*使用fill方法绘制干扰点，注意干扰点要使用填充方式*/
            ctx!.fillStyle = `rgba(${randomNum(100, 130)},${randomNum(100, 130)},${randomNum(
                100,
                130
            )},${randomNum(0.3, 0.9)})`;
            ctx?.moveTo(x, y);
            /*通过arc方法绘制坐标为（0,0,），半径为1，起点角度为0度，终点角度为360度的圆形黑点（干扰点）*/
            ctx?.arc(x, y, 1, 0, 2 * Math.PI, false);
            ctx?.fill();
        }
```
### [自定义滚动条](https://stackblitz.com/edit/react-ts-ugtfyw?file=README.md)
### [数据大屏](https://juejin.cn/post/7148733509744459790)
## [聊天室](https://juejin.cn/post/7143417768388345870#heading-9)
