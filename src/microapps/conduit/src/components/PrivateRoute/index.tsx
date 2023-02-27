import { observer } from "mobx-react";
import React, { FC } from "react";
import useStores from "../../hooks/useStores";
import { Route } from "react-router-dom";
import Nothing from '../Nothing'
interface A{
  path:string;
  element: any
}
const PrivateRoute:FC<A>= observer((props) => {
  const { userStore} = useStores();
  const {path,element}=props
  if (userStore.currentUser) 
  return <Route path={path} element={element}/>;
  return <Route path="/" element={<Nothing />} />;
});

export default PrivateRoute;
