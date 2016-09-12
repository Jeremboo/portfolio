import { makeActionCreator } from 'core/utils';

// ACTIONS NAME
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const SUCCESS_PROJECTS = 'SUCCESS_PROJECTS';
export const FAILURE_PROJECTS = 'FAILURE_PROJECTS';

// ACTIONS
export const requestProjects = makeActionCreator(REQUEST_PROJECTS);
export const successProjects = makeActionCreator(SUCCESS_PROJECTS, 'projects');
export const failureProjects = makeActionCreator(FAILURE_PROJECTS, 'error');

export const fetchProjects = () => dispatch => {
  dispatch(requestProjects);
  // TODO AJAX API
  setTimeout(
    () => {
      dispatch(successProjects([
        { id: 0, content: 'a project' },
        { id: 1, content: 'a second project' },
      ]));
    }
  );
};

export const fetchProject = id => dispatch => {
  dispatch(requestProjects());
  // TODO AJAX API
  setTimeout(
    () => {
      dispatch(successProject({ id: 0, content: 'a project'}));
    }
  );
};

// MIDDLEWARE
export const getProjects = () => (dispatch, getState) => {
  const { projects } = getState();

  if (projects.length === 0) return dispatch(fetchProjects());

  return projects;
};
