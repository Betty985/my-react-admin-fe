import { RouterProvider } from 'react-router-dom';
import { router } from './router'
import './styles/index.scss'
import "nprogress/nprogress.css";
import NProgress from 'nprogress'
import { useEffect, useState } from 'react';
import { Spin } from 'antd'
NProgress.configure({ showSpinner: false });
function App() {
  const [load, setLoad] = useState(true);
  if (load) {
    NProgress.start();
  }
  useEffect(() => {
    setLoad(false);
    NProgress.done()
  }, [])

  return (
    <>
      {load ? <Spin size='large' /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
