import './public-path';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import ReactDOM from 'react-dom';
interface IProps {
    container?: HTMLElement;
}
function render(props: IProps) {
    const { container } = props;
    const root = createRoot(
        container ? container.querySelector('#root') : document.getElementById('root')
    );
    root.render(<App />);
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
    render({});
}

export async function bootstrap() {
    console.log('[react16] react app bootstraped');
}

export async function mount(props) {
    console.log('[react18] props from main framework', props);
    render(props);
}

export async function unmount(props) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(
        container ? container.querySelector('#root') : document.getElementById('root')
    );
}
