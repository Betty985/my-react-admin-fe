import React from 'react';
import { Form, Outlet, NavLink, useLoaderData, redirect , useNavigation} from 'react-router-dom';
import { getContacts ,createContact,deleteContact} from './contacts';
export {contactLoader,Contact,EditContact,editAction} from './Components'
export async function contactsLoader() {
    const contacts = await getContacts();
    return { contacts };
}
export async function contactsAction() {
    const contact=await createContact();
    return redirect(`/profile/contacts/${contact.id}/edit`)
  }

  export async function destroyAction({params}:{params:any}) {
    // throw new Error("oh dang!");
      await deleteContact(params.contactId)
      return redirect('/profile')
      
  }
type A={
    contacts:any
}
export function Contacts() {
    const {contacts}= useLoaderData() as A;
    const navigation = useNavigation();
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                {contacts.length ? (
            <ul>
              {contacts.map((contact:any) => (
                <li key={contact.id}>
                 <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
                </nav>
            </div>
            <div id="detail"  className={
          navigation.state === "loading" ? "loading" : ""
        }>
                <Outlet />
            </div>
        </>
    );
}

export function Index(){
    return (
        <p id="zero-state">
          This is a demo for React Router.
          <br />
        </p>
      );
}