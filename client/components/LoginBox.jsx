import React from 'react';
import PropTypes from 'prop-types';

const boxStyle = {
  border: '1px solid #81ecec',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1rem',
  marginTop: '2rem',
};

const buttonStyle = {
  width: '75%',
  margin: '0.25rem 0rem',
};

const LoginBox = props => (
  <div style={boxStyle}>
    {
      props.buttons.map(btn => (
        <button
          onClick={props.handleClick}
          style={buttonStyle}
          className={btn.styles}
          data-button-type={btn.label}
          key={btn.label}
        >
          {`Sign in with ${btn.label}`}
        </button>
        ))
    }
  </div>
);

export default LoginBox;


LoginBox.propTypes = {
  handleClick: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    styles: PropTypes.string.isRequired,
  })).isRequired,
};
