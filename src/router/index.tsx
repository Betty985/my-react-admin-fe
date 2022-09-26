import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import {MyButton} from '@/components/ui/Button'
import {Login} from '@/views/Login'
import {Dashboard} from '@/components/Dashboard'
import {Error_403,Error_404,Error_500} from "@/views/Errors"
const routes=[
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
      {
        path: "403",
        element: <Error_403 />,
      },
      {
        path: "404",
        element: <Error_404 />,
      },
      {
        path: "500",
        element: <Error_500 />,
      },

    ]
  }, 
]
const router=createBrowserRouter(routes)
export {router}
