import React, { FC, useState } from 'react';
import { MyMenu } from './MyMenu';
import { Layout, Row, Col, Switch, Button } from 'antd';
import { Logo } from '@/assets/logo';
import { MyBreadcrumb } from './MyBreadcrumb';
import { MyToolBar } from './MyToolbar';
import { MyTabs } from './MyTabs';
import { useStores } from '@/hooks';
const { Header, Content, Sider } = Layout;
const Dashboard: FC = () => {
    const { globalStore } = useStores();
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const changeTheme = (value: boolean) => {
        const sun = value ? 'dark' : 'light';
        setTheme(sun);
        globalStore.setLight(sun);
    };
    return (
        <Layout style={{ minHeight: '100vh' }} className="layout">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme={theme}
            >
                <div className="logo">
                    <Logo />
                    {!collapsed && <span className={theme}>REACT ADMIN</span>}
                </div>
                <MyMenu theme={theme} />
            </Sider>
            <Layout>
                <Header className={`toolbal ${theme}`}>
                    <Row align="middle" justify="space-between">
                        <Col>
                            <MyBreadcrumb />
                        </Col>
                        <Switch
                            checked={theme === 'dark'}
                            onChange={changeTheme}
                            checkedChildren="dark"
                            unCheckedChildren="light"
                        />
                        <Col>
                            <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }}>
                                <MyToolBar />
                            </Row>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <MyTabs />
                </Content>
            </Layout>
        </Layout>
    );
};
export { Dashboard };
