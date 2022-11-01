import React, { FC, useEffect, useState } from 'react';
import { MyMenu } from './MyMenu';
import { Layout, Row, Col, Switch, Grid, Tooltip, Drawer, Dropdown, Avatar, Menu } from 'antd';
import { Logo } from '@/assets/logo';
import { MyBreadcrumb } from './MyBreadcrumb';
import { MyToolBar } from './MyToolbar';
import { MyTabs } from './MyTabs';
import { useTheme } from '@/hooks';
import Icon, { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { useBreakpoint } = Grid;

const { Header, Content, Sider } = Layout;
/**
 * 用户菜单
 */
const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: <Link to="/profile">个人中心</Link>,
            },
            {
                key: '2',
                label: <span>退出</span>,
            },
        ]}
    />
);
const Dashboard: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mode, setMode] = useState<'vertical' | 'horizontal' | 'inline'>('inline');
    const screens = useBreakpoint();
    const [open, setOpen] = useState(false);
    const { setLight } = useTheme();
    const changeTheme = (value: boolean) => {
        const sun = value ? 'dark' : 'light';
        setTheme(sun);
        setLight(sun);
    };
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
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
                    wrap={false}
                >
                    <Col>{!collapsed && <span className={`logo ${theme}`}>REACT ADMIN</span>}</Col>
                    <Col>{mode === 'horizontal' && <MyMenu theme={theme} mode={mode} />}</Col>
                    {screens.xl && mode !== 'horizontal' ? (
                        <Col>
                            <MyBreadcrumb />
                        </Col>
                    ) : null}
                    <Col flex="none">
                        <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }}>
                            {screens.lg && <MyToolBar />}
                            <Col>
                                <Switch
                                    checked={theme === 'dark'}
                                    onChange={changeTheme}
                                    checkedChildren="dark"
                                    unCheckedChildren="light"
                                />
                            </Col>
                            <Col>
                                <Dropdown
                                    overlay={menu}
                                    placement="bottom"
                                    arrow={{ pointAtCenter: true }}
                                >
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                </Dropdown>
                            </Col>
                            <Col>
                                {!screens.lg && (
                                    <SettingOutlined className="icon" onClick={showDrawer} />
                                )}
                                <Drawer
                                    title="工具箱"
                                    placement="right"
                                    onClose={onClose}
                                    open={open}
                                >
                                    <MyToolBar box={true} />
                                </Drawer>
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
                <Content style={{ margin: '0 16px', overflowY: 'scroll' }}>
                    <MyTabs />
                </Content>
            </Layout>
        </Layout>
    );
};
export { Dashboard };
