import { Container, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import Filter from 'leo-profanity';
import { ToastContainer, toast } from 'react-toastify';
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons';
import MessagesList from './MessagesList';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { openAddChannelModal } from '../features/modals/modalSlice';
import { fetchChannels, getActiveChannel } from '../features/channels/channelsSlice';
import { addMessage, fetchMessages, getMessagesLength } from '../features/messages/messagesSlice';
import ChannelsList from './ChannelsList';

const Home = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeChannel = useSelector(getActiveChannel);
  const user = useSelector((state) => state.auth.user);
  const messagesLength = useSelector(getMessagesLength);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values, { resetForm }) => {
      dispatch(addMessage({
        body: Filter.clean(values.body),
        channelId: activeChannelId,
        username: user,
      }))
        .unwrap()
        .then(() => resetForm())
        .catch(() => toast.error(t('errors.network')));
    },
  });

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, [activeChannelId]);

  return (
    <>
      <Container fluid className="flex-grow-1 p-3 overflow-hidden d-flex" style={{ minHeight: 0 }}>
        <div className="h-100 d-flex w-100 chat-window">
          <div className="d-flex flex-column h-100 chat-sidebar">
            <div className="sidebar-heading">
              <span>{t('channels.channels')}</span>
              <button
                type="button"
                className="sidebar-add-btn"
                onClick={() => dispatch(openAddChannelModal())}
                aria-label="Add channel"
              >
                <PlusSquare size={18} />
              </button>
            </div>
            <ChannelsList />
          </div>
          <div className="d-flex flex-column flex-grow-1 h-100 overflow-hidden bg-white">
            <div className="channel-header">
              <div className="channel-header-name">
                #&nbsp;
                {activeChannel}
              </div>
              <div className="channel-header-count">
                {messagesLength}
                &nbsp;
                {t('chat.messageCount', { count: messagesLength })}
              </div>
            </div>
            <MessagesList channelId={activeChannelId} />
            <div className="message-form-wrap">
              <Form noValidate className="message-form" onSubmit={formik.handleSubmit}>
                <Form.Control
                  ref={inputRef}
                  name="body"
                  aria-label={t('chat.newMessage')}
                  placeholder={t('chat.enterMessage')}
                  onChange={formik.handleChange}
                  value={formik.values.body}
                />
                <button
                  type="submit"
                  disabled={!formik.values.body || formik.isSubmitting}
                  className="msg-send-btn"
                  aria-label={t('chat.send')}
                >
                  <ArrowRightSquare size={20} />
                </button>
              </Form>
            </div>
          </div>
        </div>
      </Container>
      <AddChannelModal />
      <RemoveChannelModal />
      <RenameChannelModal />
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Home;
