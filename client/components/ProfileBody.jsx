/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const bodyStyle = {
  minHeight: '50vh',
  border: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
};

const menuStyle = {
  marginTop: '1rem',
  paddingLeft: '0px',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  listStyle: 'none',
  borderBottom: '1px solid #BDC3C7',
};

const panelList = {
  listStyle: 'none',
  marginRight: '2rem',
};

const questionPanel = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid #595979',
  borderRadius: '2px',
  padding: '0.25rem 0.5rem',
  marginBottom: '0.5rem',
};

const ProfileBody = (props) => {
  let answers;
  let questions;

  if (props.answers.length > 0) {
    answers = props.answers.map(e => (
      <li key={e._id}>
        <div style={questionPanel}>
          <Link to={`/question/${e.question_id}`}>
            {`${e.body.slice(0, 72)}...`}
          </Link>
        </div>
      </li>
    ));
  } else {
    answers = <li>No Answers</li>;
  }

  if (props.questions.length > 0) {
    questions = props.questions.map(e => (
      <li key={e._id}>
        <div style={questionPanel}>
          <Link to={`/question/${e._id}`}>{e.title}</Link>
        </div>
      </li>
    ));
  } else {
    questions = <li>No Questions</li>;
  }

  return (
    <div style={bodyStyle}>
      <ul style={menuStyle}>
        <li className="dashboard-menu-list">
          <button
            className="dashboard-menu-item"
            onClick={() => props.handleToggle('questions')}
          >
            Questions
          </button>
        </li>
        <li className="dashboard-menu-list">
          <button
            className="dashboard-menu-item"
            onClick={() => props.handleToggle('answers')}
          >
            Answers
          </button>
        </li>
      </ul>
      <ul style={panelList}>
        {props.toggle === 'answers' && answers}
        {props.toggle === 'questions' && questions}
      </ul>
    </div>
  );
};


ProfileBody.defaultProps = {
  questions: [],
  answers: [],
  toggle: '',
};

ProfileBody.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  answers: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.string,
};

export default ProfileBody;
