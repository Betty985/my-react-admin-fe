import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import { MyButton } from '@/components/ui/Button';
import { Dashboard } from '@/components/Dashboard';
import {
    Error_403,
    Error_404,
    Error_500,
    Home,
    Login,
    Waterfall,
    T,
    Contacts,
    Contact,
    contactsLoader,
    contactsAction,
    contactLoader,
    EditContact,
    editAction,
    destroyAction,
    Index,
} from '@/views';
const routes = [
    {
        path: '/',
        element: <Dashboard />,
        errorElement: <Error_404 />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'waterfall',
                element: <Waterfall />,
            },
            {
                path: 'button',
                element: <MyButton />,
            },
            {
                path: '403',
                element: <Error_403 />,
            },
            {
                path: '404',
                element: <Error_404 />,
            },
            {
                path: '500',
                element: <Error_500 />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 't',
                element: <T />,
            },
            {
                path: 'profile',
                element: <Contacts />,
                loader: contactsLoader,
                action: contactsAction,
                children: [
                    { index: true, element: <Index /> },
                    {
                        path: 'contacts/:contactId',
                        element: <Contact />,
                        loader: contactLoader,
                    },
                    {
                        path: 'contacts/:contactId/edit',
                        element: <EditContact />,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: 'contacts/:contactId/destroy',
                        action: destroyAction,
                        errorElement: <div>Oops! There was an error.</div>,
                    },
                ],
            },
        ],
    },
];
const router = createBrowserRouter(routes);
export { router };
