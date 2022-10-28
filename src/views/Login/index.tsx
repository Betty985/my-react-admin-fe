import React, { FC, useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import {
    LockOutlined,
    UserOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    PhoneOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginInfo } from './login';
import { Lock, LockType } from '@/components';
import { VerificationCode } from './Components';
const url =
    'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1024&amp;h=1280&amp;q=80';
const formUrl = 'https://tailwindcss.com/_next/static/media/docs@tinypng.d9e4dcdc.png';
const Layout1 = (props: { children: React.ReactNode }) => (
    <div className="h-screen flex">
        <div
            className="basis-6/12 bg-cover bg-white/30 shadow-xl shadow-zinc-500 "
            style={{ backgroundImage: `url(${url})` }}
        ></div>
        <div
            className="flex flex-col basis-6/12 justify-center items-center  bg-cover bg-right-top"
            style={{ backgroundImage: `url(${formUrl})` }}
        >
            {props.children}

            <Lock type={LockType.BUTTON}>
                <Button type="primary"> 仅vip可用</Button>
            </Lock>
        </div>
    </div>
);
const Layout = (props: { children: React.ReactNode }) => (
    <div className="h-screen">
        <div
            className="h-60 basis-6/12 bg-cover bg-white/30 shadow-xl shadow-zinc-500 bg-bottom"
            style={{ backgroundImage: `url(${url})` }}
        ></div>
        <div
            className="flex flex-col basis-6/12 justify-center items-center  bg-cover bg-right-bottom"
            style={{ backgroundImage: `url(${formUrl})` }}
        >
            {props.children}

            <Lock type={LockType.BUTTON}>
                <Button type="primary"> 仅vip可用</Button>
            </Lock>
        </div>
    </div>
);
const Login: FC = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const onFinish = (values: any) => {
        setLoginInfo(values);
        navigate('/');
    };
    return (
        <Layout>
            <Form
                name="normal_login"
                className="w-6/12"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your verification code!',
                        },
                        {
                            pattern: new RegExp(code),

                            message: 'Wrong verification code!',
                        },
                    ]}
                    hasFeedback
                >
                    <Space>
                        <VerificationCode onChange={(num: any) => setCode(num)} />
                        <Input placeholder="请输入验证码" />
                    </Space>
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                    Or <Link to="register">register now!</Link>
                </Form.Item>
            </Form>
        </Layout>
    );
};
const Register: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    return (
        <Layout>
            <Form
                name="normal_login"
                className="w-6/12"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone!' }]}
                >
                    <Input prefix={<PhoneOutlined />} placeholder="Phone" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="password2"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="confirm the password"
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>
                            I have carefully read and accept the
                            <a> Privacy Policy</a>
                        </Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    Or <a href="/login">Log in</a>
                </Form.Item>
            </Form>
        </Layout>
    );
};
export { Login, Register };
