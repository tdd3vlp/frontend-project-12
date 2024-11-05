import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

export default function withNavbar(WrappedComponent, hasLogoutButton) {
  const ComponentWithNav = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
    };

    return !hasLogoutButton ? (
      <div className="d-flex flex-column h-100" id="chat">
        <Navbar variant="light" expand="lg" className="shadow-sm bg-white">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('hexletChat')}
            </Navbar.Brand>
          </Container>
        </Navbar>
        <WrappedComponent {...props} />
      </div>
    ) : (
      <div className="d-flex flex-column h-100" id="chat">
        <Navbar variant="light" expand="lg" className="shadow-sm bg-white">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('hexletChat')}
            </Navbar.Brand>
            <Button as={Link} variant="primary" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </Container>
        </Navbar>
        <WrappedComponent {...props} />
      </div>
    );
  };
  return <ComponentWithNav />;
}
