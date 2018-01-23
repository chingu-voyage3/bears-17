import React from 'react';
import PropTypes from 'prop-types';


const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
};

const inputStyle = {
  width: '100%',
  margin: '0.25rem 0rem',
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

const LoginForm = props => (
  <div style={formCard}>
    <div style={formStyle}>
      <h3>Login</h3>
      <input
        style={inputStyle}
        name="name"
        type="text"
        value={props.name}
        placeholder="name"
        onChange={e => props.handleChange(e, 'name')}
      />
      <input
        style={inputStyle}
        name="password"
        type="password"
        value={props.password}
        placeholder="password"
        onChange={e => props.handleChange(e, 'password')}
      />
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
};
