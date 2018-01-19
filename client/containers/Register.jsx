/* eslint-disable no-console */

import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from '../Components/LoginForm.jsx';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
    };
  }

  clearState() {
    this.setState({
      name: '',
      password: '',
    });
  }

  handleChange(input, event) {
    this.setState({
      [input]: event.target.value,
    });
  }

  handleSubmit() {
    axios.post('/api/register', this.state).then((res) => {
      console.log(res, 'this is res');
      return res;
    });
    this.clearState();
  }

  render() {
    return (
      <div>
        <LoginForm
          handleChange={this.handleChange}
          name={this.state.name}
          password={this.state.password}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Register;
