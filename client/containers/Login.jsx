/* eslint-disable no-console */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import qs from 'qs';

import axios from 'axios';

import LoginForm from '../Components/LoginForm.jsx';
import LoginBox from '../Components/LoginBox.jsx';

const buttonArray = [
  {
    label: 'Twitter',
    styles: 'btn btn--twitter',
  },
  {
    label: 'Facebook',
    styles: 'btn btn--facebook',
  },
  {
    label: 'Google',
    styles: 'btn btn--google',
  },
];

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      buttons: buttonArray,
      navigate: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  clearNavigate() {
    this.setState({
      navigate: '',
    });
  }

  clearState() {
    this.setState({
      name: '',
      password: '',
    });
  }

  handleChange(event, input) {
    this.setState({
      [input]: event.target.value,
    });
  }

  handleClick(e) {
    const label = e.target.getAttribute('data-button-type');
    this.setState({
      navigate: label,
    });
  }

  handleSubmit() {
    const authObject = {
      username: this.state.name,
      password: this.state.password,
    };
    axios.post(`/api/${this.props.auth}`, authObject)
      .then((res) => {
        console.log(res, 'this is res');
      });
    this.clearState();
  }

  render() {
    const { navigate } = this.state;

    if (navigate) {
      return <Redirect to={`/auth/${navigate}`} />;
    }

    return (
      <div>
        <LoginBox
          buttons={this.state.buttons}
          handleClick={this.handleClick}
        />
        <LoginForm
          location={this.props.auth}
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

Login.propTypes = {
  auth: PropTypes.string.isRequired,
};
