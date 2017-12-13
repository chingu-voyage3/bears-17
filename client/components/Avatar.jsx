import React from 'react';
import PropTypes from 'prop-types';

const SIZES = ['small', 'medium', 'large'];

const Avatar = (props) => {
  const classNames = props.size === 'medium' ? 'avatar' : `avatar avatar--${props.size}`;
  return (<img alt="" src={props.img} className={classNames} />

  );
};


Avatar.propTypes = {
  img: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
};

Avatar.defaultProps = {
  img: 'https://dummyimage.com/256/256/fff.png&text=Avatar+Component',
  size: 'medium',
};
export default Avatar;
