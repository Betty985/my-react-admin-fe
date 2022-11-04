import {
    Button,
    Row,
    Drawer,
    Form,
    Input,
    Space,
    Radio,
    Mentions,
    Cascader,
    message,
    Alert,
    Tag,
} from 'antd';
import React, { FC, useRef, useState } from 'react';
import { InputTag } from '@/components';
import dayjs from 'dayjs';
import { colorArray } from '@/consts';
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
const format = 'YYYY-MM-DD HH:mm:ss';
const colorDemo = colorArray.map((i) => {
    const [k, v] = i;
    return <Tag color={v}>{k}</Tag>;
});
interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

const options: Option[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
            },
        ],
    },
    {
        value: 'beijing',
        label: 'Beijing',
    },
];
const Items = [
    {
        label: '角色名称',
        name: 'name',
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
        element: <Cascader options={options} placeholder="select address" />,
    },
];
export const Title: FC<{ handleAdd: Function }> = (props) => {
    const { handleAdd } = props;
    // 抽屉
    const [open, setOpen] = useState(false);
    // 提示
    const [visible, setVisible] = useState(true);
    const tagsRef = useRef<string[]>([]);
    const [form] = Form.useForm();
    const getTags = (tags: string[]) => {
        tagsRef.current = tags;
    };
    const showDrawer = () => {
        setOpen(true);
        onReset();
    };

    const onClose = () => {
        setOpen(false);
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = (values: any) => {
        const result = Object.assign({}, values, {
            tags: tagsRef.current,
            date: dayjs().format(format),
            address: values.address.join(' '),
            key: Date.now(),
        });
        handleAdd(result);
        message.info('操作成功');
        onClose();
    };
    return (
        <>
            <Drawer open={open} onClose={onClose} title="新增角色">
                <Form form={form} onFinish={onFinish}>
                    {Items.map((i) => {
                        const { name, label, element } = i;
                        const rules = [{ required: true, message: '该项为必填项' }];
                        return (
                            <Form.Item label={label} name={name} key={name} rules={rules}>
                                {element}
                            </Form.Item>
                        );
                    })}
                    <Form.Item name="tags" label="标签">
                        <InputTag getTags={getTags} />
                    </Form.Item>
                    {visible ? (
                        <Alert
                            message="预设标签颜色"
                            description={
                                <>
                                    <Space wrap>{colorDemo}</Space>
                                    其他标签颜色为：<Tag color="orange">其他</Tag>
                                </>
                            }
                            type="info"
                            closable
                            afterClose={() => setVisible(false)}
                        />
                    ) : null}
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
