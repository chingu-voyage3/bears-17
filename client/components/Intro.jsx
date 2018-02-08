import React from 'react';

const Intro = () => (
  <section className="intro">
    <div className="intro__header">
      <h4>Features</h4>
    </div>
    <div className="intro__grid">
      <div className="intro__element">
        <h2>Solve that Q...</h2>
        <p>
          Find answers on the latest coding questions to help you crack the
          interview.
        </p>
      </div>
      <div className="intro__element">
        <h2>Ask Away...</h2>
        <p>Ask questions and get notified when someone answers.</p>
      </div>
      <div className="intro__element">
        <h2>Your vote matters!</h2>
        <p>
          Vote on questions and answers you find helpful. Let others know they
          are doign a good job!
        </p>
      </div>
    </div>
  </section>
);

export default Intro;
