import React from 'react';
import renderer from 'react-test-renderer';

import Navigation from 'Components/Navigation';

describe('Navigation', () => {
  it('should match the snapshot', () => {
    const nav = renderer.create(<Navigation />);

    expect(nav.toJSON()).toMatchSnapshot();
  });
});
