import React from 'react';

const PointsBox = () => (
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
);

export default PointsBox;

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
