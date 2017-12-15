import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
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

  it('should have a default size', () => {
    const avatar = mount(<Avatar />);
    expect(avatar.props().size).toBe('medium');
  });

  it('should have a default src', () => {
    const avatar = mount(<Avatar />);
    expect(avatar.props().img).toBe('https://dummyimage.com/256/256/fff.png&text=Avatar+Component');
  });

  it('should have the correct class depending on size prop', () => {
    const avatarSmall = shallow(<Avatar size="small" />);
    expect(avatarSmall.find('img').hasClass('avatar--small')).toBe(true);
    const avatarLarge = shallow(<Avatar size="large" />);
    expect(avatarLarge.find('img').hasClass('avatar--large')).toBe(true);
  });

  it('should have the correct class depending on round prop', () => {
    const avatarRound = shallow(<Avatar round />);
    expect(avatarRound.find('img').hasClass('avatar--round')).toBe(true);
    const avatar = shallow(<Avatar />);
    expect(avatar.find('img').hasClass('avatar--round')).toBe(false);
  });

  it('should have the correct image depending on img prop', () => {
    const avatar = shallow(<Avatar />);
    expect(avatar.props().img).toBe(avatar.find('img').src);
  });
});
