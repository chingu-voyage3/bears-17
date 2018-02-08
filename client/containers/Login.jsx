/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

// components
import LoginForm from '../components/LoginForm.jsx';
// import LoginBox from '../Components/LoginBox.jsx';

// actions
import { setUser } from '../actions/user.js';

/*
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

*/

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      // buttons: buttonArray,
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
    const self = this;
    const authObject = {
      username: this.state.name,
      password: this.state.password,
    };
    axios.post(`/api/${this.props.auth}`, authObject)
      .then((res) => {
        self.props.setUser(res.data.user);
        return res;
      });
    this.clearState();
  }

  render() {
    const { navigate } = this.state;

    if (this.props.profile._id) {
      return <Redirect to="/profile" />;
    }

    if (navigate) {
      return <Redirect to={`/auth/${navigate}`} />;
    }

    return (
      <div>
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

const mapStateToProps = state => ({
  profile: state.userReducer.profile,
});

const mapDispatchToProps = dispatch => ({
  setUser: object => dispatch(setUser(object)),
});

const LoginConnect = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginConnect;

Login.defaultProps = {
  profile: {
    _id: '',
    name: '',
    email: '',
    avatar: '',
    country: '',
    member_since: '',
    introduction: '',
  },
};

Login.propTypes = {
  auth: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    country: PropTypes.string,
    member_since: PropTypes.string,
    introduction: PropTypes.string,
  }),
};
