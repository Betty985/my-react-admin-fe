import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import {MyButton} from '@/components/ui/Button'
import {Login} from '@/views/Login'
import {MyMenu} from '@/components/Menu'
const router=createBrowserRouter([
  {
    path: "/",
    element: <MyMenu />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/s",
    element: <MyButton />,
  },
])
export {router}
