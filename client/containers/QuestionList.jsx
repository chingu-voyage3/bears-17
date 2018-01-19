import React, { Component } from 'react';

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'hello WOrld',
    };
  }


  render() {
    return (
      <div>
        {this.state.name}
      </div>
    );
  }
}

export default QuestionList;
