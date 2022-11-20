import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
