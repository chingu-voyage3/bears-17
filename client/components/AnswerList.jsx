/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import UserBar from './UserBar.jsx';

const AnswerList = (props) => {
  const answers = props.answers.map(answer => (
    <section key={answer._id}>
      <UserBar
        name={answer.author.username}
        avatar="https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
      />
      <p>{answer.body}</p>
    </section>
  ));

  return (
    <div>
      {answers}
    </div>
  );
};

export default AnswerList;

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
