/** mock 数据 */
import React, { FC } from 'react';
import { Badge, Col, Popover, Tabs, List, Avatar } from 'antd';

import { BellOutlined } from '@ant-design/icons';
import { useTheme } from '@/hooks';
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
const content = () => <Tabs defaultActiveKey="1" size="small" items={items} />;
export const Notification: FC = () => {
    const { light } = useTheme();
    return (
        <Col>
            <Popover placement="bottomRight" content={content} trigger="click" arrowPointAtCenter>
                <Badge count={25} overflowCount={99} size="small">
                    <BellOutlined className={`icon ${light}`} />
                </Badge>
            </Popover>
        </Col>
    );
};
