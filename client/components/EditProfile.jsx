import React from 'react';
import PropTypes from 'prop-types';

import { MdCancel } from 'react-icons/lib/md';

const pageWrapper = {
  width: '100%',
  height: '80vh',
  padding: '4rem',
  display: 'flex',
  flexDirection: 'row',
};

const imgStyle = {
  display: 'block',
  maxWidth: '25%',
  marginBottom: '1rem',
};

const iconStyle = {
  marginRight: '2rem',
};

const ProfileModal = props => (
  <div style={pageWrapper}>
    <div className="edit-profile-container">
      <h4>Avatar</h4>
      <img alt="circular profile" src={props.imageurl} style={imgStyle} />
      <button>Upload Picture</button>
    </div>
    <div className="edit-account-container">
      <h4>Edit Account</h4>
      <h6>Personal Details</h6>
      <div className="form-panel-1">
        <div className="input-wrapper">
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              placeholder={props.profile.name}
              onChange={(e) => {
                props.handleChange(e, 'name');
              }}
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder={props.profile.email}
              onChange={(e) => {
                props.handleChange(e, 'email');
              }}
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="country">
            Country
            <input
              type="text"
              name="country"
              id="country"
              placeholder={props.profile.country}
              onChange={(e) => {
                props.handleChange(e, 'country');
              }}
            />
          </label>
        </div>
        <div className="button-wrapper">
          <button className="btn btn--hollow" onClick={() => props.saveProfile()} >Save</button>
        </div>
      </div>
    </div>
    <MdCancel
      onClick={() => {
        props.toggleModal();
      }}
      style={iconStyle}
      size={32}
    />
  </div>
);

export default ProfileModal;

ProfileModal.defaultProps = {
  imageurl:
    'https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/skype2512x512.png',
  profile: {
    name: 'name',
    email: 'John@Doe.com',
    country: '',
  },
};

ProfileModal.propTypes = {
  imageurl: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
};
