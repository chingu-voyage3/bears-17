import React from 'react';
import PropTypes from 'prop-types';

const TYPES = ['button', 'reset', 'submit'];
const SIZES = ['sm', 'md', 'lg', 'full'];
const VARIANTS = [
  'default',
  'primary',
  'success',
  'warning',
  'danger',
];

const Button = (props) => {
  const {
    children,
    className,
    disabled,
    hollow,
    size,
    variant,
    type,
    handleClick,
  } = props;

  const classNames = arr => arr.filter(Boolean).join(' ');
  const classes = [
    'btn',
    hollow ? 'btn--hollow' : null,
    size === 'md' ? null : `btn--${size}`,
    variant === 'default' ? null : `btn--${variant}`,
    className,
  ];
  return (
    <button
      type={type}
      className={classNames(classes)}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: null,
  disabled: false,
  hollow: false,
  size: SIZES[1],
  type: TYPES[0],
  variant: VARIANTS[0],
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hollow: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  type: PropTypes.oneOf(TYPES),
  variant: PropTypes.oneOf(VARIANTS),
  handleClick: PropTypes.func.isRequired,
};

export default Button;
