import NotFoundPage from './components/NotFoundPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import withNavbar from './components/withNavbar';

const apiPath = '/api/v1';

export const serverPaths = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
};

export const routerPaths = [
  {
    path: '/',
    element: <PrivateRoute>{withNavbar(Home, false)}</PrivateRoute>,
    errorElement: withNavbar(NotFoundPage, false),
  },
  {
    path: '/login',
    element: withNavbar(Login, true),
  },
  {
    path: '/signup',
    element: withNavbar(SignUp, true),
  },
];
