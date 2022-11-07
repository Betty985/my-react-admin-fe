import React, { FC, useEffect, useState } from 'react';
import { MyMenu } from './MyMenu';
import { Layout, Row, Col, Switch, Grid, Tooltip, Drawer, Dropdown, Avatar, Menu } from 'antd';
import { Logo } from '@/assets/logo';
import { MyBreadcrumb } from './MyBreadcrumb';
import { MyToolBar } from './MyToolbar';
import { MyTabs } from './MyTabs';
import { useTheme } from '@/hooks';
import Icon, { SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
const { useBreakpoint } = Grid;

const { Header, Content, Sider } = Layout;
/**
 * 用户菜单
 */

const items = [
    {
        key: '1',
        label: <Link to="/profile">个人中心</Link>,
    },
    {
        key: '2',
        label: <span>退出</span>,
    },
];
const Toolbar: FC<{ theme: 'dark' | 'light'; changeTheme: SwitchChangeEventHandler }> = (props) => {
    const { theme, changeTheme } = props;
    const [open, setOpen] = useState(false);
    const screens = useBreakpoint();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
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
                    <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </Dropdown>
                </Col>
                <Col>
                    {!screens.lg && <SettingOutlined className="icon" onClick={showDrawer} />}
                    <Drawer
                        title="工具箱"
                        placement="right"
                        onClose={onClose}
                        open={open}
                        contentWrapperStyle={{ width: '50vw' }}
                    >
                        <MyToolBar box={true} />
                    </Drawer>
                </Col>
            </Row>
        </Col>
    );
};
/** logo */
const AdminLogo: FC = () => (
    <>
        <Icon component={Logo} className="fixed left-0.5 top-0.5" />
        <span className="ml-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l">
            REACT ADMIN
        </span>
    </>
);
/** 菜单唤出 */
const Trigger: FC<{ collapsed: boolean; setCollapsed: Function }> = (props) => {
    const { collapsed, setCollapsed } = props;
    const screens = useBreakpoint();
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Drawer
                title={<AdminLogo />}
                placement="left"
                onClose={onClose}
                open={open}
                contentWrapperStyle={{ width: '50vw', minWidth: '137px' }}
                closable={false}
            >
                <MyMenu theme="light" />
            </Drawer>
            {collapsed ? (
                <MenuUnfoldOutlined
                    className="icon ml-7"
                    onClick={() => {
                        if (screens.sm) {
                            setCollapsed((collapsed: boolean) => !collapsed);
                        } else {
                            setOpen(true);
                        }
                    }}
                />
            ) : (
                <MenuFoldOutlined
                    className="icon ml-4"
                    onClick={() => setCollapsed((collapsed: boolean) => !collapsed)}
                />
            )}
        </>
    );
};
const Dashboard: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mode, setMode] = useState<'vertical' | 'horizontal' | 'inline'>('inline');
    const screens = useBreakpoint();
    const { setLight } = useTheme();
    const changeTheme = (value: boolean) => {
        const sun = value ? 'dark' : 'light';
        setTheme(sun);
        setLight(sun);
    };
    useEffect(() => {
        if (!screens.xl) {
            setCollapsed(true);
        }
    }, [screens]);
    return (
        <Layout style={{ height: '100vh' }} className="layout hidden">
            <Header className={`${theme}`}>
                {screens.sm ? (
                    <Tooltip
                        title="点击切换菜单位置"
                        color={'var(--ant-primary-color)'}
                        defaultOpen
                    >
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
                ) : (
                    <Icon component={Logo} className="fixed left-2" />
                )}

                <Row
                    align="middle"
                    justify="space-between"
                    gutter={{ xs: 8, sm: 16, md: 24 }}
                    className="toolbar"
                    wrap={false}
                >
                    <Col>
                        {!collapsed && screens.sm && (
                            <span className={`logo ${theme}`}>REACT ADMIN</span>
                        )}
                        <Trigger collapsed={collapsed} setCollapsed={setCollapsed} />
                    </Col>

                    {/* 水平导航栏 */}
                    <Col>{mode === 'horizontal' && <MyMenu theme={theme} mode={mode} />}</Col>

                    {screens.xl && mode !== 'horizontal' ? (
                        <Col>
                            <MyBreadcrumb />
                        </Col>
                    ) : null}
                    <Toolbar theme={theme} changeTheme={changeTheme} />
                </Row>
            </Header>

            <Layout>
                {mode === 'inline' && screens.sm && (
                    <Sider trigger={null} collapsible collapsed={collapsed} theme={theme}>
                        <MyMenu theme={theme} mode={mode} />
                    </Sider>
                )}
                <Content style={{ margin: '0 16px', overflow: 'hidden' }}>
                    <MyTabs />
                </Content>
            </Layout>
        </Layout>
    );
};
export { Dashboard };
