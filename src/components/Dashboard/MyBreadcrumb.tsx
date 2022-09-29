import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Col, Row } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
            <Row align="middle" className="breadcrumb">
                <ExclamationCircleOutlined className='breadcrumbIcon'/>
                <Breadcrumb routes={breads} itemRender={itemRender} />
            </Row>
    );
};

export { MyBreadcrumb };
