/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import QuestionHeader from 'Components/QuestionHeader';
import UserBar from 'Components/UserBar';

const answers = [{
  _id: '5a2eadcafc13ae207a0001a3',
  submitted_at: '2017-12-08T16:43:58Z',
  body:
    "A flash of unstyled content (FOUC) is an instance where a web page appears briefly with the browser's default styles prior to loading an external CSS stylesheet, due to the web browser engine rendering the page before all information is retrieved.",
  votes: 60,
  author: {
    name: 'Aldridge McCallum',
    avatar:
      'http://dummyimage.com/512x512.jpg/ff4444/ffffff&text=Aldridge McCallum',
  },
}, {
  _id: '5a2eadcafc13ae207a0001a4',
  submitted_at: '2017-12-07T22:02:10Z',
  body:
    'Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.',
  votes: 0,
  author: {
    name: 'Merrile Lippi',
    avatar:
      'http://dummyimage.com/512x512.jpg/dddddd/000000&text=Merrile Lippi',
  },
}, {
  _id: '5a2eadcafc13ae207a0001a5',
  submitted_at: '2017-12-10T23:19:36Z',
  body:
    'A flash of unstyled content (FOUC, also flash of unstyled text or FOUT)[1] [2] is an instance where a web page appears briefly with the default styles prior to loading an external CSS stylesheet, due to the web browser engine rendering the page before all information is retrieved. The page corrects itself as soon as the style rules are loaded and applied; however, the shift may be distracting. Related problems include flash of invisible text (FOIT) and flash of faux text (FOFT).',
  votes: 51,
  author: {
    name: 'Wilmar Dicken',
    avatar:
      'http://dummyimage.com/512x512.jpg/dddddd/000000&text=Wilmar Dicken',
  },
}, {
  _id: '5a2eadcafc13ae207a0001a6',
  submitted_at: '2017-12-10T14:19:47Z',
  body:
    'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.',
  votes: 12,
  author: {
    name: 'Allyson Silversmidt',
    avatar:
      'http://dummyimage.com/512x512.jpg/cc0000/ffffff&text=Allyson Silversmidt',
  },
}, {
  _id: '5a2eadcafc13ae207a0001a7',
  submitted_at: '2017-12-09T20:10:57Z',
  body: 'Morbi a ipsum. Integer a nibh. In quis justo.',
  votes: 0,
  author: {
    name: 'Herold Harkins',
    avatar:
      'http://dummyimage.com/512x512.jpg/ff4444/ffffff&text=Herold Harkins',
  },
}];

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      answers,
    };
  }
  componentDidMount() {
    return fetch(`/api/question/${this.props.match.params.id}`)
      .then(res => res.json())
      .then((q) => {
        this.setState({
          question: q,
        });
      });
  }
  render() {
    const renderedAnswers = this.state.answers.map(answer => (
      <section key={answer._id}>
        <UserBar name={answer.author.name} avatar={answer.author.avatar} />
        <p>{answer.body}</p>
      </section>
    ));
    return (
      <main>
        <QuestionHeader title={this.state.question.title} />
        <div className="wrapper">
          <p>{this.state.question.body}</p>
          <h3>Answers</h3>
          {renderedAnswers}
        </div>
      </main>
    );
  }
}

Question.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Question;
