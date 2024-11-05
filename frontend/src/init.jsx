import i18next from 'i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './app/store';
import { handleAddMessage } from './features/messages/messagesSlice.jsx';
import {
  handleAddChannel,
  handleRemoveChannel,
  handleRenameChannel,
} from './features/channels/channelsSlice.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

  const socket = io();

  socket.on(
    'newMessage',
    (payload) =>
      new Promise((resolve, reject) => {
        if (socket.connected) {
          resolve(store.dispatch(handleAddMessage(payload)));
        } else {
          console.error('Network error');
          reject();
        }
      }),
  );

  socket.on(
    'newChannel',
    (payload) =>
      new Promise((resolve, reject) => {
        if (socket.connected) {
          resolve(store.dispatch(handleAddChannel(payload)));
        } else {
          console.log(i18n.t('errors.network'));
          reject();
        }
      }),
  );

  socket.on(
    'removeChannel',
    (payload) =>
      new Promise((resolve, reject) => {
        if (socket.connected) {
          resolve(store.dispatch(handleRemoveChannel(payload)));
        } else {
          console.log(i18n.t('errors.network'));
          reject();
        }
      }),
  );

  socket.on(
    'renameChannel',
    (payload) =>
      new Promise((resolve, reject) => {
        if (socket.connected) {
          resolve(store.dispatch(handleRenameChannel(payload)));
        } else {
          console.log(i18n.t('errors.network'));
          reject();
        }
      }),
  );

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
