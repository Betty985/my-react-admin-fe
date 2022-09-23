import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import {MyButton} from '@/components/ui/Button'
import {Login} from '@/views/Login'
import {Dashboard} from '@/components/Dashboard'
const router=createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children:[
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "button",
        element: <MyButton />,
      },
    ]
  }, 
])
export {router}
