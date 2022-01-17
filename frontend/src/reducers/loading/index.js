import { combineReducers } from 'redux';
import auth from './auth';
import problem from './problem';
import submission from './submission';

export default combineReducers({
  auth,
  problem,
  submission,
});
