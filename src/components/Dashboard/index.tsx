import React, { FC, useEffect, useRef, useState } from 'react';
import { MyMenu } from './MyMenu';
import { Layout, Row, Col, Switch, Grid, Tooltip, Drawer, Dropdown, Avatar, Menu } from 'antd';
import { Logo } from '@/assets/logo';
import { MyBreadcrumb } from './MyBreadcrumb';
import { ToolBar } from './MyToolbar';
import { MyTabs } from './MyTabs';
import { useTheme, useStores } from '@/hooks';
import Icon, { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
const { useBreakpoint } = Grid;

const { Header, Content, Sider } = Layout;
let guide = [];

/** logo */
const AdminLogo: FC = () => (
    <>
        <Icon component={Logo} className="fixed left-0.5 top-0.5" />
        <span className="ml-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l">
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
                        if (screens.md) {
                            setCollapsed((collapsed: boolean) => !collapsed);
                        } else {
                            setOpen(true);
                        }
                    }}
                />
            ) : (
                <MenuFoldOutlined
                    className="ml-4 icon"
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
    const { globalStore } = useStores();
    const ref1 = useRef(null),
        ref2 = useRef(null),
        ref3 = useRef(null);
    const handleClick = screens.sm
        ? () =>
              setMode((i) => {
                  if (i === 'inline') {
                      return 'horizontal';
                  }
                  return 'inline';
              })
        : () => {};

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
    useEffect(() => {
        globalStore.setGuide([ref1.current, ref2.current, ref3.current]);
    }, []);
    return (
        <Layout style={{ height: '100vh' }}>
            <Header className={`${theme}`}>
                <Row
                    align="middle"
                    justify="space-between"
                    gutter={{ xs: 8, sm: 16, md: 24 }}
                    className="toolbar"
                    wrap={false}
                >
                    <Col>
                        <Icon
                            ref={ref1}
                            component={Logo}
                            className="fixed left-2"
                            onClick={handleClick}
                        />
                        {!collapsed && screens.sm && (
                            <span className={`logo ${theme}`}>REACT ADMIN</span>
                        )}
                    </Col>

                    {/* 水平导航栏 */}
                    <Col>
                        {mode === 'horizontal' && screens.md && (
                            <MyMenu theme={theme} mode={mode} />
                        )}
                    </Col>

                    {screens.xl && mode !== 'horizontal' ? (
                        <Col>
                            <MyBreadcrumb />
                        </Col>
                    ) : null}
                    <ToolBar theme={theme} changeTheme={changeTheme} ref={ref2} />
                </Row>
            </Header>

            <Layout>
                {mode === 'inline' && screens.sm && (
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        theme={theme}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <MyMenu theme={theme} mode={mode} />
                    </Sider>
                )}
                <Content style={{ margin: 0, overflow: 'hidden' }} ref={ref3}>
                    <MyTabs />
                </Content>
            </Layout>
        </Layout>
    );
};
export { Dashboard };
