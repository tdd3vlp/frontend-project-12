import { Container, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import ChannelsList from './ChannelsList';
import { fetchChannels } from '../features/channels/channelsSlice';
import { getActiveChannel } from '../features/channels/channelsSlice';
import MessagesList from './MessagesList';
import { addMessage } from '../features/messages/messagesSlice';
import { fetchMessages } from '../features/messages/messagesSlice';
import { getMessagesLength } from '../features/messages/messagesSlice';
import { openAddChannelModal } from '../features/modals/modalSlice';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { PlusSquare } from 'react-bootstrap-icons';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import Filter from 'leo-profanity';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeChannel = useSelector(getActiveChannel);
  const user = useSelector((state) => state.auth.user);
  const messagesLength = useSelector(getMessagesLength);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const filteredBody = Filter.clean(values.body);
      values.body = filteredBody;
      dispatch(addMessage({ ...values, channelId: activeChannelId, username: user }));
      formik.resetForm();
    },
  });

  // Load channels and messages
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  // Focus on input
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  }, [activeChannelId]);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end bg-light d-flex flex-column h-100 p-0">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels.channels')}</b>
              <Button
                variant="link"
                className="text-primary p-0 btn-group-vertical"
                onClick={() => dispatch(openAddChannelModal())}
              >
                <PlusSquare size={20} />
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <ChannelsList />
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {activeChannel}</b>
                </p>
                <span className="text-muted">
                  {messagesLength} {t('chat.messageCount', { count: messagesLength })}
                </span>
              </div>
              <MessagesList channelId={activeChannelId} />
              <div className="mt-auto px-5 py-3">
                <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                  <InputGroup hasValidation={!formik.values.body}>
                    <Form.Control
                      ref={inputRef}
                      name="body"
                      aria-label={t('chat.newMessage')}
                      className="border-0 p-0 ps-2"
                      placeholder={t('chat.enterMessage')}
                      onChange={formik.handleChange}
                      value={formik.values.body}
                    />
                    <Button
                      type="submit"
                      disabled={!formik.values.body || formik.isSubmitting}
                      variant="outline-secondary"
                      className="btn-group-vertical"
                    >
                      <ArrowRightSquare />
                      <span className="visually-hidden">{t('chat.send')}</span>
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <AddChannelModal />
      <RemoveChannelModal />
      <RenameChannelModal />
      <ToastContainer position="top-right" autoClose={7000} />
    </>
  );
}
