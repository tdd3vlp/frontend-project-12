import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import routes from '../routerRoutes';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
};

const router = createBrowserRouter(routes);

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </Provider>
);

export default App;
