import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
