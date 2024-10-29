import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './app/store';
import { io } from 'socket.io-client';
import { addNewMessage } from './features/messages/messagesSlice.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

  const socket = io('http://localhost:5001', {
    withCredentials: true,
    transports: ['websocket'],
  });

  socket.on('newMessage', (payload) => {
    return new Promise((resolve, reject) => {
      if (socket.connected) {
        resolve(store.dispatch(addNewMessage(payload)));
      } else {
        reject(new Error(i18n.t('errors.network')));
      }
    });
  });

  socket.on('newChannel', (payload) => {
    console.log(payload); // { id: 6, name: "new channel", removable: true }
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
