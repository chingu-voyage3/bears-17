require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./testSchema.js');
mongoose.Promise = require('bluebird');

describe('Test mongoose actually works!', () => {
  const questionData = {
    _id: new mongoose.Types.ObjectId(),
    title: 'First Question',
    question: 'Describe your workflow',
  };

  let question;

  beforeAll(() => {
    mongoose.connect('mongodb://127.0.0.1:27017/test')
      .then((res) => {
        console.log('Connected');
      });
  });

  beforeEach(() => {
    question = new Question(questionData);
    return question.save();
  });

  afterEach(() => Question.remove({})
    .then((res) => {
      console.log('removed');
    }));

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
      .then((result) => result[0].remove()).then((result) => {
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
});

