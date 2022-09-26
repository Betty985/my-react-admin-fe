import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { breads } from '@/consts';
function itemRender(route: any, params: any, routes: any, paths: string[]) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
}
const MyBreadcrumb: FC = () => {
    return (
        <div className="breadcrumb">
            <Breadcrumb routes={breads} itemRender={itemRender}/>
        </div>
    );
};

export { MyBreadcrumb };
