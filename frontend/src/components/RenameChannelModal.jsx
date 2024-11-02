import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { closeRenameChannelModal } from '../features/modals/modalSlice';
import { renameChannel } from '../features/channels/channelsSlice';
import { useEffect, useRef } from 'react';

export default function RenameChannelModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isOpen,
    channelId,
    name: channelName,
  } = useSelector((state) => state.modals.renameChannelModal);

  const schema = yup.object({
    name: yup
      .string()
      .required(t('modals.required'))
      .min(3, t('modals.min'))
      .max(20, t('modals.max')),
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => inputRef.current.select(), 1);
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: { name: channelName },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(renameChannel({ id: channelId, name: values }));
      dispatch(closeRenameChannelModal());
      formik.resetForm();
    },
  });

  return (
    <Modal show={isOpen} centered onHide={() => dispatch(closeRenameChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={() => dispatch(closeRenameChannelModal())}>
              {t('modals.cancel')}
            </Button>
            <Button variant="primary" type="submit" className="ms-2">
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
