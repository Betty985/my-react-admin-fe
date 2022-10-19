import React from 'react';
import { Avatar, Card, Col, Row, Timeline } from 'antd';
import { Radar, K, PictorialBar } from './Echarts';
import { MyTable, MyTHead } from './Table';
import { Flicker } from '@/components';
const Home = () => {
    return (
        <>
            <Card className="banner" hoverable>
                <Avatar src="https://joeschmoe.io/api/v1/random" /> default，我回来了哦
            </Card>
            <Row gutter={16} className="row">
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

            <Row gutter={16} className="row">
                <Col span={16}>
                    <Card title={<MyTHead />} hoverable>
                        <MyTable />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="时间轴" hoverable>
                        <Timeline
                            mode="alternate"
                            pending="Recording..."
                            style={{ height: '354px' }}
                        >
                            <Timeline.Item dot={<Flicker color="#7948c2" radius="0" />}>
                                创建项目 2022-09-17
                            </Timeline.Item>
                            <Timeline.Item>登录界面和路由 2022-09-20</Timeline.Item>
                            <Timeline.Item dot={<Flicker width={'20px'} color="orange" />}>
                                可拖拽菜单1.0 2022-09-21
                            </Timeline.Item>
                            <Timeline.Item color="red">错误页 2022-09-26</Timeline.Item>
                            <Timeline.Item>全屏组件 2022-09-27</Timeline.Item>
                            <Timeline.Item dot={<Flicker />}>虚拟列表 2022-09-28</Timeline.Item>
                            <Timeline.Item>首页V1.0 2022-09-29</Timeline.Item>
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export { Home };
