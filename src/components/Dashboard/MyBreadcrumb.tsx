import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Row } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useStores } from '@/hooks';
function itemRender(route: any, params: any, routes: any, paths: string[]) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
}
const MyBreadcrumb: FC = () => {
    const [route, setRoute] = useState();
    const { globalStore } = useStores();
    const location = useLocation();
    useEffect(() => {
        const str = globalStore.tab.key || 'home';
        const arr = str.split('/').map((i: string) => {
            let r = {
                path: i,
                breadcrumbName: i,
            };
            return r;
        });
        setRoute(arr);
    }, [location]);

    return (
        <Row align="middle" className="breadcrumb">
            <ExclamationCircleOutlined className="breadcrumbIcon" />
            <Breadcrumb items={route} itemRender={itemRender} />
        </Row>
    );
};

export { MyBreadcrumb };
