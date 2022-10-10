import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import { MyButton } from '@/components/ui/Button';
import { Dashboard } from '@/components/Dashboard';
import { Error_403, Error_404, Error_500, Home, Login, Waterfall, T } from '@/views';

const routes = [
    {
        path: '/',
        element: <Dashboard />,
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
        ],
    },
];
const router = createBrowserRouter(routes);
export { router };
