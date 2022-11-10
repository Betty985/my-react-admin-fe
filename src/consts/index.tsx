import { IMenu } from '@/types';
import {
    HomeOutlined,
    PictureOutlined,
    SettingOutlined,
    EditOutlined,
    BugOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';
import { OptionProps } from '@/types';
import React from 'react';
export * from './url';
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
        key: 'bigSreen',
        label: 'bigSreen',
        icon: <AreaChartOutlined />,
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
const list = menu
    .map((i) => {
        const { label, key, icon, children } = i;
        if (children) {
            let child = children.map((j: OptionProps) => {
                const tmp = j.key;
                const res = Object.assign({}, j, { key: `${key}/${tmp}` });
                return res;
            });
            let res = [{ label, key, icon }].concat(child);
            return res;
        } else {
            return i;
        }
    })
    .flat(Infinity) as OptionProps[];
const colorArray = [
    ['UI', 'volcano'],
    ['FE', 'purple'],
    ['SERVER', 'blue'],
    ['PM', 'gold'],
    ['QA', 'red'],
    ['TEACHER', 'lime'],
];
const colorMap = new Map([
    ['UI', 'volcano'],
    ['FE', 'purple'],
    ['SERVER', 'blue'],
    ['PM', 'gold'],
    ['QA', 'red'],
    ['TEACHER', 'lime'],
]);
export { MSG_403, MSG_404, MSG_500, menu, initColor, list, colorMap, colorArray };
