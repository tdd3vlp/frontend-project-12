import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './app/store';
import { io } from 'socket.io-client';
import { handleAddMessage } from './features/messages/messagesSlice.jsx';
import { handleAddChannel } from './features/channels/channelsSlice.jsx';
import { handleRemoveChannel } from './features/channels/channelsSlice.jsx';
import { handleRenameChannel } from './features/channels/channelsSlice.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

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
        reject(new Error(i18n.t('errors.network')));
      }
    });
  });

  socket.on('newChannel', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(handleAddChannel(payload)));
      } else {
        console.error('Network error');
        reject(new Error(i18n.t('errors.network')));
      }
    });
  });

  socket.on('removeChannel', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(handleRemoveChannel(payload)));
      } else {
        console.error('Network error');
        reject(new Error(i18n.t('errors.network')));
      }
    });
  });

  socket.on('renameChannel', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(handleRenameChannel(payload)));
      } else {
        console.error('Network error');
        reject(new Error(i18n.t('errors.network')));
      }
    });
  });

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
