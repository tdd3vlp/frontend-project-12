import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Button,
  ButtonGroup,
  Image,
  Card,
  Row,
  Col,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import { login } from '../features/auth/authSlice';
import paths from '../serverRoutes';
import loginImage from '../assets/sign-in.png';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (username) => {
    dispatch(login(username));
    navigate('/');
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post(paths.loginPath(), { username, password });
        handleLogin({ username, token: response.data.token });
        formik.resetForm();
      } catch (loginError) {
        if (loginError.message === 'Network Error') {
          console.log(t('errors.network'));
        }

        if (loginError.response.data.statusCode === 401) {
          formik.setErrors({
            name: ' ',
            password: ' ',
          });
        }
      }
    },
  });
  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Row>
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image
                    src={loginImage}
                    alt={t('signup.submit')}
                    roundedCircle
                    style={{ width: '200px' }}
                  />
                </Col>
                <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                  <Card.Title as="h1" className="text-center mb-4">
                    {t('login.submit')}
                  </Card.Title>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="username" label={t('login.username')}>
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('login.username')}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={!!formik.errors.name}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <FloatingLabel controlId="password" label={t('login.password')}>
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('login.password')}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={!!formik.errors.password}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t('login.authFailed')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <ButtonGroup className="w-100 mb-3">
                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100"
                      disabled={formik.isSubmitting}
                    >
                      {t('login.submit')}
                    </Button>
                  </ButtonGroup>
                </Form>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('login.newToChat')}
                  &nbsp;
                </span>
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
