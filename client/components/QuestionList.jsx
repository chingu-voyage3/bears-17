/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormatDate from 'Components/FormatDate';
import UserBar from 'Components/UserBar';

const QuestionList = ({ questions }) => {
  const list = questions.map(question => (
    <li className="question" key={question._id}>
      <h3 className="question__title">
        <Link to={`/question/${question._id}`}>{question.title}</Link>
      </h3>

      <footer className="question__meta">
        <UserBar name={question.author.name} avatar={question.author.avatar} />
        <div className="question__votes">{question.votes} votes</div>
        <span className="question__time">
          <FormatDate date={question.submitted_at} />
        </span>
        <span>X answers</span>
      </footer>
    </li>
  ));

  return (
    <section className="">
      <div className="wrapper">
        <ul className="question-list">
          {list}
        </ul>
      </div>
    </section>
  );
};

QuestionList.defaultProps = {
  questions: [],
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default QuestionList;
