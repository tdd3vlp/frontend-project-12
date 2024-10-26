import {
  Container,
  Nav,
  Navbar,
  Button,
  ButtonGroup,
  Row,
  Col,
  Dropdown,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { logout } from '../features/auth/authSlice';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
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
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end bg-light d-flex flex-column h-100 p-0">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels.channels')}</b>
              <ButtonGroup vertical>
                <Button variant="link" className="text-primary p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </Button>
              </ButtonGroup>
            </div>
            <Nav
              as="ul"
              id="channels-box"
              className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
            >
              <Nav.Item as="li" className="w-100">
                <Button variant="secondary" className="w-100 rounded-0 text-start">
                  <span className="me-1">#</span>general
                </Button>
              </Nav.Item>

              <Nav.Item as="li" className="w-100">
                <Button variant="light" className="w-100 rounded-0 text-start">
                  <span className="me-1">#</span>random
                </Button>
              </Nav.Item>

              <Nav.Item as="li" className="w-100">
                <ButtonGroup className="d-flex w-100">
                  <Button variant="light" className="w-100 rounded-0 text-start text-truncate">
                    <span className="me-1">#</span>666
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle
                      split
                      variant="light"
                      id="dropdown-split-basic"
                      className="flex-grow-0"
                    >
                      <span className="visually-hidden">{t('channels.menu')}</span>
                    </Dropdown.Toggle>
                  </Dropdown>
                </ButtonGroup>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># general</b>
                </p>
                <span className="text-muted">0 {t('chat.messageCount_zero')}</span>
              </div>
              <div className="chat-messages overflow-auto px-5 " id="messages-box">
                <div className="text-break mb-2">
                  <b>admin</b>: Привет!
                </div>
              </div>
              <div className="mt-auto px-5 py-3">
                <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                  <InputGroup hasValidation>
                    <Form.Control
                      name="body"
                      aria-label={t('newMessage')}
                      className="border-0 p-0 ps-2"
                      placeholder={t('chat.enterMessage')}
                      onChange={formik.handleChange}
                      value={formik.values.newMessage}
                    />
                    <Button
                      type="submit"
                      disabled
                      variant="outline-secondary"
                      className="btn-group-vertical"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                        ></path>
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
