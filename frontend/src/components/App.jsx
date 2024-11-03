import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routerPaths as routes } from '../routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'b9c73109ae364bff9ab512394cfd3bbf',
  environment: 'testenv',
};

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </Provider>
    </>
  );
}
