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
  FloatingLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import paths from '../serverRoutes';
import { login } from '../features/auth/authSlice';
import signupImage from '../assets/sign-up.png';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object({
    username: yup
      .string()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints')),
    password: yup.string().required(t('signup.required')).min(6, t('signup.passMin')),
    confirmPassword: yup.string().oneOf([yup.ref('password')], t('signup.mustMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    validateOnChange: false,

    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const response = await axios.post(paths.signupPath(), {
          username: values.username,
          password: values.password,
        });
        dispatch(login(response.data));
        navigate('/');
        resetForm();
      } catch (signupError) {
        if (signupError instanceof AxiosError) {
          if (!signupError.response) {
            console.log(t('errors.network'));
            return;
          }
          if (signupError.response.status === 409) {
            setErrors({
              username: ' ',
              password: ' ',
              confirmPassword: t('signup.alreadyExists'),
            });
          } else {
            console.log(t('errors.unknownError'));
          }
        }
      }
    },
  });
  return (
    <div className="d-flex flex-column h-100" id="chat">
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="flex-column flex-md-row d-flex justify-content-center align-content-center p-5 gap-4">
                <div className="align-content-center">
                  <Image
                    src={signupImage}
                    alt={t('login.submit')}
                    roundedCircle
                    style={{ width: '200px' }}
                  />
                </div>

                <Form className="w-50" onSubmit={formik.handleSubmit}>
                  <Card.Title as="h1" className="text-center mb-4">
                    {t('login.signup')}
                  </Card.Title>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="username" label={t('signup.username')}>
                      <Form.Control
                        name="username"
                        autoComplete="username"
                        required
                        placeholder={t('signup.username')}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={!!formik.errors.username}
                        autoFocus
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.username || t('signup.usernameConstraints')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="password" label={t('signup.password')}>
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder={t('signup.password')}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={!!formik.errors.password}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.password || t('signup.passMin')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <FloatingLabel controlId="confirmPassword" label={t('signup.confirm')}>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        required
                        placeholder={t('signup.confirm')}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        isInvalid={!!formik.errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.confirmPassword || t('signup.alreadyExists')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
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
};

export default SignUp;
