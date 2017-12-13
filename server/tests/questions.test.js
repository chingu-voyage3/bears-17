require('dotenv').config();
const mongoose = require('mongoose');
const { Question, User } = require('./testSchema.js');
mongoose.Promise = require('bluebird');

describe('Test mongoose models', () => {
  const questionData = {
    _id: new mongoose.Types.ObjectId(),
    title: 'First Question',
    question: 'Describe your workflow',
    author: {
      name: 'User',
      avatar: 'avatar',
    },
  };

  let question;

  beforeAll(() => {
    mongoose.connect(process.env.TEST_DB)
      .then((res) => {
        console.log('Connected');
      });
  });

  beforeEach(() => {
    question = new Question(questionData);
    return question.save();
  });

  afterEach(() => {
    Question.remove({}).exec();
    User.remove({}).exec();
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  test('Should return a single entry that matches questionData', async (done) => {
    await Question.find({})
      .then((result) => {
        expect(result).toHaveLength(1);
        expect(result[0].title).toEqual(questionData.title);
      });

    done();
  });
  
  test('Should remove a single entry and return an empty array ', async (done) => {
    await Question.find({})
      .then(result => result[0].remove()).then(() => {
        Question.find({ _id: questionData._id })
          .then((res) => {
            expect(res).toHaveLength(0);
          });
      });
    done();
  });

  test('should find and return an entry based on id', async (done) => {
    await Question.findById(questionData._id)
      .then((res) => {
        expect(res.title).toEqual(questionData.title);
      });

    done();
  });


  test('The returned question should have an author that matched new user entry', async (done) => {
    const userData = {
      name: 'Test User',
      avatar: 'https://www.images.com/avatar.png',
    };

    const user = new User(userData);
    await user.save();

    const newQuestion = new Question({
      title: 'New Question',
      body: 'Body of the new question.',
      author: userData,
    });

    await newQuestion.save();

    await Question.find({ title: newQuestion.title })
      .then((res) => {
        expect(res[0].author.name).toEqual(userData.name);
      });
    done();
  });

});

