import { handleActions } from 'redux-actions';

import {
  REQUEST_PROJECTLIST,
  SUCCESS_PROJECTLIST,
  FAILURE_PROJECTLIST
} from './actions';

const initialState = {
  isFetching: false,
  projects: [],
  error: '',
};

const projectList = handleActions({
  REQUEST_PROJECTLIST: (state) => Object.assign({}, state, {
    isFetching: true,
    error: '',
  }),
  SUCCESS_PROJECTLIST: (state, action) => Object.assign({}, state, {
    isFetching: false,
    projects: action.payload,
  }),
  FAILURE_PROJECTLIST: (state, action) => Object.assign({}, state, {
    isFetching: false,
    error: action.error,
  }),
}, initialState);

export default projectList;
