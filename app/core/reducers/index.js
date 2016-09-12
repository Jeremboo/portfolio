import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import project from './project';
import projects from './projects';

export default combineReducers({
  project,
  projects,
  routing: routerReducer,
});
