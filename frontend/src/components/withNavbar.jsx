import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ChatDotsFill } from 'react-bootstrap-icons';
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
        <Navbar className="app-navbar" expand="lg">
          <Container fluid="lg">
            <Navbar.Brand as={Link} to="/">
              <ChatDotsFill className="brand-icon" size={17} />
              {t('hexletChat')}
            </Navbar.Brand>
            {hasLogoutButton && (
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                {t('logout')}
              </Button>
            )}
          </Container>
        </Navbar>
        <WrappedComponent />
      </div>
    );
  };
  return ComponentWithNav;
};

export default withNavbar;
