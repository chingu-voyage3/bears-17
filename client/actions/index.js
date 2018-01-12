const ADD_QUESTION = 'ADD_QUESTION';

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  },
};

export {addQuestion};
