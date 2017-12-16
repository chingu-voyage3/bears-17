require('dotenv').config();
const mongoose = require('mongoose');
const { Question, User, Answer } = require('./testSchema.js');
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

  test('Answer should save and be searchable on the DB', async (done) => {
    const answer = {
      question_id: {
        $oid: '5a2ff257fc13ae6d59000532',
      },
      submitted_at: '2017-12-09T21:09:03Z',
      body: 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      votes: 43,
      author: {
        _id: {
          $oid: '5a2ff186fc13ae7095000642',
        },
        name: 'Maurise Britney',
        avatar: 'http://dummyimage.com/512x512.jpg/5fa2dd/ffffff&text=Maurise Britney',
      },
    };

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
    const answer = {
      question_id: id,
      submitted_at: Date.now(),
      body: 'Answer to a test',
      author: {
        _id: {
          $oid: '5a2ff186fc13ae7095000642',
        },
        name: 'Maurise Britney',
        avatar: 'http://dummyimage.com/512x512.jpg/5fa2dd/ffffff&text=Maurise Britney',
      },
    };

    await Question.findById(id)
      .then(() => {
        const newAnswer = new Answer(answer);
        newAnswer.save();
      });

    await Answer.find()
      .then((res) => {
        expect(res).toHaveLength(1);
        expect(res[0].question_id).toEqual(id);
      });

    done();
  });
});

