import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { getContact} from '../contacts';

export async function contactLoader({params}:any) {
    
  return getContact(params.contactId);
}
export function Contact() {
    const contact = useLoaderData() as any

    return (
        <div id="contact">
            <div>
                <img key={contact.avatar} src={contact.avatar || undefined} />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{' '}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (!window.confirm('Please confirm you want to delete this record.')) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite(contact:any) {
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? 'false' : 'true'}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {favorite ? '★' : '☆'}
            </button>
        </Form>
    );
}