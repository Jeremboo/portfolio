import { requestProjectList, successProjectList, successProject } from './actions';

export const fetchProjectList = () => dispatch => {
  dispatch(requestProjectList);
  // TODO AJAX API
  setTimeout(
    () => {
      dispatch(successProjectList([
        { id: 0, content: 'a project' },
        { id: 1, content: 'a second project' },
      ]));
    }
  );
};


// Public
export const getProject = () => (dispatch, getState) => {
  const projectlist = getProjectList();
  // TODO .then(return the project or an error)
}
// Public
export const getProjectList = () => (dispatch, getState) => {
  const { projectList } = getState();

  if (projectList.length === 0) return dispatch(fetchProjectList());

  return projectList;
};
