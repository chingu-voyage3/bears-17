import React from 'react';
import renderer from 'react-test-renderer';

import Hero from 'Components/Hero';

describe('Hero', () => {
  it('should match the snapshot', () => {
    const hero = renderer.create(<Hero />);

    expect(hero.toJSON()).toMatchSnapshot();
  });
});
