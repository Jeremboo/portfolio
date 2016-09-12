import { makeActionCreator } from 'core/utils';

export const REQUEST_PROJECT = 'REQUEST_PROJECT';
export const SUCCESS_PROJECT = 'SUCCESS_PROJECT';
export const FAILURE_PROJECT = 'FAILURE_PROJECT';

// ACTIONS
export const requestProject = makeActionCreator(REQUEST_PROJECT, 'id');
export const successProject = makeActionCreator(SUCCESS_PROJECT, 'id', 'project');
export const failureProject = makeActionCreator(FAILURE_PROJECT, 'id', 'error');

export const fetchProject = id => dispatch => {
  dispatch(requestProjects(id));
  // TODO AJAX API
  setTimeout(
    () => {
      dispatch(successProject({ id: 0, content: 'a project' }));
    }
  );
};

// MIDDLEWARE
export const getProject = id => (dispatch, getState) => {
  const { projects } = getState();

  if (projects.length === 0) return dispatch(fetchProject(id));

  let i;
  for (i = 0; i < projects.length; i++) {
    if (projects[i].id === id) return projects[i];
  }

  return dispatch(failureProject(id));
};
