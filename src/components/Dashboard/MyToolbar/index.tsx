import React, { FC, Ref, useState } from 'react';
import { Theme, Fullscreen, Notification, Watermark, Search } from './components';
import { Avatar, Col, Descriptions, Drawer, Dropdown, Grid, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import Switch, { SwitchChangeEventHandler } from 'antd/es/switch';
const { useBreakpoint } = Grid;
const MyToolBar: FC<{ box?: boolean }> = (props) => {
    const { box = false } = props;
    if (box) {
        return (
            <>
                <Descriptions
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    layout="vertical"
                >
                    <Descriptions.Item
                        label={
                            <Space>
                                搜索： <Search />
                            </Space>
                        }
                    >
                        <Space>
                            水印： <Watermark />
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={
                            <Space>
                                换肤: <Theme />
                            </Space>
                        }
                    >
                        <Space>
                            全屏: <Fullscreen />
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="通知">
                        <Notification />
                    </Descriptions.Item>
                </Descriptions>
            </>
        );
    } else
        return (
            <>
                <Search />
                <Watermark />
                <Theme />
                <Fullscreen />
                <Notification />
            </>
        );
};
/**
 * 用户菜单
 */

const items = [
    {
        key: '1',
        label: <Link to="/profile">个人中心</Link>,
    },
    {
        key: '2',
        label: <span>退出</span>,
    },
];
const ToolBar = React.forwardRef(
    (
        props: {
            theme: 'dark' | 'light';
            changeTheme: SwitchChangeEventHandler;
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const { theme, changeTheme } = props;
        const [open, setOpen] = useState(false);
        const screens = useBreakpoint();
        const showDrawer = () => {
            setOpen(true);
        };

        const onClose = () => {
            setOpen(false);
        };
        return (
            <Col flex="none">
                <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }} ref={ref}>
                    {screens.lg && <MyToolBar />}
                    <Col>
                        <Switch
                            checked={theme === 'dark'}
                            onChange={changeTheme}
                            checkedChildren="dark"
                            unCheckedChildren="light"
                        />
                    </Col>
                    <Col>
                        <Dropdown
                            menu={{ items }}
                            placement="bottom"
                            arrow={{ pointAtCenter: true }}
                        >
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                        </Dropdown>
                    </Col>
                    <Col>
                        {!screens.lg && <SettingOutlined className="icon" onClick={showDrawer} />}
                        <Drawer
                            title="工具箱"
                            placement="right"
                            onClose={onClose}
                            open={open}
                            contentWrapperStyle={{ width: '50vw' }}
                        >
                            <MyToolBar box={true} />
                        </Drawer>
                    </Col>
                </Row>
            </Col>
        );
    }
);
// const ToolBar: FC<{
//     theme: 'dark' | 'light';
//     changeTheme: SwitchChangeEventHandler;
//     ref: Ref<HTMLDivElement>;
// }> = (props) => {
//     const { theme, changeTheme } = props;
//     const [open, setOpen] = useState(false);
//     const screens = useBreakpoint();
//     const showDrawer = () => {
//         setOpen(true);
//     };

//     const onClose = () => {
//         setOpen(false);
//     };
//     return (
//         <Col flex="none">
//             <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }} ref={props.ref}>
//                 {screens.lg && <MyToolBar />}
//                 <Col>
//                     <Switch
//                         checked={theme === 'dark'}
//                         onChange={changeTheme}
//                         checkedChildren="dark"
//                         unCheckedChildren="light"
//                     />
//                 </Col>
//                 <Col>
//                     <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
//                         <Avatar src="https://joeschmoe.io/api/v1/random" />
//                     </Dropdown>
//                 </Col>
//                 <Col>
//                     {!screens.lg && <SettingOutlined className="icon" onClick={showDrawer} />}
//                     <Drawer
//                         title="工具箱"
//                         placement="right"
//                         onClose={onClose}
//                         open={open}
//                         contentWrapperStyle={{ width: '50vw' }}
//                     >
//                         <MyToolBar box={true} />
//                     </Drawer>
//                 </Col>
//             </Row>
//         </Col>
//     );
// };
export { ToolBar };
