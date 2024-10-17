import { Button, ButtonGroup, Col, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <Col className="m-5 p-3 bg-white shadow-sm rounded">
      <Alert variant="danger">
        <Alert.Heading>404 Not Found</Alert.Heading>

        <hr />
        <p className="mb-0">Use the button below to return to the main page.</p>
      </Alert>
      <ButtonGroup className=" mb-3">
        <Button variant="secondary">
          <Link className="text-decoration-none" to="/">
            {t('back')}
          </Link>
        </Button>
      </ButtonGroup>
    </Col>
  );
}
