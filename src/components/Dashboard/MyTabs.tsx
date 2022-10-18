import { Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStores } from '@/hooks';
const initialItems = [{ label: '首页', key: 'home**0', closable: false, children: <Outlet /> }];

export const MyTabs: React.FC = () => {
    const [activeKey, setActiveKey] = useState('home**0');
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(1);
    const { globalStore } = useStores();
    const navigate = useNavigate();
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
        newPanes.push({ label, key: newActiveKey, children: <Outlet />, closable: true });
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
