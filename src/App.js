import './App.css';
import { RouterProvider } from 'react-router-dom';
import {router} from './router'
import './styles/index.scss'
function App() {
  return (
   <div>
    <h1>hello </h1>
    <RouterProvider router={router} />
   </div>
  );
}

export default App;
