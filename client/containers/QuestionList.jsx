/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { Component } from 'react';
import List from '../components/QuestionList.jsx';

const pageNav = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      totalQuestions: 0,
    };
  }
  componentWillMount() {
    this.getQuestionCount();
    this.getQuestions();
  }
  getQuestionCount() {
    fetch('/api/questions/total')
      .then(res => res.json())
      .then((data) => {
        this.setState({ totalQuestions: data });
      });
  }
  getQuestions(page) {
    const url = page ? `/api/questions?page=${page}` : '/api/questions';
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ questions: data }));
  }

  render() {
    const pages = [];
    for (let i = 0; i < this.state.totalQuestions / 10; i += 1) {
      pages.push(<button className="btn btn--outline btn--primary" key={i} onClick={() => this.getQuestions(i + 1)}>{i + 1}</button>);
    }
    return (
      <div>
        <List questions={this.state.questions} />
        <div style={pageNav}>
          {pages}
        </div>
      </div>
    );
  }
}

export default QuestionList;
