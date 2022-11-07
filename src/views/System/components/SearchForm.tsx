import { Space, Card, Button, Form, Input, Select, Grid } from 'antd';

import React, { FC } from 'react';
const { Option } = Select;
const { useBreakpoint } = Grid;
export const SearchForm: FC<{
    onFinish: (values: any) => void;
    onReset: React.MouseEventHandler<HTMLElement> | undefined;
}> = (props) => {
    const { onFinish, onReset } = props;
    const [form] = Form.useForm();
    const screens = useBreakpoint();

    return (
        <Card>
            <Form form={form} layout={screens.lg ? 'inline' : 'vertical'} onFinish={onFinish}>
                <Form.Item label="角色名称：" name="name">
                    <Input placeholder="input name" />
                </Form.Item>
                <Form.Item label="状态" name="state">
                    <Select placeholder="Select a state" optionFilterProp="children">
                        <Option value={true}>启用</Option>
                        <Option value={false}>禁用</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
};
