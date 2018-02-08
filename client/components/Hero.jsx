import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="hero">
    <div className="wrapper wrapper--flex wrapper--flex-wrap">
      <div className="hero__description">
        <h1 className="hero__title">Sharpen Your Interviewing Skills</h1>
        <h2 className="hero__subtitle">... And Get the Job You Want</h2>
      </div>
      <div className="hero__cta">
        <Link to="/register"className="btn btn--lg btn--success">
          Register and Start Asking Questions
        </Link>
        <p>... or just...</p>
        <Link to="/questions" className="btn btn--sm btn--hollow">
          Browse the Latest Questions
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
