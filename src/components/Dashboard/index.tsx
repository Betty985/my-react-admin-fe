import React, { FC, useEffect, useState } from 'react';
import { MyMenu } from './MyMenu';
import { Layout, Row, Col, Switch, Grid, Tooltip } from 'antd';
import { Logo } from '@/assets/logo';
import { MyBreadcrumb } from './MyBreadcrumb';
import { MyToolBar } from './MyToolbar';
import { MyTabs } from './MyTabs';
import { useStores } from '@/hooks';
import Icon, { SettingOutlined } from '@ant-design/icons';
const { useBreakpoint } = Grid;
enum menuType {
    'vertical',
    'horizontal',
    'inline',
}
const { Header, Content, Sider } = Layout;
const Dashboard: FC = () => {
    const { globalStore } = useStores();
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mode, setMode] = useState<'vertical' | 'horizontal' | 'inline'>('inline');
    const screens = useBreakpoint();
    const changeTheme = (value: boolean) => {
        const sun = value ? 'dark' : 'light';
        setTheme(sun);
        globalStore.setLight(sun);
    };
    useEffect(() => {
        if (!screens.xl) {
            setCollapsed(true);
        }
    }, [screens]);
    return (
        <Layout style={{ minHeight: '100vh' }} className="layout">
            <Header className={`${theme}`}>
                <Tooltip title="点击切换菜单位置" color={'var(--ant-primary-color)'} defaultOpen>
                    <Icon
                        component={Logo}
                        className="fixed left-2"
                        onClick={() =>
                            setMode((i) => {
                                if (i === 'inline') {
                                    return 'horizontal';
                                }
                                return 'inline';
                            })
                        }
                    />
                </Tooltip>
                <Row
                    align="middle"
                    justify="space-between"
                    gutter={{ xs: 8, sm: 16, md: 24 }}
                    className="toolbar"
                >
                    <Col>{!collapsed && <span className={`logo ${theme}`}>REACT ADMIN</span>}</Col>
                    <Col>{mode === 'horizontal' && <MyMenu theme={theme} mode={mode} />}</Col>
                    {screens.xl && mode !== 'horizontal' ? (
                        <Col>
                            <MyBreadcrumb />
                        </Col>
                    ) : null}
                    <Col>
                        <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }}>
                            <MyToolBar />
                            <Col>
                                <Switch
                                    checked={theme === 'dark'}
                                    onChange={changeTheme}
                                    checkedChildren="dark"
                                    unCheckedChildren="light"
                                />
                            </Col>
                            <Col>
                                <SettingOutlined className="icon" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Header>

            <Layout>
                {mode === 'inline' && (
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        theme={theme}
                    >
                        <MyMenu theme={theme} mode={mode} />
                    </Sider>
                )}
                <Content style={{ margin: '0 16px' }}>
                    <MyTabs />
                </Content>
            </Layout>
        </Layout>
    );
};
export { Dashboard };
