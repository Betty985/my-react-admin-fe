import { IMenu } from '@/types';
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
    },
    {
        key: 'waterfall',
        label: 'waterfall',
    },
    {
        key: 'button',
        label: 'button',
    },
    {
        key: 'editor',
        label: 'editor',
    },
    {
        key: 'login',
        label: 'login',
    },
    {
        key: 't',
        label: 't',
    },
    {
        key: 'errors',
        label: 'errors',
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
