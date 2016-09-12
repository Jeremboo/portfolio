// import { expect } from 'chai';
import expect from 'expect'

import { getProjects, fetchProjects } from './projects';

// TODO simulate store
const dispatch = expect.createSpy();
const projectExample = { id: 5, content: 'content' };
const getEmptyState = () => ({ projects: [] });
const getState = () => ({ projects: [projectExample] });

describe('Middleware getProjects()', function() {

  it('return a function', function() {
    expect(getProjects()).toBeA('function');
  });

  it('return dispatch(fetchProjects()) when the projects are not already loaded', function() {
    getProjects()(dispatch, getEmptyState);
    expect(dispatch).toHaveBeenCalledWith(fetchProjects());
  });

  it('return the projects when they already loaded on state', function() {
    const { projects } = getState();
    expect(getProjects()(dispatch, getState)).toEqual(projects);
  });
});
