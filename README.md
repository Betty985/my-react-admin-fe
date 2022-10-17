# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## reference

-   [react-admin](https://github.com/yezihaohao/react-admin)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# features

-   [ ] 动态可拖拽多级菜单
-   [ ] 数据大屏
-   [ ] 路由守卫
-   [ ] RABC 权限控制
-   [ ] 表格
-   [ ] 面包屑
-   [ ] 工具栏：全屏、动态换肤、设置
-   [ ] 新手指引
-   [ ] 响应式
-   [ ] 支持 MarkDown 的富文本
-   [ ] 轮播图
-   [ ] 标签页
-   [x] 首页：滚动列表

# Technical solutions

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
- v1.0 富文本
- v2.0 目录和markdown
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
原理：水印是一个或多个元素，通过[z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)将其设置在上层覆盖所有元素；[pointer-events](pointer-events)设置为none使元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。