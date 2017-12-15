import React from 'react';
import renderer from 'react-test-renderer';

import QuestionHeader from 'Components/QuestionHeader';

describe('QuestionHeader', () => {
  it('should match the snapshot', () => {
    const header = renderer.create(<QuestionHeader title="Test Title" />);

    expect(header.toJSON()).toMatchSnapshot();
  });
});
