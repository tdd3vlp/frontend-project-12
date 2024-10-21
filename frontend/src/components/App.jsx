import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from '../routes';
import AuthProvider from './AuthProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
