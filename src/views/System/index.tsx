import { Space, Table, Tag, Card, Switch, message, Button, Form, Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import React, { FC } from 'react';
import { data } from './mock';
const { Option } = Select;
export interface DataType {
    key: string;
    name: string;
    account: number;
    address: string;
    tags: string[];
    note?: string;
    date?: string;
}
const onhandleSwitch = (e: boolean) => {
    const s = e ? '启用' : '禁用';
    message.success(`角色状态已切换为${s}`);
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
        render: (_) => (
            <Switch
                checkedChildren="已启用"
                unCheckedChildren="已禁用"
                defaultChecked
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
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'ui') {
                        color = 'volcano';
                    }
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
        render: (_) => (
            <Space className="action">
                <Button type="link" icon={<EditOutlined className="icon" />} />
                <Button type="link" danger>
                    <DeleteOutlined className="icon" />
                </Button>
            </Space>
        ),
    },
];

export const System: FC = () => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Space direction="vertical" className="w-full">
            <Card>
                <Form form={form} layout="inline">
                    <Form.Item label="角色名称：">
                        <Input placeholder="input name" />
                    </Form.Item>
                    <Form.Item label="状态">
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
            <Card title="角色列表" hoverable>
                <Table columns={columns} dataSource={data} />
            </Card>
        </Space>
    );
};
