import { Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useStores } from '@/hooks';
import { useTransition, animated } from '@react-spring/web';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
const initialItems = [{ label: '首页', key: 'home**0', closable: false, children: <Outlet /> }];
NProgress.configure({
    // 动画方式
    easing: 'ease',
    // 是否显示加载ico
    showSpinner: false,
    // 初始化时的最小百分比
    minimum: 0.3,
});
export const MyTabs: React.FC = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState('home**0');
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(1);
    const { globalStore } = useStores();
    const transitions = useTransition(location, {
        keys: null,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    });
    const navigate = useNavigate();
    const animationPage = transitions((props) => (
        <animated.div
            style={{
                ...props,
                height: 'calc(100vh - 120px)',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}
        >
            <Outlet />
        </animated.div>
    ));
    NProgress.start();
    const NewPage = () => {
        useEffect(() => {
            NProgress.done();
        }, []);
        return <>{animationPage}</>;
    };
    useEffect(() => {
        if (globalStore.tab.label !== '' && globalStore.tab.key !== '') {
            add(globalStore.tab);
        }
    }, [globalStore.tab]);
    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = ({ label, key }: { label: string; key: string }) => {
        const newActiveKey = `${key}**${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label, key: newActiveKey, children: <NewPage />, closable: true });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: string) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (targetKey: any, action: 'add' | 'remove') => {
        if (action === 'add') {
            add({ label: 'home', key: 'home' });
        } else {
            remove(targetKey);
        }
    };
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
