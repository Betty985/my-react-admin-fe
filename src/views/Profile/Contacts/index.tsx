import React ,{useEffect}from 'react';
import { Form, Outlet, NavLink, useLoaderData, redirect , useNavigation,useSubmit} from 'react-router-dom';
import { getContacts ,createContact,deleteContact} from './contacts';
export {contactLoader,Contact,EditContact,editAction,favoriteAction} from './Components'
export async function contactsLoader({request}:{request:any}) {
  const url=new URL(request.url)
  const q=url.searchParams.get('q')
    const contacts = await getContacts(q);
    return { contacts,q };
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
    contacts:any,
    q:any
}
export function Contacts() {
    const {contacts,q}= useLoaderData() as A;
    const navigation = useNavigation();
    const submit=useSubmit()
    const searching=navigation.location&&new URLSearchParams(navigation.location.search).has('q')
    useEffect(()=>{
      let dom = document.getElementById('q') as HTMLInputElement
      dom.value=q
    },[q])
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching?'loading':''}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(e)=>{
                              const isFirstSearch=q===null
                              submit(e.currentTarget.form,{
                                replace:!isFirstSearch
                              })}}
                        />
                        <div id="search-spinner" aria-hidden hidden={!searching} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
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