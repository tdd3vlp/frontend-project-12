import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { addChannel } from '../features/channels/channelsSlice';
import { closeAddChannelModal } from '../features/modals/modalSlice';

const AddChannelModal = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.addChannelModal.isOpen);
  const channels = useSelector((state) => state.channels.byId);
  const channelsNames = Object.values(channels).map((channel) => channel.name);

  const handleCloseModal = () => {
    dispatch(closeAddChannelModal());
    formik.resetForm();
  };

  const schema = yup.object({
    name: yup
      .string()
      .required(t('modals.required'))
      .min(3, t('modals.min'))
      .max(20, t('modals.max'))
      .notOneOf(channelsNames, t('modals.uniq')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(addChannel({ name: Filter.clean(values.name) }));
      handleCloseModal();
      toast.success(t('channels.created'));
      formik.resetForm();
    },
  });

  // Focus on input
  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} centered onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
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
            <Button variant="secondary" onClick={handleCloseModal}>
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
};

export default AddChannelModal;
