import React from 'react';
import renderer from 'react-test-renderer';

import QuestionList from 'Components/QuestionList';

const questions = [{
  _id: '5a3304d3fc13ae261a0002c6',
  submitted_at: '2017-12-08T08:23:31Z',
  title: 'Vestibulum ac est lacinia nisi venenatis tristique?',
  body:
    'Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
  votes: 34,
  author: {
    _id: '5a3304d3fc13ae261a0002c7',
    name: 'Brandais Frodsam',
    avatar:
      'http://dummyimage.com/512x512.jpg/dddddd/000000&text=Brandais Frodsam',
  },
}, {
  _id: '5a3304d3fc13ae261a0002c8',
  submitted_at: '2017-12-04T22:09:29Z',
  title: 'Nulla mollis molestie lorem?',
  body:
    'Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
  votes: 5,
  author: {
    _id: '5a3304d3fc13ae261a0002c9',
    name: 'Matthias Dymock',
    avatar:
      'http://dummyimage.com/512x512.jpg/cc0000/ffffff&text=Matthias Dymock',
  },
}, {
  _id: '5a3304d3fc13ae261a0002ca',
  submitted_at: '2017-12-06T22:20:15Z',
  title: 'Nullam sit amet turpis elementum ligula vehicula consequat?',
  body:
    'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',
  votes: 67,
  author: {
    _id: '5a3304d3fc13ae261a0002cb',
    name: 'Ingmar Storey',
    avatar:
      'http://dummyimage.com/512x512.jpg/5fa2dd/ffffff&text=Ingmar Storey',
  },
}];

describe('QuestionList', () => {
  it('should match the snapshot', () => {
    const list = renderer.create(<QuestionList questions={questions} />);

    expect(list.toJSON()).toMatchSnapshot();
  });
});
