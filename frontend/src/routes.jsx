import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import NotFoundPage from './components/NotFoundPage';

export default [
  {
    path: '/',
    element: <Home />,
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
