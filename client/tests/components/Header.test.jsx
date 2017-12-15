import React from 'react';
import renderer from 'react-test-renderer';

import Header from 'Components/Header';

describe('Header', () => {
  it('should match the snapshot', () => {
    const header = renderer.create(<Header />);

    expect(header.toJSON()).toMatchSnapshot();
  });
});
