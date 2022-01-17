import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, Typography, TextField, makeStyles, InputAdornment, IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { logIn } from '../../actions/user/auth';
import theme from '../../theme';

const AUTH_TOKEN = 'auth-token';
const ACCOUNT_ID = 'account-id';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15%',
  },
  buttonGroup: {
    marginTop: 40,
    width: 260,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const loginLoading = useSelector((state) => state.loading.auth);
  const loginError = useSelector((state) => state.error.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (!loginLoading.readAccount && loginError.readAccount !== null) {
      setErrors({ username: true, password: true });
      setErrorTexts((err) => ({ ...err, password: 'Incorrect username or password' }));
    }
  }, [loginLoading.readAccount, loginError.readAccount]);

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem(AUTH_TOKEN, user.token);
      localStorage.setItem(ACCOUNT_ID, user.id);
      history.push('/');
    }
  }, [user.is_authenticated, user.token, user.id, user.role, history, user]);

  const handleLogIn = (e) => {
    e.preventDefault();

    if (username === '') {
      setErrors((err) => ({ ...err, username: true }));
      setErrorTexts((err) => ({ ...err, username: 'Can\'t be empty' }));
    }
    if (password === '') {
      setErrors((err) => ({ ...err, password: true }));
      setErrorTexts((err) => ({ ...err, password: 'Can\'t be empty' }));
    }
    if (username !== '' && password !== '') {
      dispatch(logIn(username, password));
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const usernameChange = (e) => {
    setErrors((err) => ({ ...err, username: false }));
    setErrorTexts((err) => ({ ...err, username: '' }));
    setUsername(e.target.value.trim());
  };
  const passwordChange = (e) => {
    setErrors((err) => ({ ...err, password: false }));
    setErrorTexts((err) => ({ ...err, password: '' }));
    setPassword(e.target.value.trim());
  };

  return (
    <>
      <form className={classes.main} onSubmit={(e) => handleLogIn(e)}>
        <TextField
          label="Username"
          value={username}
          error={errors.username}
          helperText={errorTexts.username}
          onChange={(e) => usernameChange(e)}
        />
        <TextField
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          style={{ marginTop: 50 }}
          error={errors.password}
          helperText={errorTexts.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleShowPassword} edge="end" style={{ color: theme.palette.grey[300] }}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => passwordChange(e)}
        />
        <div className={classes.buttonGroup}>
          <Button color="primary" variant="outlined" onClick={() => { history.push('/register'); }}>
            Register
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
        </div>
      </form>
      {/* <Typography color="primary" style={{ marginTop: 20 }} variant="body1">
          Cypress Online Judge System
        </Typography> */}
      <Typography align="center" variant="body1" style={{ marginTop: '9%', color: theme.palette.grey[300] }}>
        Dept. of Information Management, NTU 2022
      </Typography>
      {/* <Typography color="primary" variant="body1">
          National Taiwan University
        </Typography> */}
    </>
  );
}
