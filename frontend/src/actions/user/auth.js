import agent from '../agent';
import { authConstants } from './constant';

const logIn = (username, password) => async (dispatch) => {
  try {
    const res = await agent.post('/login', { username, password });
    const { account_id, token } = res.data.data;
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    const res2 = await agent.get(`/account/${account_id}`, config);
    dispatch({
      type: authConstants.AUTH_SUCCESS,
      user: {
        token,
        ...res2.data.data,
      },
    });
  } catch (error) {
    dispatch({
      type: authConstants.AUTH_FAIL,
      error,
    });
  }
};

const signUp = (student_id, real_name, username, password) => async (dispatch) => {
  const body = {
    username, password, real_name, student_id,
  };
  try {
    dispatch({ type: authConstants.SIGNUP_START });
    await agent.post('/account', body);
    dispatch({ type: authConstants.SIGNUP_SUCCESS });
  } catch (error) {
    dispatch({
      type: authConstants.SIGNUP_FAIL,
      error,
    });
  }
};

const readAccount = (token, account_id) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/account/${account_id}`, config);
    dispatch({
      type: authConstants.AUTH_SUCCESS,
      user: {
        token,
        ...res.data.data,
      },
    });
  } catch (error) {
    dispatch({
      type: authConstants.AUTH_FAIL,
      error,
    });
  }
};

const logout = (history) => async (dispatch) => {
  dispatch({ type: authConstants.AUTH_LOGOUT });
  history.push('/login');
};

export {
  logIn,
  signUp,
  readAccount,
  logout,
};
