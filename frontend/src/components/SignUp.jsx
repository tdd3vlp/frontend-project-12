import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChatDotsFill, CheckCircleFill } from 'react-bootstrap-icons';
import paths from '../serverRoutes';
import { login } from '../features/auth/authSlice';

const BRAND_FEATURES = [
  'Регистрация за 30 секунд',
  'Доступ ко всем каналам команды',
  'Работает на любом устройстве',
];

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
    initialValues: { username: '', password: '', confirmPassword: '' },
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
    <div className="auth-split">
      <div className="auth-brand">
        <div className="auth-brand-content">
          <div className="auth-logo-lockup">
            <ChatDotsFill className="brand-icon" size={24} />
            <span>GetApp Messenger</span>
          </div>
          <h2 className="auth-tagline">
            Присоединяйтесь<br />к своей команде
          </h2>
          <p className="auth-desc">
            Создайте аккаунт и начните общаться с командой
            уже сегодня — быстро и без лишних шагов.
          </p>
          <ul className="auth-features-list">
            {BRAND_FEATURES.map((text) => (
              <li key={text}>
                <span className="af-icon"><CheckCircleFill size={14} /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <h1 className="auth-form-title">Создать аккаунт</h1>
          <p className="auth-form-sub">Заполните форму, чтобы начать работу</p>

          <Form onSubmit={formik.handleSubmit}>
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
                  autoComplete="new-password"
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
            <Button
              variant="primary"
              type="submit"
              className="w-100 auth-submit-btn"
              disabled={formik.isSubmitting}
            >
              {t('signup.submit')}
            </Button>
          </Form>

          <div className="auth-footer-link">
            Уже есть аккаунт?&nbsp;
            <Link to="/login">{t('login.submit')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
