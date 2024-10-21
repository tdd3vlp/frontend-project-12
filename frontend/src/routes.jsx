import NotFoundPage from './components/NotFoundPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';

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
