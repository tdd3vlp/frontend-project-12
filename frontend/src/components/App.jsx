import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from '../routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
