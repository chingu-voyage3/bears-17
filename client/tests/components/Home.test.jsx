import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from 'Components/Home';

Enzyme.configure({ adapter: new Adapter() });

describe('Home', () => {
  it('should exist', () => {
    expect(Home).toBeDefined();
  });

  it('should render an h2 tag', () => {
    const home = shallow(<Home />);
    const h2 = home.find('h2');

    expect(h2.length).toBe(1);
    expect(h2.text()).toBe('Home Page');
  });
});
