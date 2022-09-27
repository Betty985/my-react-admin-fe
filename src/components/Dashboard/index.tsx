import React, { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MyMenu } from './MyMenu';
import { Layout } from 'antd';
import {Logo} from "@/assets/logo"
import {MyBreadcrumb} from './MyBreadcrumb'
import  {MyToolBar} from './MyToolbar'
const { Header, Content, Sider } = Layout;
const Dashboard: FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }} className='layout'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
                <div className="logo" >
                    <Logo/>
                     {!collapsed&&<span>REACT ADMIN</span>}
                </div>
                <MyMenu />
            </Sider>
            <Layout>
            <Header className='toolbal'>
               
                <MyToolBar />
            </Header>
            <Content style={{ margin: '0 16px' }}>
            <MyBreadcrumb />
                <Outlet />
            </Content>
            </Layout>
        </Layout>
    );
};
export { Dashboard };
