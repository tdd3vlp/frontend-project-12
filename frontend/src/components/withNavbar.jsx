import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function withNavbar(WrappedComponent) {
  const ComponentWithNav = (props) => {
    const { t } = useTranslation();
    return (
      <>
        <Navbar variant="light" expand="lg" className="shadow-sm bg-white">
          <Container>
            <Navbar.Brand href="/">{t('hexletChat')}</Navbar.Brand>
          </Container>
        </Navbar>
        <WrappedComponent {...props} />
      </>
    );
  };
  return <ComponentWithNav />;
}
