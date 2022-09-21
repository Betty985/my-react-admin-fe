import React from "react";

export interface IMenu{
    key: string;
    label: string;
    icon?: string;
    element?: string;
    query?: string;
    children?:any
}
const menu:IMenu[]=[
    { 
        key: "/s",
        label:'button',
      },
      {
        key: "/login",
        label:'login'
      },
]
export {menu}