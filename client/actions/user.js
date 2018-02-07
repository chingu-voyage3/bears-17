const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

function setUser(profile) {
  return {
    type: SET_USER,
    profile,
  };
}

function clearUser() {
  return {
    type: CLEAR_USER,
  };
}

export { setUser, clearUser };
