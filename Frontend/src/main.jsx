import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { persistor, store } from './redux/user/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
