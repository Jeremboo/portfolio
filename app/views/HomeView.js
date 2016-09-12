/**
*
* app/views/HomeView.js
* HomeView
*
**/

import React from 'react';

import Header from 'component/Header/Header';
import MenuContainer from 'containers/MenuContainer';
import ProjetsContainer from 'containers/ProjetsContainer';

const HomeView = () => (
  <section className="_content">
    <Header showed="true" />
    <MenuContainer />
    <ProjetsContainer />
  </section>
);


export default HomeView;
