import { handleActions } from 'redux-actions';

import { REQUEST_PROJECTS, SUCCESS_PROJECTS, FAILURE_PROJECTS } from 'core/actions/projects';

const initialState = {
  isFetching: false,
  projects: [],
  error: '',
};

const projects = handleActions({
  REQUEST_PROJECTS: (state) => Object.assign({}, state, {
    isFetching: true,
    error: '',
  }),
  SUCCESS_PROJECTS: (state, action) => Object.assign({}, state, {
    isFetching: false,
    projects: action.payload,
  }),
  FAILURE_PROJECTS: (state, action) => Object.assign({}, state, {
    isFetching: false,
    error: action.error,
  }),
}, initialState);

export default projects;
