import React, { FC } from 'react';
import { Col, Row, Tabs, List, Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Theme, Fullscreen, Notification } from './components';
/** mock 数据 */
const data = [
    {
        title: 'Lily  回复了你',
    },
    {
        title: 'Lily  回复了你',
    },
];
const NotificationList = () => (
    <div className="list">
        <List
            size="small"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Let life be beautiful like summer flowers "
                    />
                </List.Item>
            )}
        />
    </div>
);
const items = [
    {
        label: `通知`,
        key: '1',
        children:
            'I have had my invitation to this world‘s festival, and thus my life has been blessed.',
    },
    {
        label: `消息`,
        key: '2',
        children: <NotificationList />,
    },
];
const Notifications = () => <Tabs defaultActiveKey="1" size="small" items={items} />;

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
        <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Theme />
            <Fullscreen />
            <Notification />
            <Col>
                <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Dropdown>
            </Col>
        </Row>
    );
};
export { MyToolBar };
