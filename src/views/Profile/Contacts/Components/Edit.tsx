import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { Form as RForm, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { updateContact } from '../contacts';
const { TextArea } = Input;
export async function editAction({ request, params }: { request: any; params: any }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/profile/contacts/${params.contactId}`);
}
export function EditContact() {
    const contact = useLoaderData() as any;
    const navigate = useNavigate();
    return (
        <RForm method="post" className="ant-form ant-form-horizontal">
            <Form.Item
                label="Name"
                name="username"
                // rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Form.Item name="First name" style={{ display: 'inline-block', width: '50% ' }}>
                    <Input
                        placeholder="First"
                        aria-label="First name"
                        type="text"
                        name="first"
                        defaultValue={contact?.first}
                    />
                </Form.Item>
                <Form.Item name="Last name" style={{ display: 'inline-block', width: '50%' }}>
                    <Input
                        placeholder="Last"
                        aria-label="Last name"
                        type="text"
                        name="last"
                        defaultValue={contact.last}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Twitter">
                {' '}
                <Input
                    type="text"
                    name="twitter"
                    placeholder="@jack"
                    defaultValue={contact.twitter}
                />
            </Form.Item>
            <Form.Item label="Avatar URL">
                <Input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={contact.avatar}
                />
            </Form.Item>
            <Form.Item label="Notes">
                <TextArea name="notes" defaultValue={contact.notes} rows={6} />
            </Form.Item>
            <Space>
                <Button htmlType="submit">Save</Button>
                <Button onClick={() => navigate(-1)}>Cancel</Button>
            </Space>
        </RForm>
    );
}
