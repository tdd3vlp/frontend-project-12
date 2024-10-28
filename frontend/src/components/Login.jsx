import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import loginImage from '../assets/sign-in.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { serverPaths as paths } from '../routes';
import { login } from '../features/auth/authSlice';
import { Container, Button, ButtonGroup, Image, Card, Row, Col, Form } from 'react-bootstrap';

export default function Login() {
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
        formik.setErrors({ auth: '' });
        formik.resetForm();
      } catch (loginError) {
        formik.setErrors({ auth: loginError.response.data.message });
        console.log('Login error', loginError.response.data);
      }
    },
  });
  return (
    <div className="d-flex flex-column h-100" id="chat">
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
                    <Form.Floating className="mb-3">
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('login.username')}
                        id="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={formik.errors.auth}
                      />
                      <Form.Label>{t('login.username')}</Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('login.password')}
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={formik.errors.auth}
                      />
                      <Form.Label>{t('login.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t('login.authFailed')}
                      </Form.Control.Feedback>
                    </Form.Floating>

                    <ButtonGroup className="w-100 mb-3">
                      <Button variant="outline-primary" type="submit" className="w-100">
                        {t('login.submit')}
                      </Button>
                    </ButtonGroup>
                  </Form>
                </Row>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('login.newToChat')}&nbsp;</span>
                  <a href="/signup">{t('login.signup')}</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
