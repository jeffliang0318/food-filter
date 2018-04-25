import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { logger } from 'redux-logger';

import App from './components/App';
import reducers from './reducers';

import '../src/style/root.css';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

ReactDOM.render(
  <Provider store={ store }><App /></Provider>,
  document.querySelector('#root'));
