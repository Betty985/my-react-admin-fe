import { Button, Row, Drawer, Form, Input, Space, Radio, Mentions } from 'antd';

import React, { FC, useState } from 'react';
const { Option, getMentions } = Mentions;
export interface DataType {
    key: string;
    name: string;
    account: number;
    address: string;
    tags: string[];
    note?: string;
    date?: string;
}
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
const Items = [
    {
        label: '角色名称',
        name: 'role',
        element: <Input placeholder="input name" />,
    },
    {
        label: '角色账号',
        name: 'account',
        element: <Input placeholder="input account" />,
    },
    {
        label: '角色状态',
        name: 'state',
        element: (
            <Radio.Group>
                <Radio value={true}> 启用 </Radio>
                <Radio value={false}> 禁用 </Radio>
            </Radio.Group>
        ),
    },
    {
        label: '地址',
        name: 'address',
        element: <Input placeholder="input address" />,
    },
    {
        label: '标签',
        name: 'tags',
        element: <Input placeholder="input name" />,
    },
];
export const Title: FC = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <>
            <Drawer open={open} onClose={onClose} title="新增角色">
                <Form form={form}>
                    {Items.map((i) => {
                        const { name, label, element } = i;
                        const rules = [{ required: true }];
                        return (
                            <Form.Item label={label} name={name} key={name} rules={rules}>
                                {element}
                            </Form.Item>
                        );
                    })}
                    <Form.Item name="note" label="备注">
                        <Mentions rows={3} placeholder="You can use @ to ref user here">
                            <Option value="afc163">afc163</Option>
                            <Option value="zombieJ">zombieJ</Option>
                            <Option value="yesmeck">yesmeck</Option>
                        </Mentions>
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
