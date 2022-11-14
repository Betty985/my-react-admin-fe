import { Card } from 'antd';
import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
export const MyCard: FC<{ title?: string; children?: ReactNode }> = (props) => {
    const { title, children } = props;
    return (
        <Card title={title} extra={<Link to="/profile">关闭</Link>} hoverable>
            {children}
        </Card>
    );
};
