import React from 'react';
import renderer from 'react-test-renderer';

import Footer from 'Components/Footer';

describe('Footer', () => {
  it('should match the snapshot', () => {
    const footer = renderer.create(<Footer />);

    expect(footer.toJSON()).toMatchSnapshot();
  });
});
