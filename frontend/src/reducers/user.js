import { authConstants } from '../actions/user/constant';

const initialState = {
  id: '',
  isAuthenticated: false,
  token: '',
  tokenExpired: false,
  username: '',
  real_name: '',
  student_id: '',
  role: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return {
        id: action.user.id,
        isAuthenticated: true,
        token: action.user.token,
        tokenExpired: false,
        username: action.user.username,
        real_name: action.user.real_name,
        student_id: action.user.student_id,
        role: action.user.role,
      };
    case authConstants.AUTH_LOGOUT:
      return {
        id: '',
        isAuthenticated: false,
        token: '',
        tokenExpired: false,
        username: '',
        real_name: '',
        student_id: '',
        role: '',
      };
    case authConstants.TOKEN_EXPIRED:
      return {
        id: '',
        isAuthenticated: false,
        token: '',
        tokenExpired: true,
        username: '',
        real_name: '',
        student_id: '',
        role: '',
      };
    default:
      return state;
  }
};

export default user;
