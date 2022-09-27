import React from 'react';
import echarts from 'echarts';
import { Avatar, Card, Col, Row } from 'antd';
import { Radar,K ,PictorialBar} from './Echarts';

const Home = () => {
    return (
        <>
            <Card className="banner" hoverable>
                <Avatar src="https://joeschmoe.io/api/v1/random" /> default，我回来了哦
            </Card>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="雷达图" bordered={false} hoverable>
                        <Radar />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="上证指数" bordered={false} hoverable>
                       <K />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="象形柱图" bordered={false} hoverable>
                       <PictorialBar />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                
            </Row>
        </>
    );
};
export { Home };
