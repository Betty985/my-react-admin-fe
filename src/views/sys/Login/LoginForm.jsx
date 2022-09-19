import React from "react";
import { Form, Input, Button, Checkbox, Row,Col,Divider } from 'antd';
const getFormRules=()=>{}
const handleLogin=()=>{}
const setLoginState=()=>{}
const LoginForm = () => {
    return (
        <Form
            class="p-4 enter-x"
            rules={getFormRules}
            ref="formRef"
            onKeyDown={handleLogin}
        >
            <Form.Item name="account" class="enter-x">
                <Input
                    size="large"
                    value="formData.account"
                    placeholder={'sys.login.userName'}
                    class="fix-auto-fill"
                />
            </Form.Item>
            <Form.Item name="password" class="enter-x">
                <Input.Password
                    size="large"
                    visibilityToggle
                    value="formData.password"
                    placeholder={'sys.login.password'}
                />
            </Form.Item>

            <Row class="enter-x">
                <Col span="12">
                    <Form.Item>
                        <Checkbox checked={'rememberMe'} size="small">
                            {'sys.login.rememberMe'}
                        </Checkbox>
                    </Form.Item>
                </Col>
                <Col span="12">
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button type="link" size="small" onClick={setLoginState('LoginStateEnum.RESET_PASSWORD')}>
                            {'sys.login.forgetPassword'}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item class="enter-x">
                <Button type="primary" size="large" block onClick="handleLogin" loading={'loading'}>
                    {'sys.login.loginButton'}
                </Button>
            </Form.Item>
            <Row class="enter-x">
                <Col md={8} xs={24}>
                    <Button block onClick="setLoginState(LoginStateEnum.MOBILE)">
                        {'sys.login.mobileSignInFormTitle'}
                    </Button>
                </Col>
                <Col md={8} xs={24} class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
                    <Button block onClick="setLoginState(LoginStateEnum.QR_CODE)">
                        {'sys.login.qrSignInFormTitle'}
                    </Button>
                </Col>
                <Col md={8} xs={24}>
                    <Button block onClick="setLoginState(LoginStateEnum.REGISTER)">
                        {'sys.login.registerButton'}
                    </Button>
                </Col>
            </Row>

            <Divider class="enter-x">{'sys.login.otherSignIn'}</Divider>

            <div class="flex justify-evenly enter-x" className={'sign-in-way'}>
                todo
            </div>
        </Form>
    )
}
export default LoginForm