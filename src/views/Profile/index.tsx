import React, { FC } from 'react';
import { Card, Col, Row } from 'antd';

import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
export * from './Contacts';
export const Profile: FC = () => {
    const navigate = useNavigate();
    return (
        <Row gutter={16}>
            <Col span={4}>
                <Card
                    onClick={() => navigate('contacts')}
                    hoverable
                    cover={
                        <img
                            alt="example"
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                    }
                >
                    <Meta title="通讯录" description="在这里管理您的联系人" />
                </Card>
            </Col>
            <Col span={8}>
                <Card title="敬请期待" bordered={false}>
                敬请期待……
                </Card>
            </Col>
        </Row>
    );
};
