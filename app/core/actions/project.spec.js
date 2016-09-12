// import { expect } from 'chai';
import expect from 'expect'

import { getProject, fetchProject, failureProject } from './projects';

// TODO simulate store
const idKnow = 5;
const idUnknow = 999;
const dispatch = expect.createSpy();
const projectExample = { id: idKnow, content: 'content' };
const getEmptyState = () => ({ projects: [] }); // TODO analyse if projects is already an empty array a the beginning
const getState = () => ({ projects: [projectExample] });

describe('Middleware getProject(id)', function() {

  it('return a function', function() {
    expect(getProject(0)).toBeA('function');
  });

  it('return a project already loaded on state', function() {
    expect(getProject(idKnow)(dispatch, getState)).toEqual(projectExample);
  });

  it('return dispatch(failureProject(id)) when the projects are loaded but no one have this id', function() {
    getProject(idUnknow)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(failureProject(idUnknow));
  });

  it('call dispatch(fetchProject(id)) when the projets are not loaded', function() {
    getProject(idKnow)(dispatch, getEmptyState);
    expect(dispatch).toHaveBeenCalledWith(fetchProject(idKnow));
  });
});
