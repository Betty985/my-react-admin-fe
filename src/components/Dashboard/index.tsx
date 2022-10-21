import React, { FC, useState } from 'react';
import { MyMenu } from './MyMenu';
import { Layout, Row, Col, Switch } from 'antd';
import { Logo } from '@/assets/logo';
import { MyBreadcrumb } from './MyBreadcrumb';
import { MyToolBar } from './MyToolbar';
import { MyTabs } from './MyTabs';
const { Header, Content, Sider } = Layout;
const Dashboard: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
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
                            <MyToolBar />
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
