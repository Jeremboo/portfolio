/**
*
* app/containers/ProjectList/components/Project.js
* Project
*
**/

import React, { PropTypes } from 'react';
import './Project.styl';


const Project = ({ project, onProjectClick }) =>
  <div className="Project">
    <p>{project.name}</p>
  </div>
;

// TODO generic props and defautl props
Project.propTypes = {
  showed: PropTypes.bool,
  project: PropTypes.object.isRequired,
  onProjectClick: PropTypes.func.isRequired,
};
Project.defaultProps = {
  showed: false,
};

export default Project;
