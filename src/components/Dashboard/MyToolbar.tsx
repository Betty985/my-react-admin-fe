import React, { FC, useState } from 'react';
import {
    Badge,
    Col,
    Row,
    Popover,
    Tabs,
    List,
    Avatar,
    Dropdown,
    Menu,
    ConfigProvider,
    Modal,
} from 'antd';
import screenfull from 'screenfull';
import {
    FullscreenOutlined,
    FullscreenExitOutlined,
    BellOutlined,
    SkinOutlined,
} from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { SketchPicker } from 'react-color';
import { Link } from 'react-router-dom';
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
                label: <Link to='/profile'>个人中心</Link>,
            },
            {
                key: '2',
                label: <span>退出</span>,
            },
        ]}
    />
);
/** 全屏 */
const Fullscreen: FC = () => {
    const [state, setState] = useSetState({
        screenfull: false,
    });
    const screenFull = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
        if (screenfull.isFullscreen) {
            screenfull.exit();
        }
        setState((prev) => ({ screenfull: !prev.screenfull }));
    };
    return (
        <Col onClick={screenFull}>
            {state.screenfull ? (
                <FullscreenExitOutlined className="icon" />
            ) : (
                <FullscreenOutlined className="icon" />
            )}
        </Col>
    );
};
/** 换肤 */
const initColor={
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
}
const ColorChange: FC = () => {
    const [color, setColor] = useState(()=>initColor);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 配置选项卡内容
    const primary = (
        <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={color.primaryColor}
            onChange={({ hex }) => {
                onColorChange({
                    primaryColor: hex,
                });
            }}
        />
    );
    const error = (
        <SketchPicker
            presetColors={['#ff4d4f']}
            color={color.errorColor}
            onChange={({ hex }) => {
                onColorChange({
                    errorColor: hex,
                });
            }}
        />
    );
    const warning = (
        <SketchPicker
            presetColors={['#faad14']}
            color={color.warningColor}
            onChange={({ hex }) => {
                onColorChange({
                    warningColor: hex,
                });
            }}
        />
    );
    const success = (
        <SketchPicker
            presetColors={['#52c41a']}
            color={color.successColor}
            onChange={({ hex }) => {
                onColorChange({
                    successColor: hex,
                });
            }}
        />
    );
    const info = (
        <SketchPicker
            presetColors={['#1890ff']}
            color={color.infoColor}
            onChange={({ hex }) => {
                onColorChange({
                    infoColor: hex,
                });
            }}
        />
    );
    const items = Object.entries({ primary, success, error, warning, info }).map((item) => {
        const [label, children] = item;
        return {
            label,
            children,
            key: label,
        };
    });
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setColor(()=>initColor)
        ConfigProvider.config({
            theme: initColor,
        });
        setIsModalOpen(false);
    };

    const onColorChange = (nextColor: Partial<typeof color>) => {
        const mergedNextColor = {
            ...color,
            ...nextColor,
        };
        setColor(mergedNextColor);
        ConfigProvider.config({
            theme: mergedNextColor,
        });
    };

    return (
        <Col>
            <SkinOutlined className="icon" onClick={showModal} />
            <Modal
                title="请选择主题颜色"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Tabs animated={true} items={items} />
            </Modal>
        </Col>
    );
};
const MyToolBar: FC = () => {
    return (
        <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }}>
            <ColorChange />
            <Fullscreen />
            <Col>
                <Popover
                    placement="bottomRight"
                    content={Notifications}
                    trigger="click"
                    arrowPointAtCenter
                >
                    <Badge count={25} overflowCount={99} size="small">
                        <BellOutlined className="icon" />
                    </Badge>
                </Popover>
            </Col>
            <Col>
                <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Dropdown>
            </Col>
        </Row>
    );
};
export { MyToolBar };
