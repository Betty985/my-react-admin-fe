import React, { FC } from 'react';
import { Card, Col, Row } from 'antd';

import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
export * from './Contacts';
export const Profile: FC = () => {
    const navigate = useNavigate();
    return (
        <Row
            gutter={[
                { xs: 8, sm: 16, md: 24 },
                { xs: 8, sm: 16, md: 24 },
            ]}
        >
            <Col span={4} xs={24} sm={12} md={6} lg={4} xl={3}>
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
            <Col span={4} xs={24} sm={12} md={6} lg={4} xl={3}>
                <Card title="敬请期待" bordered={false}>
                    敬请期待……
                </Card>
            </Col>
        </Row>
    );
};
