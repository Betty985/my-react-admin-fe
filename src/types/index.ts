import { ReactNode } from "react";

export interface IMenu {
    key: string;
    label: string;
    icon?: ReactNode;
    element?: string;
    query?: string;
    children?: any;
}
export interface IBreads {
    path: string;
    breadcrumbName: string;
    children: Array<{
        path: string;
        breadcrumbName: string;
    }>;
}
export type colorsType = {
    primaryColor: string;
    errorColor: string;
    warningColor: string;
    successColor: string;
    infoColor: string;
};
export enum tabAction {
    DELETE,
    ADD,
}
// 选择器option列表
export interface OptionProps {
    label: any;
    key: any;
    icon?: ReactNode;
    children?: OptionProps[];
}