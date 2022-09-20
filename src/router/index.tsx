import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import {MyButton} from '@/components/ui/Button'
import {Login} from '@/views/Login'
const router=createBrowserRouter([
  {
    path: "/",
    element: <MyButton />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])
export {router}
