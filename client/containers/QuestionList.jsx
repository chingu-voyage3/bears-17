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
  getQuestions() {
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => this.setState({ questions: data }));
  }

  render() {
    const pages = [];
    for (let i = 0; i < this.state.totalQuestions / 10; i += 1) {
      pages.push(<li>{i + 1}</li>);
    }
    return (
      <div>
        {pages}
        <ul>{this.state.questions.map(question => <li>{question.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default QuestionList;
