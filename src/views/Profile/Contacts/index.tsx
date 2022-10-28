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
import { PATH_HOME } from '@/consts';
export {
    contactLoader,
    Contact,
    EditContact,
    editAction,
    favoriteAction,
    Index,
} from './Components';

export async function contactsLoader({ request }: { request: any }) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q);
    return { contacts, q };
}
export async function contactsAction() {
    const contact = await createContact();
    return redirect(`${PATH_HOME}/profile/contacts/${contact.id}/edit`);
}

export async function destroyAction({ params }: { params: any }) {
    // throw new Error("oh dang!");
    await deleteContact(params.contactId);
    return redirect(`${PATH_HOME}/profile/contacts`);
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
                                    <Form role="search" action={`${PATH_HOME}/profile/contacts`}>
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
                                    <Form method="post" action={`${PATH_HOME}/profile/contacts`}>
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
