const mongoose = require('mongoose');

const answer = {
  question_id: new mongoose.Types.ObjectId(),
  submitted_at: Date.now(),
  body:
    'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
  votes: 43,
  author: {
    _id: new mongoose.Types.ObjectId('5a2ff186fc13ae7095000642'),
    name: 'Maurise Britney',
    avatar:
      'http://dummyimage.com/512x512.jpg/5fa2dd/ffffff&text=Maurise Britney',
  },
};

const question = {
  _id: new mongoose.Types.ObjectId(),
  title: 'First Question',
  question: 'Describe your workflow',
  author: {
    name: 'User',
    avatar: 'avatar',
  },
};

const user = {
  name: "Test User",
  avatar: "https://www.images.com/avatar.png",
};

module.exports = {
  answerData: answer,
  questionData: question,
  userData: user,
};
