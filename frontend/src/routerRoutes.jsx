import NotFoundPage from './components/NotFoundPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import withNavbar from './components/withNavbar';

const HomeWithNav = withNavbar(Home, true);
const LoginWithNav = withNavbar(Login);
const SignUpWithNav = withNavbar(SignUp);
const NotFoundWithNav = withNavbar(NotFoundPage, true);

export default [
  {
    path: '/',
    element: <PrivateRoute><HomeWithNav /></PrivateRoute>,
    errorElement: <NotFoundWithNav />,
  },
  {
    path: '/login',
    element: <LoginWithNav />,
  },
  {
    path: '/signup',
    element: <SignUpWithNav />,
  },
];
