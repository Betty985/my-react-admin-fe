import React, { FC } from 'react';
import { Theme, Fullscreen, Notification, Watermark, Search } from './components';
import { Descriptions } from 'antd';
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
                    <Descriptions.Item label="搜索">
                        <Search />
                    </Descriptions.Item>
                    <Descriptions.Item label="水印">
                        <Watermark />
                    </Descriptions.Item>
                    <Descriptions.Item label="换肤">
                        <Theme />
                    </Descriptions.Item>
                    <Descriptions.Item label="全屏">
                        <Fullscreen />
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
