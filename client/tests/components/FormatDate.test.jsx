import React from 'react';
import renderer from 'react-test-renderer';

import FormatDate from 'Components/FormatDate';

describe('FormatDate', () => {
  it('should match the snapshot', () => {
    const date = renderer.create(<FormatDate date="2017-12-14T22:43:56.069Z" />);

    expect(date.toJSON()).toMatchSnapshot();
  });
});
