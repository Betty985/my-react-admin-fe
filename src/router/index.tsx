import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { MyButton, Dashboard, ErrorPage, ERROR_403, ERROR_404, ERROR_500 } from '@/components';
import {
    Home,
    Login,
    Register,
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
    favoriteAction,
    Index,
    Profile,
    MyEditor,
    System,
    BigScreen,
    Game,
} from '@/views';
import { PATH_HOME } from '@/consts';
const routes = [
    {
        path: '/',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },

            {
                path: 'waterfall',
                element: <Waterfall />,
            },
            {
                path: 'button',
                element: <MyButton />,
            },
            {
                path: 'errors',
                children: [
                    { index: true, element: <ERROR_403 /> },
                    {
                        path: '403',
                        element: <ERROR_403 />,
                    },
                    {
                        path: '404',
                        element: <ERROR_404 />,
                    },
                    {
                        path: '500',
                        element: <ERROR_500 />,
                    },
                ],
            },

            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'bigSreen',
                element: <BigScreen />,
            },
            {
                path: 'editor',
                element: <MyEditor />,
            },
            {
                path: 't',
                element: <T />,
            },
            {
                path: 'profile',
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Profile /> },
                    {
                        path: 'contacts',
                        element: <Contacts />,
                        errorElement: <ErrorPage />,
                        loader: contactsLoader,
                        action: contactsAction,
                        children: [
                            { index: true, element: <Index /> },
                            {
                                path: ':contactId',
                                element: <Contact />,
                                loader: contactLoader,
                                action: favoriteAction,
                            },
                            {
                                path: ':contactId/edit',
                                element: <EditContact />,
                                loader: contactLoader,
                                action: editAction,
                            },
                            {
                                path: ':contactId/destroy',
                                action: destroyAction,
                                errorElement: <div>Oops! There was an error.</div>,
                            },
                        ],
                    },
                    {
                        path: 'tictactoe',
                        element: <Game />,
                    },
                ],
            },
            {
                path: 'system',
                element: <System />,
            },
            {
                path: '*',
                element: <ERROR_404 />,
            },
        ],
    },
    {
        path: '/login',
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Login /> },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
];
const router = createBrowserRouter(routes, { basename: PATH_HOME });
export { router };
