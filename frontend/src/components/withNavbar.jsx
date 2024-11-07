import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const withNavbar = (WrappedComponent, hasLogoutButton) => {
  const ComponentWithNav = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
    };

    return (
      <div className="d-flex flex-column h-100" id="chat">
        <Navbar variant="light" expand="lg" className="shadow-sm bg-white">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('hexletChat')}
            </Navbar.Brand>
            {hasLogoutButton && (
              <Button variant="primary" onClick={handleLogout}>
                {t('logout')}
              </Button>
            )}
          </Container>
        </Navbar>
        <WrappedComponent />
      </div>
    );
  };
  return <ComponentWithNav />;
};

export default withNavbar;
