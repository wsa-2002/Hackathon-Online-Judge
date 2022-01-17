import { authConstants } from '../../actions/user/constant';

const initialState = {
  login: false,
  signup: false,
  readAccount: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_START:
      return {
        ...state,
        readAccount: true,
      };
    case authConstants.AUTH_SUCCESS:
    case authConstants.AUTH_FAIL:
      return {
        ...state,
        readAccount: false,
      };
    case authConstants.SIGNUP_START:
      return {
        ...state,
        signup: true,
      };
    case authConstants.SIGNUP_SUCCESS:
    case authConstants.SIGNUP_FAIL:
      return {
        ...state,
        signup: false,
      };
    default:
      return state;
  }
}
