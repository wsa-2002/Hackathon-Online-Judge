import { combineReducers } from 'redux';
import { problemConstants } from '../actions/problem/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.FETCH_PROBLEM_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
        },
      };
    case problemConstants.BROWSE_PROBLEM_SUCCESS:
      return action.payload.data.problems.reduce((acc, item) => (
        { ...acc, [item.id]: { ...item } }), state);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.FETCH_PROBLEM_SUCCESS:
      return [...new Set([action.payload.data.id, ...state])];
    case problemConstants.BROWSE_PROBLEM_SUCCESS:
      return action.payload.data.problems.map((item) => item.id);
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
