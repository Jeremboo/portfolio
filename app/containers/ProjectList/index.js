/**
*
* app/containers/ProjetsList.js
* Load the project list
*
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProjectList, openProject } from './modules/middlewares';

import ProjectList from './components/ProjectList';

export default connect(
  state => state.projectList,
  dispatch => ({
    onProjectClick: id => dispatch(openProject(id)),
  }),
)(ProjectList);
