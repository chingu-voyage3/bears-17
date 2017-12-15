/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import renderer from 'react-test-renderer';

import Emoji from 'Components/Emoji';

describe('Emoji', () => {
  it('should match the snapshot', () => {
    const emoji = renderer.create(<Emoji label="fire">🔥</Emoji>);

    expect(emoji.toJSON()).toMatchSnapshot();
  });
});
