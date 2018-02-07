/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TiCogOutline } from 'react-icons/lib/ti';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
};

const divStyle = {
  width: '75%',
  display: 'flex',
  flexDirection: 'row',
};

const cardLeft = {
  width: '70%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginRight: '1rem',
};

const cardRight = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const imgStyle = {
  minWidth: '60%',
  width: '65%',
};

const pointsWrapper = {
  display: 'flex',
  width: '100%',
  borderRadius: '2px',
};

const point = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const pointContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  borderLeft: '1px solid black',
};

const iconStyle = {
  position: 'relative',
  left: '-10px',
  top: '5px',
  width: '3em',
  border: '1px solid black',
  borderRadius: '5px',
};

const ProfileHeader = props => (
  <div style={wrapperStyle}>
    <div style={divStyle}>
      <div className="card-left" style={cardLeft}>
        <img alt="circular profile" src={props.imageurl} style={imgStyle} />
      </div>
      <div className="card-right" style={cardRight}>
        <h3 style={{ fontWeight: 'strong' }}>{props.name}</h3>
        <p>{props.intro}</p>
      </div>
      <TiCogOutline size={24} style={iconStyle} onClick={() => props.toggleModal()} />
    </div>
    <div style={pointContainer}>
      <h5>Points</h5>
      <div style={pointsWrapper}>
        <div style={point}>
          <h2>Q</h2>
          <p>42</p>
        </div>
        <div style={point}>
          <h2>A</h2>
          <p>13</p>
        </div>
      </div>
    </div>
  </div>
);

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
  console.log(props.answers, 'this is answers');
  console.log(props.questions, 'this is questions');
  const answers = props.answers.map(e => (
    <li>
      <div style={questionPanel}>
        <Link to={`/question/${e.question_id}`}>
          {
            `${e.body.slice(0, 72)}...`
          }
        </Link>
      </div>
    </li>
  ));

  const questions = props.questions.map((e) => {
    console.log('moo');
    return (
      <li>
        <div style={questionPanel}>
          <Link to={`/question/${e._id}`}>{e.title}</Link>
        </div>
      </li>
    );
  });
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

/*
ProfileBox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

*/
ProfileHeader.defaultProps = {
  name: 'HeyJP',
  intro: 'its my intro',
  imageurl:
    'https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/skype2512x512.png',
};


ProfileHeader.propTypes = {
  name: PropTypes.string,
  intro: PropTypes.string,
  imageurl: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};

ProfileBody.defaultProps = {
  questions: [],
  answers: [],
  toggle: false,
};

ProfileBody.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  answers: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.string,
};

export { ProfileHeader, ProfileBody };
