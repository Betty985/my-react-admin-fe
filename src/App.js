import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'
import './styles/index.scss'
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
