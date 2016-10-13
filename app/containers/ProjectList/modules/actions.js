import { createActions } from 'redux-actions';

export const REQUEST_PROJECTLIST = 'REQUEST_PROJECTLIST';
export const SUCCESS_PROJECTLIST = 'SUCCESS_PROJECTLIST';
export const FAILURE_PROJECTLIST = 'FAILURE_PROJECTLIST';

// TODO get just one project

export const { successProjectList, failureProjectList, requestProjectList } = createActions(
  { SUCCESS_PROJECTLIST: (title) => ({ title }) },
  REQUEST_PROJECTLIST,
  FAILURE_PROJECTLIST,
);
