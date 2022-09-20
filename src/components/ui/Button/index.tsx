import React, { FC, useState } from 'react';
import { Row, Col, Card, Button, Radio, Menu, Dropdown, RadioChangeEvent, Breadcrumb } from 'antd';
import {
    SearchOutlined,
    DownOutlined,
    LeftOutlined,
    RightOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import type { ButtonSize } from 'antd/lib/button';
import styles from './index.module.scss';
// MOCK
const menu = [
    {
        key: 1,
        label: '1st item',
    },
    {
        key: 2,
        label: '2nd item',
    },
    {
        key: 3,
        label: '3rd item',
    },
];
const breads = [
    {
        key: 1,
        label: 'UI',
    },
    {
        key: 2,
        label: '按钮',
    },
];

const MyMenu: FC = () => {
    const handleMenuClick = (e: any) => {
        console.log('click', e);
    };
    return (
        <Menu onClick={handleMenuClick} items={menu}/>
    );
};
const MyButton: FC = () => {
    const [size, setSize] = useState<ButtonSize>('middle');
    const [loading, setLoading] = useState(false);
    const [iconLoading, setIconLoading] = useState(false);
    return (
        <div  className={`${styles["button-demo"]}  ${styles["gutter-demo"]}`}>
            <Breadcrumb>
                {breads.map((i) => (
                    <Breadcrumb.Item key={i.key}>{i.label}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <Row gutter={16}>
                <Col className="gutter-row" md={12}>
                    <div className="gutter-box">
                        <Card bordered={false}>
                            <Button type="primary">Primary</Button>
                            <Button>Default</Button>
                            <Button type="dashed">Dashed</Button>
                            <Button danger>Danger</Button>
                        </Card>
                    </div>
                </Col>
                <Col className="gutter-row" md={12}>
                    <Card bordered={false}>
                        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                        <Button type="primary" icon={<SearchOutlined />}>
                            Search
                        </Button>
                        <Button shape="circle" icon={<SearchOutlined />} />
                        <Button icon={<SearchOutlined />}>Search</Button>
                        <br />
                        <Button shape="circle" icon={<SearchOutlined />} />
                        <Button icon={<SearchOutlined />}>Search</Button>
                        <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
                        <Button type="dashed" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Card>
                </Col>
                <Col className="gutter-row" md={12}>
                    <Card bordered={false}>
                        <Radio.Group
                            value={size}
                            onChange={(e: RadioChangeEvent) => setSize(e.target.value)}
                        >
                            <Radio.Button value="large">Large</Radio.Button>
                            <Radio.Button value="middle">Middle</Radio.Button>
                            <Radio.Button value="small">Small</Radio.Button>
                        </Radio.Group>
                        <br />
                        <br />
                        <Button type="primary" shape="circle" icon={<DownOutlined />} size={size} />
                        <Button type="primary" icon={<DownOutlined />} size={size}>
                            Download
                        </Button>
                        <Button type="primary" size={size}>
                            Normal
                        </Button>
                        <Button.Group size={size}>
                            <Button type="primary">
                                <LeftOutlined />
                                Backward
                            </Button>
                            <Button type="primary">
                                Forward
                                <RightOutlined />
                            </Button>
                        </Button.Group>
                    </Card>
                </Col>
                <Col className="gutter-row" md={12}>
                    <Card bordered={false}>
                        <Button type="primary">primary</Button>
                        <Button>secondary</Button>
                        <Dropdown overlay={<MyMenu />}>
                            <Button>
                                more <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Card>
                </Col>
                <Col>
                    <Card bordered={false}>
                        <Button type="primary" loading>
                            Loading
                        </Button>
                        <Button type="primary" size="small" loading>
                            Loading
                        </Button>
                        <Button type="primary" loading={loading} onClick={() => setLoading(true)}>
                            Click me!
                        </Button>
                        <Button
                            type="primary"
                            icon={<PoweroffOutlined />}
                            loading={iconLoading}
                            onClick={() => setIconLoading(true)}
                        >
                            Click me!
                        </Button>
                        <Button shape="circle" loading />
                        <Button type="primary" shape="circle" loading />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export { MyButton };
