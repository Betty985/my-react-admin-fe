import { RouteObject } from "react-router-dom";

export interface RouteObj extends RouteObject{
    // 是否需要验证
  auth?:boolean
}