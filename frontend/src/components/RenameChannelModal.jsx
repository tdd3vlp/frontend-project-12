/* eslint-disable no-param-reassign */
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import Filter from 'leo-profanity';
import { closeRenameChannelModal } from '../features/modals/modalSlice';
import { renameChannel } from '../features/channels/channelsSlice';

const RenameChannelModal = () => {
  const inputRef = useRef(null);
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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 100);
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: { name: channelName },
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values) => {
      const filteredName = Filter.clean(values.name);
      values.name = filteredName;
      dispatch(renameChannel({ id: channelId, name: values }));
      dispatch(closeRenameChannelModal());
      toast.success(t('channels.renamed'));
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
};

export default RenameChannelModal;
