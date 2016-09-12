/**
*
* app/main.js
* Main
*
**/

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducers from 'core/reducers/index.js';

import './style/base.styl';
import './style/fonts.styl';

import Layout from 'views/Layout';
import HomeView from 'views/HomeView';

// Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
window.React = React;

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(
  browserHistory,
  store,
);

ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
      <Route path="/" component={Layout} >
        <IndexRoute component={HomeView} />
        <Route path="/home" component={HomeView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
