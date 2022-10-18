import React, { useEffect } from 'react';
import {
    Form,
    Outlet,
    NavLink,
    useLoaderData,
    redirect,
    useNavigation,
    useSubmit,
    Link,
} from 'react-router-dom';
import { Row, Col, Button, Image, Space, Card, Divider, Input, List, Typography } from 'antd';
import { getContacts, createContact, deleteContact } from './contacts';
import { TwitterOutlined, BookFilled, StarTwoTone } from '@ant-design/icons';
import { useTheme } from '@/hooks';
import { observer } from 'mobx-react-lite';
export { contactLoader, Contact, EditContact, editAction, favoriteAction } from './Components';
const { Text, Title } = Typography;
export async function contactsLoader({ request }: { request: any }) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q);
    return { contacts, q };
}
export async function contactsAction() {
    const contact = await createContact();
    return redirect(`/profile/contacts/${contact.id}/edit`);
}

export async function destroyAction({ params }: { params: any }) {
    // throw new Error("oh dang!");
    await deleteContact(params.contactId);
    return redirect('/profile/contacts');
}
type A = {
    contacts: any;
    q: any;
};
export const Contacts = observer(() => {
    const { contacts, q } = useLoaderData() as A;
    const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
        navigation.location && new URLSearchParams(navigation.location.search).has('q');

    const { theme } = useTheme();
    useEffect(() => {
        console.log(theme.infoColor, 'jjjj');
    }, [theme]);
    useEffect(() => {
        let dom = document.getElementById('q') as HTMLInputElement;
        dom.value = q;
    }, [q]);
    return (
        <div className="rounded h-full">
            <Card title="通讯录" extra={<Link to="/profile">关闭</Link>} hoverable>
                <Row gutter={24}>
                    <Col span={6}>
                        <div className="bg-[#fafafa] p-5">
                            <Row justify="space-between" gutter={{ xs: 8, sm: 16, md: 24 }}>
                                <Col span={18}>
                                    <Form role="search">
                                        <Input.Search
                                            id="q"
                                            loading={searching}
                                            aria-label="Search contacts"
                                            placeholder="Search"
                                            type="search"
                                            name="q"
                                            allowClear
                                            defaultValue={q}
                                            onChange={(e) => {
                                                const isFirstSearch = q === null;
                                                submit(e.currentTarget.form, {
                                                    replace: !isFirstSearch,
                                                });
                                            }}
                                        />
                                    </Form>
                                </Col>
                                <Col span={6}>
                                    <Form method="post">
                                        <Button htmlType="submit" type="primary">
                                            New
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                            <Divider />
                            <nav>
                                {contacts.length ? (
                                    <List
                                        dataSource={contacts}
                                        split={false}
                                        renderItem={(contact: any) => (
                                            <List.Item key={contact.id} style={{ padding: '0' }}>
                                                <NavLink
                                                    to={`${contact.id}`}
                                                    className={({ isActive, isPending }) => {
                                                        const all = 'block w-full p-3 rounded-lg';
                                                        if (isActive) {
                                                            return 'ant-btn-primary ' + all;
                                                        } else if (isPending) {
                                                            return 'ant-btn-default ' + all;
                                                        } else {
                                                            return 'ant-btn-text ' + all;
                                                        }
                                                    }}
                                                >
                                                    <Space align="center">
                                                        {contact.first || contact.last ? (
                                                            <>
                                                                {contact.first}
                                                                {contact.last}
                                                            </>
                                                        ) : (
                                                            <>No Name</>
                                                        )}
                                                        {contact.favorite && <span>★</span>}
                                                    </Space>
                                                </NavLink>
                                            </List.Item>
                                        )}
                                    />
                                ) : (
                                    <p>
                                        <i>No contacts</i>
                                    </p>
                                )}
                            </nav>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div
                            id="detail"
                            className={navigation.state === 'loading' ? 'loading' : ''}
                        >
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
});

export function Index() {
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} className="w-full">
            <Col span={8}>
                <Image
                    src={
                        'https://images.unsplash.com/photo-1434394354979-a235cd36269d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2902&q=80'
                    }
                    className="rounded"
                    fallback="data:image/png;base64,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"
                />
            </Col>

            <Col span={12}>
                <Space direction="vertical">
                    <Title level={2}>
                        <Space>
                            name and surname
                            <StarTwoTone twoToneColor={'#bfbfbf'} />
                        </Space>
                    </Title>

                    <Title level={4}>
                        <Typography.Link href="https://twitter.com/contact.twitter" target="_blank">
                            <Space>
                                <TwitterOutlined />
                                contact.twitter
                            </Space>
                        </Typography.Link>
                    </Title>

                    <Text>
                        <Space>
                            <BookFilled />
                            This is sample text where you can write notes.
                        </Space>
                    </Text>

                    <Space>
                        <Button htmlType="submit">Edit</Button>

                        <Button htmlType="submit" danger>
                            Delete
                        </Button>
                    </Space>
                </Space>
            </Col>
        </Row>
    );
}
