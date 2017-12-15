import React from 'react';
import renderer from 'react-test-renderer';

import Logo from 'Components/Logo';

describe('Logo', () => {
  it('should match the snapshot', () => {
    const logo = renderer.create(<Logo />);

    expect(logo.toJSON()).toMatchSnapshot();
  });
});
