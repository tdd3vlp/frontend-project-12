import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { routerPaths as routes } from '../routes';

const rollbarConfig = {
  accessToken: 'b9c73109ae364bff9ab512394cfd3bbf',
  environment: 'testenv',
};

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
