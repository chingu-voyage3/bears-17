import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = props => (
  <div>
    <input
      name="name"
      type="text"
      value={props.name}
      placeholder="name"
      onChange={e => props.handleChange(e, 'name')}
    />
    <input
      name="password"
      type="password"
      value={props.password}
      placeholder="password"
      onChange={e => props.handleChange(e, 'password')}
    />
    <button
      onClick={() => {
        props.handleSubmit();
      }}
      onKeyDown={props.handleSubmit}
    >
      Submit
    </button>
  </div>
);

export default LoginForm;

LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
