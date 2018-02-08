/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserBar from './UserBar.jsx';
import VoteBox from './VoteBox.jsx';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  paddingTop: '1.5rem',
  marginBottom: '1rem',
};

const voteBoxWrapper = {
  marginRight: '1rem',
};

const sortFunc = (a, b) => b.votes - a.votes;

const AnswerList = (props) => {
  const answers = props.answers.sort(sortFunc).map(answer => (
    <section key={answer._id}>
      <div style={wrapperStyle}>
        <div style={voteBoxWrapper}>
          {props.isLoggedIn && <VoteBox
            handleVote={props.handleVote}
            votes={answer.votes}
            id={answer._id}
          />}
          {!props.isLoggedIn && answer.votes }
        </div>
        <div>
          <UserBar
            name={answer.author.username}
            avatar="https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
          />
          <p>{answer.body}</p>
        </div>
      </div>
    </section>
  ));

  return (
    <div>
      {answers}
    </div>
  );
};

AnswerList.defaultProps = {
  isLoggedIn: false,
};

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleVote: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.profile._id,
});

const AnswerListConnect = connect(mapStateToProps)(AnswerList);

export default AnswerListConnect;
