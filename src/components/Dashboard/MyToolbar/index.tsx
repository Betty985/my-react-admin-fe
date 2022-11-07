import React, { FC } from 'react';
import { Theme, Fullscreen, Notification, Watermark, Search } from './components';
import { Descriptions, Space } from 'antd';
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
export { MyToolBar };
