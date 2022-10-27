import React, { FC } from 'react';
import { Col, Row, Tabs, List, Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Theme, Fullscreen, Notification, Watermark, Search } from './components';

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

const MyToolBar: FC = () => {
    return (
        <>
            <Search />
            <Watermark />
            <Theme />
            <Fullscreen />
            <Notification />
            <Col>
                <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Dropdown>
            </Col>
        </>
    );
};
export { MyToolBar };
