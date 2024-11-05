import NotFoundPage from './components/NotFoundPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import withNavbar from './components/withNavbar';

export default [
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
