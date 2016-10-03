/**
*
* app/containers/MenuContainer.js
* Load the project list
*
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export class MenuContainer extends Component {
  render() {
    return (
      <ul>
        <li>Home 1</li>
        <li>Home 2</li>
        <li>Home 3</li>
      </ul>
    );
  }
}
MenuContainer.propTypes = {

};

export default connect(
  state => ({

  }),
  dispatch => ({

  }),
)(MenuContainer);
