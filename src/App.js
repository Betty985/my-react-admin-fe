import { RouterProvider } from 'react-router-dom';
import { router } from './router'
import "nprogress/nprogress.css";
import './styles/index.scss'
import NProgress from 'nprogress'
import { useEffect } from 'react';
NProgress.configure({
  // 动画方式
  easing: "ease",
  // 递增进度条的速度
  speed: 600,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 500,
  // 初始化时的最小百分比
  minimum: 0.3,
  showSpinner: false
});

NProgress.start()
function App() {
  useEffect(() => {
    NProgress.done()
  }, [])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
