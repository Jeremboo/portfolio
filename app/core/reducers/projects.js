import { REQUEST_PROJECTS, SUCCESS_PROJECTS, FAILURE_PROJECTS } from 'core/actions/projects';
import { createReducer } from 'core/utils';

const initialState = {
  isFetching: false,
  projects: [],
  error: '',
};

const projects = createReducer(initialState, {
  [REQUEST_PROJECTS](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: '',
    });
  },
  [SUCCESS_PROJECTS](state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      projects: action.projects,
    });
  },
  [FAILURE_PROJECTS](state, action) {
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error,
    });
  },
});

export default projects;
