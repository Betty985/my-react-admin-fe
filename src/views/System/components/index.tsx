import { Button, Row, Drawer } from 'antd';
import React, { FC, useState } from 'react';

import { RoleForm } from './RoleForm';

export interface DataType {
    key: string;
    name: string;
    account: number;
    address: string;
    tags: string[];
    note?: string;
    date?: string;
}

export const Title: FC<{ handleAdd: Function }> = (props) => {
    const { handleAdd } = props;
    // 抽屉
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer open={open} onClose={onClose} title="新增角色">
                <RoleForm action={handleAdd} close={onClose} />
            </Drawer>
            <Row justify="space-between">
                角色列表
                <Button type="primary" onClick={showDrawer}>
                    新增
                </Button>
            </Row>
        </>
    );
};
