import React from 'react';
import { shallow } from 'enzyme';

export default function (initialProps = {}) {
  return function setup(ComponentToShallow, props = {}) {
    const currentProps = Object.assign({}, initialProps, props);

    return shallow(<ComponentToShallow {...currentProps} />);
  };
}
