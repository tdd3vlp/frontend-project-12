import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { ChatDotsFill, CheckCircleFill } from 'react-bootstrap-icons';
import { login } from '../features/auth/authSlice';
import paths from '../serverRoutes';

const BRAND_FEATURES = [
  'Организованные каналы по проектам',
  'Мгновенный обмен сообщениями',
  'Безопасное хранение переписки',
];

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async ({ username, password }, { resetForm, setErrors }) => {
      try {
        const response = await axios.post(paths.loginPath(), { username, password });
        dispatch(login({ username, token: response.data.token }));
        navigate('/');
        resetForm();
      } catch (loginError) {
        if (loginError instanceof AxiosError) {
          if (!loginError.response) {
            console.log(t('errors.network'));
            return;
          }
          if (loginError.response.status === 401) {
            setErrors({ username: ' ', password: ' ' });
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
            Общайтесь там,<br />где делается работа
          </h2>
          <p className="auth-desc">
            Объединяйте команду в каналах, общайтесь в реальном времени
            и не теряйте важные решения.
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
          <h1 className="auth-form-title">Добро пожаловать</h1>
          <p className="auth-form-sub">Введите данные для входа в аккаунт</p>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="username" label={t('login.username')}>
                <Form.Control
                  name="username"
                  autoComplete="username"
                  required
                  placeholder={t('login.username')}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  isInvalid={!!formik.errors.username}
                  autoFocus
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
            <Button
              variant="primary"
              type="submit"
              className="w-100 auth-submit-btn"
              disabled={formik.isSubmitting}
            >
              {t('login.submit')}
            </Button>
          </Form>

          <div className="auth-footer-link">
            {t('login.newToChat')}&nbsp;
            <Link to="/signup">{t('login.signup')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
