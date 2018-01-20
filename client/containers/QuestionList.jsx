/* eslint-disable no-console */
import React, { Component } from 'react';

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
        console.log(data);
        this.setState({ totalQuestions: data });
      });
  }
  getQuestions(page) {
    const url = page ? `/api/questions?page=${page}` : '/api/questions';
    console.log(page);
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ questions: data }));
  }

  render() {
    const pages = [];
    for (let i = 0; i < this.state.totalQuestions / 10; i += 1) {
      pages.push(<button key={i} onClick={() => this.getQuestions(i + 1)}>{i + 1}</button>);
    }
    return (
      <div>
        {pages}
        <ul>{this.state.questions.map(question => <li key={question.title}>{question.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default QuestionList;
