import { IMenu } from '@/types';
import {
    HomeOutlined,
    PictureOutlined,
    SettingOutlined,
    EditOutlined,
    BugOutlined,
} from '@ant-design/icons';
import React from 'react';
const MSG_403 = 'Sorry, you are not authorized to access this page.';
const MSG_404 = 'Sorry, the page you visited does not exist.';
const MSG_500 = 'Sorry, something went wrong.';
const initColor = {
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
};
const menu: IMenu[] = [
    {
        key: 'home',
        label: 'home',
        icon: <HomeOutlined />,
    },
    {
        key: 'waterfall',
        label: 'waterfall',
        icon: <PictureOutlined />,
    },
    {
        key: 'button',
        label: 'button',
        icon: <BugOutlined />,
    },
    {
        key: 'editor',
        label: 'editor',
        icon: <EditOutlined />,
    },
    {
        key: 'login',
        label: 'login',
        icon: <BugOutlined />,
    },
    {
        key: 't',
        label: 't',
        icon: <BugOutlined />,
    },
    {
        key: 'system',
        label: 'system',
        icon: <SettingOutlined />,
    },
    {
        key: 'errors',
        label: 'errors',
        icon: <BugOutlined />,
        children: [
            {
                key: '403',
                label: '403',
            },
            {
                key: '404',
                label: '404',
            },
            {
                key: '500',
                label: '500',
            },
        ],
    },
];

export { MSG_403, MSG_404, MSG_500, menu, initColor };
