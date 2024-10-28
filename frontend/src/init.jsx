import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './app/store';
import { io } from 'socket.io-client';

const init = async () => {
  const socket = io();
  socket.connect();
  socket.on('connect', () => {
    console.log('connected');
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

// Сокеты должны быть инициализивароны в init().
