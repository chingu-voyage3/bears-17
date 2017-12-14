import React from 'react';
import renderer from 'react-test-renderer';

import UserBar from 'Components/UserBar';

describe('UserBar', () => {
  it('should match the snapshot', () => {
    const userbar = renderer.create(<UserBar name="John Doe" avatar="img.jpg" />);

    expect(userbar.toJSON()).toMatchSnapshot();
  });
});
