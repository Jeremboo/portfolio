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


export class ProjectsListContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProjects());
  }

  render() {
    const { projects, onProjectClick } = this.props;
    return (
      <ProjectList
        projects={projects}
        onProjectCLick={onProjectClick}
      />
    );
  }
}
ProjectsListContainer.propTypes = {
  projects: PropTypes.array.isRequired,
  onProjectClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProjectsListContainerProps = state => ({
  projects: state.projects,
});

const mapDispatchToProjectsListContainerProps = dispatch => ({
  onProjectClick: id => dispatch(openProject(id)),
});

export default connect(
  mapStateToProjectsListContainerProps,
  mapDispatchToProjectsListContainerProps
)(ProjectsListContainer);
