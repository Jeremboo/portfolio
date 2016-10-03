
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './Layout';
import HomeView from './HomeView';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  return (
    <Provider store={store} >
      <Router history={history}>
        <Route path="/" component={Layout} >
          <IndexRoute component={HomeView} />
          <Route path="/home" component={HomeView} />
        </Route>
      </Router>
    </Provider>
  );
};
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
