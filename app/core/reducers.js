import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import projectList from 'containers/ProjectList/modules/reducers';

export default combineReducers({
  projectList,
  routing: routerReducer,
});
