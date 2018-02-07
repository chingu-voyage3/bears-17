import update from 'immutability-helper';

function questionReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':

      return update(state, {
        questions: { $push: [action.question] },
      });


    default:
      return state;
  }
}

export default questionReducer;
