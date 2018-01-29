import React from 'react';
import PropTypes from 'prop-types';

import { MdPerson, MdLock } from 'react-icons/lib/md';

const iconStyle = {
  position: 'relative',
  left: '5px',
  bottom: '40px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const inputStyle = {
  width: '100%',
  margin: '0.15rem 0rem',
  border: '1px solid black',
  paddingLeft: '30px',
  paddingTop: '10px',
  paddingBottom: '10px',
};

const formCard = {
  backgroundColor: '#fff',
  width: '50%',
  height: '50%',
  padding: '1rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '5rem',
  marginBottom: '5rem',
};

const wrapper = {
  width: '100%',
  padding: '0px',
  margin: '0px',
  height: '100%',
};

const LoginForm = props => (
  <div style={formCard}>
    <div style={formStyle}>
      <h3>{props.location}</h3>
      <div style={wrapper}>
        <input
          style={inputStyle}
          name="name"
          type="text"
          value={props.name}
          placeholder="name"
          onChange={e => props.handleChange(e, 'name')}
        />
        <MdPerson style={iconStyle} />
      </div>
      <div style={wrapper}>
        <input
          style={inputStyle}
          name="password"
          type="password"
          value={props.password}
          placeholder="password"
          onChange={e => props.handleChange(e, 'password')}
        />
        <MdLock style={iconStyle} />
      </div>
      <button
        style={inputStyle}
        className="btn btn--primary"
        onClick={() => {
          props.handleSubmit();
        }}
        onKeyDown={props.handleSubmit}
      >
        Submit
      </button>
    </div>
  </div>
);

export default LoginForm;

LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};
