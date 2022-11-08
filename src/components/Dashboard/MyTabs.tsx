import { Dropdown, MenuProps, Space, Tabs, Spin, Row } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useStores } from '@/hooks';
import { useTransition, animated } from '@react-spring/web';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { DownOutlined, ReloadOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
// 下拉菜单
const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Space>
                <ReloadOutlined /> 重新加载
            </Space>
        ),
    },

    {
        key: '2',
        label: (
            <Space>
                <CloseOutlined /> 关闭当前标签页
            </Space>
        ),
    },
    {
        key: '3',
        label: (
            <Space>
                <MinusOutlined /> 关闭全部标签页
            </Space>
        ),
    },
];
const Tool: FC<{ actions: { remove: Function; removeAll: Function; reload: Function } }> = (
    props
) => {
    const { remove, removeAll, reload } = props.actions;
    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case '1': {
                reload();
                break;
            }
            case '2': {
                remove();
                break;
            }
            case '3': {
                removeAll();
                break;
            }
        }
    };
    return (
        <Dropdown menu={{ items, onClick }} arrow={{ pointAtCenter: true }}>
            <DownOutlined className="mr-4" />
        </Dropdown>
    );
};
const ContentPage = () => {
    const [load, setLoad] = useState(true);
    if (load) {
        NProgress.start();
    }
    const location = useLocation();
    const transitions = useTransition(location, {
        keys: location.key,
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        reverse: true,
    });
    useEffect(() => {
        if (load) {
            setLoad(false);
            NProgress.done();
        }
    }, []);
    return (
        <>
            {load ? (
                <Row justify="center" align="middle" style={{ height: 'calc(100vh - 120px)' }}>
                    <Spin size="large" delay={300} />
                </Row>
            ) : (
                transitions((props) => (
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
                ))
            )}
        </>
    );
};
export const MyTabs: React.FC = () => {
    const [activeKey, setActiveKey] = useState('home');
    const { globalStore } = useStores();
    const initialItems = [{ label: 'home', key: 'home', closable: false }];
    const [items, setItems] = useState(initialItems);
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
        if (items.some((item) => item.key === key)) {
            onTabClick(key);
        } else {
            const newPanes = [...items];
            newPanes.push({ label, key, closable: true });
            setItems(newPanes);
            setActiveKey(key);
        }
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
        setActiveKey(key);
        navigate(key);
    };
    const removeCur = () => {
        remove(activeKey);
    };
    const removeAll = () => {
        setItems(initialItems);
        setActiveKey('home');
    };
    const reload = () => {
        navigate(activeKey);
    };
    return (
        <>
            <Tabs
                type="editable-card"
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                onTabClick={onTabClick}
                items={items}
                tabBarExtraContent={<Tool actions={{ remove: removeCur, removeAll, reload }} />}
            />
            <ContentPage />
        </>
    );
};
