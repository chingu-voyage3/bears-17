import update from 'immutability-helper';

const defaultProfile = {
  profile: {
    _id: '',
    name: '',
    username: '',
    email: '',
    avatar: '',
    country: '',
    member_since: '',
    introduction: '',
  },
};


function userReducer(state = defaultProfile, action) {
  switch (action.type) {
    case 'SET_USER':
      return update(state, {
        profile: { $set: action.profile },
      });

    case 'CLEAR_USER':
      return update(state, {
        profile: { $set: defaultProfile },
      });

    default:
      return state;
  }
}

export default userReducer;
