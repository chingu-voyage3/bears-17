require('dotenv').config();
const mongoose = require('mongoose');
const { Question, User, Answer } = require('./testSchema.js');
const { answerData, questionData, userData } = require('./data/testData');
mongoose.Promise = require('bluebird');

describe('Test mongoose models', () => {
  let question;

  beforeAll(() => {
    mongoose.connect(process.env.TEST_DB)
      .then(() => {
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
    Answer.remove({}).exec();
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

  test('Should remove a single entry and return an empty array', async (done) => {
    await Question.find({})
      .then(result => result[0].remove()).then(() => {
        Question.find({ _id: questionData._id })
          .then((res) => {
            expect(res).toHaveLength(0);
          });
      });
    done();
  });

  test('Should find and return an entry based on id', async (done) => {
    await Question.findById(questionData._id)
      .then((res) => {
        expect(res.title).toEqual(questionData.title);
      });

    done();
  });


  test('The returned question should have an author that matched new user entry', async (done) => {
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

  test('Answer should save and be searchable on the DB', async (done) => {
    const answer = answerData;

    const newAnswer = new Answer(answer);
    await newAnswer.save();

    await Answer.find({ 'author.name': answer.author.name })
      .then((res) => {
        expect(res).toHaveLength(1);
        expect(res[0].author.name).toEqual(answer.author.name);
      });

    done();
  });


  test('Should be able to find a question by ID, add a new answer and return that answer on the DB', async (done) => {
    const id = questionData._id;
    const answer = answerData;

    await Question.findById(id)
      .then(() => {
        const newAnswer = new Answer(answer);
        newAnswer.save();
      });

    await Answer.find()
      .then((res) => {
        expect(res).toHaveLength(1);
        expect(res[0].body).toEqual(answer.body);
      });

    done();
  });
});
