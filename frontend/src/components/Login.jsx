import { useFormik } from 'formik';
import axios from 'axios';
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

export default function Login() {
  const { t } = useTranslation();
  const loginText = t('login');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      const { username, password } = values;
      axios.post('http://localhost:5001/api/v1/login', { username, password }).then((response) => {
        console.log(response.data);
      });
      console.log(window.localStorage.getItem('userId'));
    },
  });
  return (
    <div className="d-flex flex-column h-100" id="chat">
      <Navbar variant="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-5">
                <Row>
                  <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                    <Image
                      src={'http://localhost:5173/src/assets/sign-in.png'}
                      alt={loginText}
                      roundedCircle
                    />
                  </Col>
                  <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                    <Card.Title as="h1" className="text-center mb-4">
                      {loginText}
                    </Card.Title>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('username')}
                        id="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                      <Form.Label>{t('nickname')}</Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('password')}
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <Form.Label>{t('password')}</Form.Label>
                    </Form.Floating>

                    <ButtonGroup className="w-100 mb-3">
                      <Button variant="outline-primary" type="submit" className="w-100">
                        {loginText}
                      </Button>
                    </ButtonGroup>
                  </Form>
                </Row>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('gotAccount')}&nbsp;</span>
                  <a href="/signup">{t('signup')}</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
