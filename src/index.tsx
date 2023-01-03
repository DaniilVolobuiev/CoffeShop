import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter, HashRouter } from 'react-router-dom';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import './firebase';

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>,
  );
}
