/**
*
* app/containers/ProjetsContainer.js
* Load the project list
*
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProjects, openProject } from 'core/actions/projects';

import ProjectList from 'components/ProjectList/ProjectList';

export default connect(
  state => state.projects,
  dispatch => ({
    onProjectClick: id => dispatch(openProject(id)),
  }),
)(ProjectList);
