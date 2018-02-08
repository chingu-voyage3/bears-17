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
  width: '100%',
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
  minWidth: '40%',
  width: '45%',
};

const iconStyle = {
  position: 'relative',
  left: '0px',
  top: '5px',
  width: '3em',
  border: '1px solid black',
  borderRadius: '5px',
};

const ProfileHeader = (props) => {
  return (
    <div style={wrapperStyle}>
      <div style={divStyle}>
        <div className="card-left" style={cardLeft}>
          <img alt="circular profile" src={props.imageurl} style={imgStyle} />
        </div>
        <div className="card-right" style={cardRight}>
          <h3 style={{ fontWeight: 'strong' }}>{props.profile.username}</h3>
          <p>{props.profile.introduction}</p>
        </div>
        <TiCogOutline size={24} style={iconStyle} onClick={() => props.toggleModal()} />
      </div>
    </div>
  );
};

ProfileHeader.defaultProps = {
  imageurl:
      'https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/skype2512x512.png',
  profile: {
    _id: '',
    username: '',
    name: '',
    email: '',
    avatar: '',
    country: '',
    member_since: '',
    introduction: '',
  },
};

ProfileHeader.propTypes = {
  imageurl: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    country: PropTypes.string,
    member_since: PropTypes.string,
    introduction: PropTypes.string,
  }),
};

export default ProfileHeader;
