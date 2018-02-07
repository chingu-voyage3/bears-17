import { combineReducers } from 'redux';

import questionReducer from './questionReducer.js';
import userReducer from './userReducer.js';

export default combineReducers({
  questionReducer, userReducer,
});
