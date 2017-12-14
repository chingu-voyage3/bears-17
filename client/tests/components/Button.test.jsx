import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from 'Components/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('should exist', () => {
    expect(Button).toBeDefined();
  });

  it('should render a button', () => {
    const button = shallow(<Button handleClick={f => f}>x</Button>);
    const btn = button.find('button');

    expect(btn.length).toBe(1);
  });

  it('should have a default class name', () => {
    const button = shallow(<Button handleClick={f => f}>x</Button>);
    const btn = button.find('button');

    expect(btn.hasClass('btn')).toBe(true);
  });

  it('should have a default size');
  it('should have a default variant');

  it('should have the correct class depending on the size', () => {
    const button = shallow(<Button size="lg" handleClick={f => f}>x</Button>);
    const btn = button.find('button');

    expect(btn.hasClass('btn--lg')).toBe(true);
  });

  it('should have the correct class depending on the variant', () => {
    const button = shallow(<Button variant="primary" handleClick={f => f}>x</Button>);
    const btn = button.find('button');

    expect(btn.hasClass('btn--primary')).toBe(true);
  });

  it('should call a callback function on click', () => {
    const handleClick = jest.fn();
    const button = shallow(<Button handleClick={handleClick}>x</Button>);
    const btn = button.find('button');

    btn.simulate('click');
    expect(handleClick).toBeCalled();
  });

  it('should have a disabled attribute if disabled prop is true', () => {
    const button = shallow(<Button disabled handleClick={f => f}>x</Button>);
    const btn = button.find('button');

    expect(btn.prop('disabled')).toBe(true);
  });

  it.skip('should not call a callback function on click if disabled', () => {
    const handleClick = jest.fn();
    const button = shallow(<Button disabled handleClick={handleClick}>x</Button>);
    const btn = button.find('button');

    btn.simulate('click');
    expect(handleClick).not.toBeCalled();
  });
});
