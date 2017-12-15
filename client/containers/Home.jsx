import React, { Component } from 'react';

import Hero from 'Components/Hero';
import QuestionList from 'Components/QuestionList';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }
  componentDidMount() {
    return fetch('/api/questions/')
      .then(res => res.json())
      .then((questions) => {
        this.setState({
          questions,
        });
      });
  }
  render() {
    return (
      <main className="page">
        <Hero />
        <QuestionList questions={this.state.questions} />
      </main>
    );
  }
}

export default Home;
