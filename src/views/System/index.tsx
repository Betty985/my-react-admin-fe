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
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import React, { FC, useState } from 'react';
import { data } from './mock';
import { Title } from './components';
import { colorMap } from '@/consts';
const { Option } = Select;
const { useBreakpoint } = Grid;
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
const onhandleSwitch = (e: boolean) => {
    const s = e ? '启用' : '禁用';
    message.success(`角色状态已切换为${s}`);
};

export const System: FC<{ pageSize?: number }> = (props) => {
    const { pageSize = 4 } = props;
    const [dataSource, setDataSource] = useState<DataType[]>(data);
    const [total, setTotal] = useState(data.length);

    const [form] = Form.useForm();
    const screens = useBreakpoint();
    const onReset = () => {
        form.resetFields();
    };
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const onFinish = (values: any) => {
        console.log(values);
    };
    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        setTotal(newData.length);
    };
    const handleAdd = (item: DataType) => {
        const newData = [...dataSource, item];
        setDataSource(newData);
        setTotal(newData.length);
    };
    const [current, setCurrent] = useState(3);

    const onPaginationChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
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
            render: (_, { state }) => (
                <Switch
                    checkedChildren="已启用"
                    unCheckedChildren="已禁用"
                    defaultChecked={state}
                    onClick={onhandleSwitch}
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
            render: (_, record: { key: React.Key }) =>
                data.length >= 1 ? (
                    <Space className="action">
                        <Button type="link" icon={<EditOutlined className="icon" />} />
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
            <Card>
                <Form form={form} layout={screens.lg ? 'inline' : 'vertical'} onFinish={onFinish}>
                    <Form.Item label="角色名称：" name="role">
                        <Input placeholder="input name" />
                    </Form.Item>
                    <Form.Item label="状态" name="state">
                        <Select
                            placeholder="Select a state"
                            optionFilterProp="children"
                            onChange={onChange}
                        >
                            <Option value="open">启用</Option>
                            <Option value="close">禁用</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={<Title handleAdd={handleAdd} />} hoverable>
                <Table
                    columns={columns}
                    dataSource={dataSource}
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
