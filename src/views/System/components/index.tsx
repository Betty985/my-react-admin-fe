import { Button, Row, Drawer, Space, MenuProps, Dropdown, Tooltip } from 'antd';
import React, { FC, useState } from 'react';

import { RoleForm } from './RoleForm';
import { ColumnHeightOutlined } from '@ant-design/icons';
export { SearchForm } from './SearchForm';
export interface DataType {
    key: string;
    name: string;
    account: number;
    address: string;
    tags: string[];
    note?: string;
    date?: string;
}

export const Title: FC<{ handleAdd: Function; setSize: Function }> = (props) => {
    const { handleAdd, setSize } = props;
    // 抽屉
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const items: MenuProps['items'] = [
        {
            key: 'small',
            label: '紧凑',
        },

        {
            key: 'middle',
            label: '默认',
        },
        {
            key: 'large',
            label: '松散',
        },
    ];
    const onClick: MenuProps['onClick'] = ({ key }) => {
        setSize(key);
    };
    return (
        <>
            <Drawer open={open} onClose={onClose} title="新增角色">
                <RoleForm action={handleAdd} close={onClose} />
            </Drawer>
            <Row justify="space-between">
                角色列表
                <Space>
                    <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
                        <Tooltip title="密度">
                            <Button type="link" icon={<ColumnHeightOutlined className="icon" />} />
                        </Tooltip>
                    </Dropdown>

                    <Button type="primary" onClick={showDrawer}>
                        新增
                    </Button>
                </Space>
            </Row>
        </>
    );
};
