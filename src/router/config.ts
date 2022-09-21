import React from "react";

export interface IMenu{
    path: string;
    label: string;
    icon?: string;
    element?: string;
    query?: string;
    children?:any
}
const menu:IMenu[]=[
    { 
        path: "/",
        label:'button',
      },
      {
        path: "/login",
        label:'login'
      },
]
export {menu}