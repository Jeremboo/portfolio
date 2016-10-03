import React from 'react';

import Header from 'components/Header/Header';
import MenuContainer from 'containers/MenuContainer';
import ProjetsContainer from 'containers/ProjectsContainer';

const HomeView = () => (
  <section className="_content">
    <Header showed={false} />
    <MenuContainer />
    <ProjetsContainer />
  </section>
);


export default HomeView;
