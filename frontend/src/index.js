import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore, { history } from 'redux/configureStore';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

const store = configureStore;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
