/* eslint-disable no-console */

import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from '../Components/LoginForm.jsx';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearState() {
    this.setState({
      name: '',
      password: '',
    });
  }

  handleChange(event, input) {
    console.log(this.state, 'state');
    console.log(input, event.target.value, 'input and event value');
    this.setState({
      [input]: event.target.value,
    });
  }

  handleSubmit() {
    axios.post('/api/login', this.state)
      .then((res) => {
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

export default Login;
