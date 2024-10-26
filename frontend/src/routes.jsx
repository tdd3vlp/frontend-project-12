import NotFoundPage from './components/NotFoundPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

const apiPath = '/api/v1';

export const serverPaths = {
  loginPath: () => [apiPath, 'login'].join('/'),
};

export const routerPaths = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <Login />,
    // Компоненты высшего порядка
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
];
