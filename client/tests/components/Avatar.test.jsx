import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Avatar from 'Components/Avatar';


Enzyme.configure({ adapter: new Adapter() });

describe('Avatar', () => {
  it('should exist', () => {
    expect(Avatar).toBeDefined();
  });

  it('should render an image', () => {
    const avatar = shallow(<Avatar />);
    const img = avatar.find('img');
    expect(img.length).toBe(1);
  });
});
