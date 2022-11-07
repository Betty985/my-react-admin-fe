import {
    Space,
    Table,
    Tag,
    Card,
    Switch,
    message,
    Button,
    Form,
    Input,
    Select,
    Grid,
    Popconfirm,
    PaginationProps,
    Drawer,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import React, { FC, useState } from 'react';
import { data } from './mock';
import { Title, SearchForm } from './components';
import { colorMap } from '@/consts';
import { RoleForm } from './components/RoleForm';
export interface DataType {
    key: string;
    name: string;
    account: number;
    address: string;
    tags: string[];
    note?: string;
    date?: string;
    state: boolean;
}

export const System: FC<{ pageSize?: number }> = (props) => {
    const { pageSize = 4 } = props;
    const [dataSource, setDataSource] = useState<DataType[]>(data);
    const [filterData, setFilterData] = useState<DataType[] | null>(null);
    const [total, setTotal] = useState(data.length);
    const [size, setSize] = useState<'small' | 'middle' | 'large' | undefined>('middle');
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        setFilterData(null);
        setTotal(dataSource.length);
    };

    const onFinish = (values: any) => {
        const filterD = dataSource.filter((value) => {
            if (values.name && values.state) {
                return value.name === values.name && value.state === values.state;
            } else if (values.name) {
                return value.name === values.name;
            } else if (values.state !== undefined) {
                return value.state === values.state;
            } else {
                return true;
            }
        });
        setFilterData(filterD);
        setTotal(filterD.length);
    };
    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        setTotal(newData.length);
    };
    const handleEdit = (item: DataType, row: number) => {
        const newData = dataSource.map((data, index) => {
            const curRow = (current - 1) * pageSize + row;
            if (index === curRow) {
                return item;
            } else {
                return data;
            }
        });
        setDataSource(newData);
    };
    const handleAdd = (item: DataType) => {
        const newData = [...dataSource, item];
        setDataSource(newData);
        setTotal(newData.length);
    };
    const [current, setCurrent] = useState(1);

    const onPaginationChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };
    const EditButton: FC<{ action: Function; record: any; row: number }> = (props) => {
        const { action, record, row } = props;
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
                <Drawer open={open} onClose={onClose} title="编辑角色">
                    <RoleForm action={action} close={onClose} initData={record} row={row} />
                </Drawer>
                <Button type="link" icon={<EditOutlined className="icon" />} onClick={showDrawer} />
            </>
        );
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'State',
            key: 'state',
            render: (_, record, row) => (
                <Switch
                    checkedChildren="已启用"
                    unCheckedChildren="已禁用"
                    defaultChecked={record.state}
                    onClick={(state) => {
                        const newRecord = Object.assign({}, record, { state });
                        handleEdit(newRecord, row);
                        const s = state ? '启用' : '禁用';
                        message.success(`角色状态已切换为${s}`);
                    }}
                />
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        const color = colorMap.get(tag.toUpperCase()) || 'orange';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: { key: React.Key }, row) =>
                data.length >= 1 ? (
                    <Space wrap>
                        <EditButton action={handleEdit} record={record} row={row} />
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Button type="link" danger>
                                <DeleteOutlined className="icon" />
                            </Button>
                        </Popconfirm>
                    </Space>
                ) : null,
        },
    ];
    return (
        <Space direction="vertical" className="w-full">
            <SearchForm onFinish={onFinish} onReset={onReset} />
            <Card title={<Title handleAdd={handleAdd} setSize={setSize} />} hoverable>
                <Table
                    columns={columns}
                    dataSource={filterData === null ? dataSource : filterData}
                    size={size}
                    pagination={{
                        current: current,
                        total: total,
                        pageSize: pageSize,
                        onChange: onPaginationChange,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                />
            </Card>
        </Space>
    );
};
