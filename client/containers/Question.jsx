/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';


import QuestionHeader from 'Components/QuestionHeader';

import ModalButton from 'Components/ModalButton';
import Modal from 'Components/Modal';
import AnswerList from 'Components/AnswerList';


class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      answers: [],
      modal: false,
      answer: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentDidMount() {
    Promise.all([
      axios.get(`/api/question/${this.props.match.params.id}`),
      axios.get(`/api/answers/${this.props.match.params.id}`),
    ]).then((res) => {
      const [question, answers] = res;
      return this.setState({ question: question.data, answers: answers.data });
    });
  }

  clearAnswer() {
    this.setState({
      answer: '',
    });
    this.toggleModal();
  }

  handleChange(event, input) {
    this.setState({
      [input]: event.target.value,
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleSubmit() {
    const answer = {
      question_id: this.state.question._id,
      body: this.state.answer,
    };

    axios.post('/api/answer', answer)
      .then((res) => {
        const { answers } = this.state;
        answers.push(res.data);

        this.setState({
          answers,
        });
      });
    this.clearAnswer();
  }

  handleVote(answer) {
    axios.post(`/api/answer/${answer}/vote`, { user_id: this.props.profile._id })
      .then((res) => {
        return this.updateVote(res.data);
      });
  }

  updateVote(answer) {
    const answers = this.state.answers.slice();
    const index = answers.findIndex(e => e._id === answer._id);

    return this.setState({
      answers: [...this.state.answers.slice(0, index),
        ...this.state.answers.slice(index + 1),
        answer],
    });
  }

  render() {
    return (
      <main>
        {this.state.modal &&
          <Modal
            questionTitle={this.state.question.title}
            questionBody={this.state.question.body}
            answer={this.state.answer}
            handleChange={this.handleChange}
            toggleModal={this.toggleModal}
            handleSubmit={this.handleSubmit}
          />}
        <QuestionHeader title={this.state.question.title} />
        <div className="wrapper">
          <p>{this.state.question.body}</p>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <ModalButton toggleModal={this.toggleModal}>
              Answer Question
            </ModalButton>
          </div>
          <h3>Answers</h3>
          <AnswerList answers={this.state.answers} handleVote={this.handleVote} />
        </div>
      </main>
    );
  }
}

Question.defaultProps = {
  profile: {
    _id: '',
  },
};

Question.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  profile: state.userReducer.profile,
});

const QuestionConnect = connect(mapStateToProps)(Question);

export default QuestionConnect;
