export interface IMenu {
    key: string;
    label: string;
    icon?: string;
    element?: string;
    query?: string;
    children?: any;
}
const menu: IMenu[] = [
    {
        key: '/button',
        label: 'button',
    },
    {
        key: '/login',
        label: 'login',
    },
    {
        key: '/errors',
        label: 'errors',
        children: [
            {
                key: '/403',
                label: '403',
            },
            {
                key: '/404',
                label: '404',
            },
            {
                key: '/500',
                label: '500',
            },
        ],
    },
];
export { menu };
