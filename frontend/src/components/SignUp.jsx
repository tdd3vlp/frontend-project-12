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

export default function SignUp() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
              <Card.Body className="flex-column flex-md-row d-flex justify-content-center align-content-center p-5 gap-4">
                <div className="align-content-center">
                  <Image
                    src={'http://localhost:5173/src/assets/sing-up.png'}
                    alt={t('signup')}
                    roundedCircle
                  />
                </div>

                <Form className="w-50" onSubmit={formik.handleSubmit}>
                  <Card.Title as="h1" className="text-center mb-4">
                    {t('signup')}
                  </Card.Title>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('symbolsCount')}
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      autoFocus
                    />
                    <Form.Label>{t('username')}</Form.Label>
                    {/* <Form.Control.Feedback type="invalid" tooltip>
                        {t('userError')}
                      </Form.Control.Feedback> */}
                  </Form.Floating>
                  <Form.Floating className="mb-3">
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
                    {/* <Form.Control.Feedback type="invalid" tooltip>
                        {t('passwordError')}
                      </Form.Control.Feedback> */}
                  </Form.Floating>
                  <Form.Floating className="mb-4">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      required
                      placeholder={t('confirmPassword')}
                      id="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                    />
                    <Form.Label>{t('confirmPassword')}</Form.Label>
                    {/* <Form.Control.Feedback type="invalid" tooltip>
                        {t('passwordConfirmationError')}
                      </Form.Control.Feedback> */}
                  </Form.Floating>
                  <ButtonGroup className="w-100">
                    <Button variant="outline-primary" type="submit" className="w-100">
                      {t('toSignup')}
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
