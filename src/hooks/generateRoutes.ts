import {IBreads,IMenu} from '@/types'
const menu: IMenu[] = [
    {
        key: '/home',
        label: 'home',
    },
      {
        key: '/waterfall',
        label: 'waterfall',
    },
    {
        key: '/button',
        label: 'button',
    },
    {
        key: '/login',
        label: 'login',
    },{
        key: '/t',
        label: 't',
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
function generateRoutes() {
    let tmp = JSON.stringify(menu),breads:IBreads[];
    tmp=tmp.replace(/\"key\":/g, '"path":').replace(/\"label\":/g, '"breadcrumbName":');
    breads=JSON.parse(tmp)
    return {
        menu,breads
    }
}
export {generateRoutes}