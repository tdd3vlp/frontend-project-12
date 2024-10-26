import { useFormik } from 'formik';
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
  Navbar,
} from 'react-bootstrap';
import signUpImg from '../assets/sign-up.png';

export default function SignUp() {
  const { t } = useTranslation();

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
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="flex-column flex-md-row d-flex justify-content-center align-content-center p-5 gap-4">
                <div className="align-content-center">
                  <Image
                    src={signUpImg}
                    alt={t('login.submit')}
                    roundedCircle
                    style={{ width: '200px' }}
                  />
                </div>

                <Form className="w-50" onSubmit={formik.handleSubmit}>
                  <Card.Title as="h1" className="text-center mb-4">
                    {t('login.signup')}
                  </Card.Title>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('signup.username')}
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      autoFocus
                    />
                    <Form.Label>{t('signup.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip></Form.Control.Feedback>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder={t('signup.password')}
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Label>{t('signup.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip></Form.Control.Feedback>
                  </Form.Floating>
                  <Form.Floating className="mb-4">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      required
                      placeholder={t('signup.confirm')}
                      id="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                    />
                    <Form.Label>{t('signup.confirm')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip></Form.Control.Feedback>
                  </Form.Floating>
                  <ButtonGroup className="w-100">
                    <Button variant="outline-primary" type="submit" className="w-100">
                      {t('signup.submit')}
                    </Button>
                  </ButtonGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
