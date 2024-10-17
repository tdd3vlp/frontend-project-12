import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFoundPage from './components/NotFoundPage';

export default [
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
];
