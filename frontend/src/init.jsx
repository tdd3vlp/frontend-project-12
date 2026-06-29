import i18next from 'i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import App from './components/App.jsx';
import store from './app/store';
import { logout } from './features/auth/authSlice.jsx';
import { handleAddMessage } from './features/messages/messagesSlice.jsx';
import {
  handleAddChannel,
  handleRemoveChannel,
  handleRenameChannel,
} from './features/channels/channelsSlice.jsx';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

const init = async () => {
  const i18n = i18next.createInstance();

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(handleAddMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(handleAddChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(handleRemoveChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(handleRenameChannel(payload));
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
