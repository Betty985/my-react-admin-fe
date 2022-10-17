/** 换肤 */
import React, { FC, useState } from 'react';
import { Col, Tabs, ConfigProvider, Modal } from 'antd';

import { SkinOutlined } from '@ant-design/icons';

import { SketchPicker } from 'react-color';

import { useStores } from '@/hooks';
const initColor = {
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
};
export const Theme: FC = () => {
    const [color, setColor] = useState(() => initColor);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { globalStore } = useStores();
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
        setColor(() => initColor);
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
        globalStore.setTheme(mergedNextColor);
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
