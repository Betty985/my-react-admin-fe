import { RouterProvider } from 'react-router-dom';
import { router } from './router'
import "nprogress/nprogress.css";
import './styles/index.scss'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react';
import { Spin } from 'antd'

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
