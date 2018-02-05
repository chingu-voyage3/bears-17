/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import React, { Component } from 'react';
import axios from 'axios';

import { ProfileHeader, ProfileBody } from '../components/Dashboard.jsx';
import ProfileModal from '../components/EditProfile.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      questions: [],
      answers: [],
      user: '5a2ff186fc13ae7095000645',
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
    console.log(
      `/api/answers/user/${this.state.user}`,
      'this is api/answers/user'
    );
    Promise.all([
      axios.get(`/api/answers/user/${this.state.user}`),
      axios.get('/api/questions'),
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

  handleToggle() {
    this.setState({
      toggle: !this.state.toggle,
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
      .then((res) => {
        console.log(res, 'this is res');
        return res;
      });

    this.clearProfile();
    this.toggleModal();
  }

  render() {
    if (this.state.editProfile) {
      return (
        <ProfileModal
          toggleModal={this.toggleModal}
          profile={this.state.profile}
          handleChange={this.handleChange}
          saveProfile={this.saveProfile}
        />
      );
    }

    return (
      <div>
        <ProfileHeader toggleModal={this.toggleModal} />
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

export default Profile;
