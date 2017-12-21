const mongoose = require('mongoose');

const answers = [
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae70950006a8'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000640'),
    body: 'Fusce posuere felis sed lacus. ',
    votes: 14,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000642'),
      name: 'Maurise Britney',
      avatar: 'test-avatar-1.jpg',
    },
    submitted_at: '2017-12-20T21:07:44.898Z',
    updated_at: '2017-12-20T21:07:44.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae70950006a9'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body:
      'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.',
    votes: 43,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000638'),
      name: 'Yoshi Gilchrist',
      avatar: 'test-avatar-2.jpg',
    },
    submitted_at: '2017-12-20T22:07:44.898Z',
    updated_at: '2017-12-20T22:07:44.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae70950006a0'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body: 'Aliquam sit amet diam in magna bibendum imperdiet.',
    votes: 1,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:05:44.898Z',
    updated_at: '2017-12-20T22:05:44.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae70950006a1'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus',
    votes: 10,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:09:44.898Z',
    updated_at: '2017-12-20T22:09:44.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae70950006a2'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body: 'Nullam varius. Nulla facilisi.',
    votes: 26,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:03:41.898Z',
    updated_at: '2017-12-20T22:03:41.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae70950006a3'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body: 'Pellentesque ultrices mattis odio. Donec vitae nisi.',
    votes: 103,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:07:01.898Z',
    updated_at: '2017-12-20T22:07:01.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae70950006a4'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    votes: 1,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:07:16.898Z',
    updated_at: '2017-12-20T22:07:16.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000618'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body: 'Vestibulum ante ipsum primis in faucibus',
    votes: 0,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:55:44.898Z',
    updated_at: '2017-12-20T22:55:44.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000619'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body: 'Nam congue, risus semper porta volutpat, quam pede lobortis',
    votes: 9,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:01:07.898Z',
    updated_at: '2017-12-20T22:01:07.898Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000620'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna',
    votes: 44,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-19T23:04:24.894Z',
    updated_at: '2017-12-19T23:04:24.894Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000621'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000649'),
    body:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id promise.',
    votes: 0,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:07:44.899Z',
    updated_at: '2017-12-20T22:07:44.899Z',
  },
  {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000622'),
    question_id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000640'),
    body: 'A penatibus et magnis dis parturient montes',
    votes: 3,
    author: {
      _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000636'),
      name: 'Killie Povey',
      avatar: 'test-avatar-3.jpg',
    },
    submitted_at: '2017-12-20T22:23:19.880Z',
    updated_at: '2017-12-20T22:23:19.880Z',
  },
];

module.exports = answers;
