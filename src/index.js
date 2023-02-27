import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'antd/dist/reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import { registerMicroApps, start } from 'qiankun';
import stores from '@/stores';
const data = {
    colorPrimary: '#25b864',
    borderRadius: 6,
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider {...stores}>
        <ConfigProvider
            theme={{ token: { colorPrimary: data.colorPrimary, borderRadius: data.borderRadius } }}
        >
            <App />
        </ConfigProvider>
    </Provider>
);
registerMicroApps([
    {
        name: 'conduit',
        entry: 'http://localhost:8001',
        container: '#container',
        activeRule: '/conduit',
    },
    {
        name: 'vueApp',
        entry: 'http://localhost:8080',
        container: '#container',
        activeRule: '/app-vue',
    },
]);
// 启动 qiankun
start();

// loadMicroApp({
//     name: 'conduit', // 子应用名称，需要和子应用注册时保持一致
//     entry: 'http://localhost:8080', // 子应用入口地址
//     container: '#container', // 子应用挂载节点
// });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
