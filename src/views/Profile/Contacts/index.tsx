import { Button, Card, Divider, Input, List } from 'antd';
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
import { Col, Row } from 'antd';
import { getContacts, createContact, deleteContact } from './contacts';
export { contactLoader, Contact, EditContact, editAction, favoriteAction } from './Components';

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
export function Contacts() {
    const { contacts, q } = useLoaderData() as A;
    const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
        navigation.location && new URLSearchParams(navigation.location.search).has('q');
    useEffect(() => {
        let dom = document.getElementById('q') as HTMLInputElement;
        dom.value = q;
    }, [q]);
    return (
        <div className="rounded h-full">
            <Card title="通讯录" extra={<Link to="/profile">关闭</Link>} hoverable>
                <Row gutter={16}>
                    <Col span={6}>
                        <div className="bg-[#fafafa] p-5">
                            <Row justify="space-around">
                                <Form id="search-form" role="search">
                                    <Input.Search
                                        id="q"
                                        className={searching ? 'loading' : ''}
                                        aria-label="Search contacts"
                                        placeholder="Search"
                                        type="search"
                                        name="q"
                                        defaultValue={q}
                                        onChange={(e) => {
                                            const isFirstSearch = q === null;
                                            submit(e.currentTarget.form, {
                                                replace: !isFirstSearch,
                                            });
                                        }}
                                    />
                                    <div id="search-spinner" aria-hidden hidden={!searching} />
                                    <div className="sr-only" aria-live="polite"></div>
                                </Form>
                                <Form method="post">
                                    <Button htmlType="submit" type="primary">
                                        New
                                    </Button>
                                </Form>
                            </Row>
                            <nav className=''>
                                {contacts.length ? (
                                    <List
                                        dataSource={contacts}
                                        split={false}
                                        renderItem={(contact: any) => (
                                            <List.Item key={contact.id}>
                                                <NavLink
                                                    to={`${contact.id}`}
                                                    className={({ isActive, isPending }) =>
                                                        isActive
                                                            ? 'active'
                                                            : isPending
                                                            ? 'pending'
                                                            : ''
                                                    }
                                                >
                                                    {contact.first || contact.last ? (
                                                        <>
                                                            {contact.first} {contact.last}
                                                        </>
                                                    ) : (
                                                        <i>No Name</i>
                                                    )}
                                                    {contact.favorite && <span>★</span>}
                                                </NavLink>
                                            </List.Item>
                                        )}
                                    ></List>
                                ) : (
                                    <p>
                                        <i>No contacts</i>
                                    </p>
                                )}
                            </nav>
                        </div>
                    </Col>
                    <Col span={10}>
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
}

export function Index() {
    return (
        <p id="zero-state">
            This is a demo for React Router.
            <br />
        </p>
    );
}
