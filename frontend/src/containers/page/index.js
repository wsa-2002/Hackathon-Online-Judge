import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';

import StudentHome from './StudentHome';
import StudentDetail from './StudentDetail';
import TAHome from './TAHome';
import TADetail from './TADetail';
import { browseProblem } from '../../actions/problem/problem';

export default function Pages() {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    if (!token) {
      history.push('/login');
    } else {
      dispatch(browseProblem(token));
    }
  }, [dispatch, history, token]);

  return (
    <Switch>
      <Route exact path="/student" component={StudentHome} />
      <Route path="/student/problem/:problemId" component={StudentDetail} />
      <Route exact path="/ta" component={TAHome} />
      <Route path="/ta/problem/:problemId" component={TADetail} />
    </Switch>
  );
}
