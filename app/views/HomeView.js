import React from 'react';

import Header from 'components/Header/Header';
import MenuContainer from 'containers/MenuContainer';
import ProjetList from 'containers/ProjectList';

// TODO stateless to statefull
// TODO watch quand les projects sont chargé
// TODO faire apparaire un par un les composants
// TODO faire disparaitre un par un les composants
const HomeView = () => (
  <section className="_content">
    <Header showed={false} />
    <MenuContainer />
    <ProjetList />
  </section>
);

export default HomeView;
