// import { expect } from 'chai';
import expect from 'expect'

import { getProjects, fetchProjects } from './middlewares';

// TODO simulate store
const dispatch = expect.createSpy();
const projectExample = { id: 5, content: 'content' };
const getEmptyState = () => ({ projects: [] });
const getState = () => ({ projectList: [projectExample] });

describe('Middleware getProjects()', function() {

  it('return a function', function() {
    expect(getProjects()).toBeA('function');
  });

  it('return dispatch(fetchProjects()) when the projects are not already loaded', function() {
    getProjects()(dispatch, getEmptyState);
    expect(dispatch).toHaveBeenCalledWith(fetchProjects());
  });

  it('return the projects when they already loaded on state', function() {
    const { projectList } = getState();
    expect(getProjects()(dispatch, getState)).toEqual(projects);
  });
});
