/**
*
* app/components/Header/Header.js
* Header
*
**/

import React from 'react';
import './Header.styl';

const Header = ({ showed }) =>
  <header
    className={`Header ${showed ? '' : 'Header_hidden'}`}
  >
    <h1 className="Header-title">Header</h1>
  </header>
;

// TODO generic props and defautl props
Header.propTypes = {
  showed: React.PropTypes.bool,
};
Header.defaultProps = {
  showed: false,
};

export default Header;
