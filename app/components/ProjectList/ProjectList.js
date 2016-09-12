/**
*
* app/components/ProjectList/ProjectList.js
* ProjectList
*
**/

import React, { PropTypes } from 'react';
import './ProjectList.styl';

import Project from 'component/Project/Project'

// TODO cascade animation when showed = true;
const ProjectList = ({ showed, projects, onProjectClick }) =>
  <ul className="ProjectList">
    {projects.map(project =>
      <Project
        project={project}
        onProjectClick={onProjectClick}
      />
    )}
  </ul>
;

// TODO generic props and defautl props
ProjectList.propTypes = {
  showed: PropTypes.bool,
  projects: PropTypes.array.isRequired,
  onProjectClick: PropTypes.func.isRequired,
};
ProjectList.defaultProps = {
  showed: false,
};

export default ProjectList;
