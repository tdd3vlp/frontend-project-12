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
    element: <PrivateRoute>{withNavbar(Home, true)}</PrivateRoute>,
    errorElement: withNavbar(NotFoundPage, true),
  },
  {
    path: '/login',
    element: withNavbar(Login),
  },
  {
    path: '/signup',
    element: withNavbar(SignUp),
  },
];
