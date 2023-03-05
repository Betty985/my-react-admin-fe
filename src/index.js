import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'antd/dist/reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import microApps from './micro-app'
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
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
registerMicroApps(microApps, {
    beforeLoad: app => {
        console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
        app => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
        }
    ],
    afterMount: [
        app => {
            console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
        }
    ],
    afterUnmount: [
        app => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
        }
    ]
});
/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/conduit');
// 启动 qiankun
start();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
