/**
*
* app/views/Layout.js
* Layout
*
**/

import React from 'react';

const Layout = ({ children }) => (
  <div id="layout">
    { children }
  </div>
);
Layout.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default Layout;
