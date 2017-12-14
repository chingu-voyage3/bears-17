import React from 'react';
import PropTypes from 'prop-types';

const SIZES = ['small', 'medium', 'large'];

const Avatar = (props) => {
  let classNames = props.size === 'medium' ? 'avatar' : `avatar avatar--${props.size}`;
  if (props.round) {
    classNames += ' avatar--round';
  }
  return (<img alt="" src={props.img} className={classNames} />);
};

Avatar.propTypes = {
  img: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  round: PropTypes.bool,
};

Avatar.defaultProps = {
  img: 'https://dummyimage.com/256/256/fff.png&text=Avatar+Component',
  size: 'medium',
  round: false,
};

export default Avatar;
