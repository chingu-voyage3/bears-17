import React from 'react';

const Hero = () => (
  <section className="hero">
    <div className="wrapper wrapper--flex wrapper--flex-wrap">
      <div className="hero__description">
        <h1 className="hero__title">Sharpen Your Interviewing Skills</h1>
        <h2 className="hero__subtitle">... And Get the Job You Want</h2>
      </div>
      <div className="hero__cta">
        <button className="btn btn--lg btn--success">Click Here to Ask a Question</button>
        <p>... or just...</p>
        <button className="btn btn--sm btn--hollow">Browse the Most Popular Answers</button>
      </div>
    </div>
  </section>
);

export default Hero;
