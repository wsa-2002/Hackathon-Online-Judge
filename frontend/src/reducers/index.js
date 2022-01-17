import { combineReducers } from 'redux';
import user from './user';
import problem from './problem';
import submission from './submission';
import loading from './loading';
import error from './error';

export default combineReducers({
  user,
  problem,
  submission,
  loading,
  error,
});
