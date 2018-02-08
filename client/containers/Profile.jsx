/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';

import ProfileBody from '../components/ProfileBody.jsx';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ProfileModal from '../components/EditProfile.jsx';

import { clearUser } from '../actions/user.js';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      questions: [],
      answers: [],
      editProfile: false,
      profile: {
        name: '',
        email: '',
        avatar: '',
        country: '',
        introduction: '',
      },
    };

    this.clearProfile = this.clearProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }

  componentDidMount() {
    Promise.all([
      axios.get(`/api/answers/user/${this.props.profile._id}`),
      axios.get(`/api/questions/user/${this.props.profile._id}`),
    ]).then((res) => {
      const [answers, questions] = res;
      return this.setUserData(questions.data, answers.data);
    });
  }

  setUserData(questions, answers) {
    this.setState({
      questions,
      answers,
    });
  }

  clearProfile() {
    const defaultProfile = {
      name: '',
      email: '',
      avatar: '',
      country: '',
      introduction: '',
    };

    this.setState({
      profile: defaultProfile,
    });
  }

  handleChange(event, input) {
    this.setState({
      profile: {
        ...this.state.profile,
        [input]: event.target.value,
      },
    });
  }

  handleToggle(value) {
    this.setState({
      toggle: value === this.state.toggle ? '' : value,
    });
  }

  toggleModal() {
    this.setState({
      editProfile: !this.state.editProfile,
    });
  }

  saveProfile() {
    const { profile } = this.state;

    // Remove empty values from profile object
    Object.keys(profile).forEach(key =>
      profile[key] === '' && delete profile[key]);

    axios.post('/api/user/update-profile', profile)
      .then(res => res);

    this.clearProfile();
    this.toggleModal();
  }

  render() {
    if (this.state.editProfile) {
      return (
        <ProfileModal
          toggleModal={this.toggleModal}
          profile={this.props.profile}
          handleChange={this.handleChange}
          saveProfile={this.saveProfile}
        />
      );
    }

    return (
      <div>
        <ProfileHeader toggleModal={this.toggleModal} profile={this.props.profile} />
        <ProfileBody
          handleToggle={this.handleToggle}
          questions={this.state.questions}
          answers={this.state.answers}
          toggle={this.state.toggle}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.userReducer.profile,
});

const mapDispatchToProps = dispatch => ({
  clearUser: () => dispatch(clearUser()),
});

const ProfileConnect = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileConnect;

Profile.defaultProps = {
  profile: {
    name: '',
    email: '',
    avatar: '',
    country: '',
    member_since: '',
    introduction: '',
  },
};

Profile.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    country: PropTypes.string,
    member_since: PropTypes.string,
    introduction: PropTypes.string,
  }),
};
