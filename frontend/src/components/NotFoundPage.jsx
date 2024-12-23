import {
  Button, ButtonGroup, Col, Alert,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Col className="m-5 p-3 bg-white shadow-sm rounded">
      <Alert variant="warning">
        <Alert.Heading>{t('notFound.header')}</Alert.Heading>

        <hr />
        <p className="mb-0">{t('notFound.message')}</p>
      </Alert>
      <ButtonGroup className=" mb-3">
        <Button as={Link} to="/" variant="primary">
          {t('notFound.linkText')}
        </Button>
      </ButtonGroup>
    </Col>
  );
};

export default NotFoundPage;
