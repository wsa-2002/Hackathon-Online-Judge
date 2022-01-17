import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';
import Header from '../components/ui/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import Pages from './page';
import { readAccount } from '../actions/user/auth';
import '../App.css';

const AUTH_TOKEN = 'auth-token';
const ACCOUNT_ID = 'account-id';

export default function Index() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const token = localStorage.getItem(AUTH_TOKEN);
  const account_id = localStorage.getItem(ACCOUNT_ID);

  useEffect(() => {
    if (!user.isAuthenticated) {
      if (token && account_id) {
        if (user.tokenExpired) {
          localStorage.clear();
          history.push('/login');
        } else {
          dispatch(readAccount(token, account_id));
        }
      } else {
        history.push('/login');
      }
    }
  }, [account_id, dispatch, history, token, user.isAuthenticated, user.role, user.tokenExpired]);

  useEffect(() => {
    if (user.isAuthenticated && location.pathname === '/') {
      if (user.role === 'TA') {
        history.push('/ta');
      } else if (user.role === 'STUDENT') {
        history.push('/student');
      }
    }
  });

  return (
    <div className="wrapper">
      <Header title="Hackathon Online Judge System" />
      <div className="content-layout">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Pages} />
        </Switch>
      </div>
    </div>
  );
}
