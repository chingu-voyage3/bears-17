import React, { Component } from 'react';
import axios from 'axios';

import QuestionForm from 'Components/QuestionForm.jsx';

class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearState() {
    this.setState({
      title: '',
      body: '',
    });
  }

  handleChange(event, input) {
    this.setState({
      [input]: event.target.value,
    });
  }

  handleSubmit () {
    axios.post('/api/post/question', this.state)
      .then(res => res);
    this.clearState();
  }

  render() {
    return <QuestionForm handleChange={this.handleChange} title={this.state.title} body={this.state.body} />;
  }
}

export default CreateQuestion;
