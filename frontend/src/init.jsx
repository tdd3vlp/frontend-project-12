import i18next from 'i18next';
import store from './app/store';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { handleAddMessage } from './features/messages/messagesSlice.jsx';
import { handleAddChannel } from './features/channels/channelsSlice.jsx';
import { handleRemoveChannel } from './features/channels/channelsSlice.jsx';
import { handleRenameChannel } from './features/channels/channelsSlice.jsx';
import { toast } from 'react-toastify';

const init = async () => {
  const socket = io('http://localhost:5001', {
    withCredentials: true,
    transports: ['websocket'],
  });

  socket.on('newMessage', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(handleAddMessage(payload)));
      } else {
        console.error('Network error');
        reject();
      }
    });
  });

  socket.on('newChannel', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(handleAddChannel(payload)));
        toast.success(i18n.t('channels.created'));
      } else {
        console.log(i18n.t('errors.network'));
        reject();
      }
    });
  });

  socket.on('removeChannel', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(handleRemoveChannel(payload)));
        toast.success(i18n.t('channels.removed'));
      } else {
        console.log(i18n.t('errors.network'));
        reject();
      }
    });
  });

  socket.on('renameChannel', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(handleRenameChannel(payload)));
        toast.success(i18n.t('channels.renamed'));
      } else {
        console.log(i18n.t('errors.network'));
        reject();
      }
    });
  });

  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;
