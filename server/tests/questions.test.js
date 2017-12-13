require('dotenv').config();
const mongoose = require('mongoose');
const { Question, Author } = require('./testSchema.js');
mongoose.Promise = require('bluebird');

describe('Test mongoose actually works!', () => {
  const questionData = {
    _id: new mongoose.Types.ObjectId(),
    title: 'First Question',
    question: 'Describe your workflow',
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

  afterEach(() => Question.remove({}));

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


  test('Returned entry should return a question object with author populated', async (done) => {
    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name: 'Test Author',
      email: 'test@author.com',
      avatar: 'https://www.images.com/avatar.png',
    });

    await author.save()
      .then(() => {
        const newQ = new Question({
          title: 'How do I connect two MongoDB models?',
          question: 'Is it possible to connect the two?',
          author: author._id,
        });

        return newQ.save();
      });

    await Question.find({ title: 'How do I connect two MongoDB models?' })
      .then((res) => {
        return res[0].populate('author')
          .execPopulate();
      })
      .then((res) => {
        expect(res.author.name).toEqual(author.name);
      });
    done();
  });
});

