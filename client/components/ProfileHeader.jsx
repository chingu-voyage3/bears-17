/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';

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

export default ProfileHeader;
