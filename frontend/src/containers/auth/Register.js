import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, TextField, makeStyles, InputAdornment, IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import '../../App.css';
import { signUp } from '../../actions/user/auth';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 120,
  },
  registerInputField: {
    marginBottom: 40,
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    studentId: '',
    realName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errorTexts, setErrorTexts] = useState({
    studentId: '',
    realName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    studentId: false,
    realName: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const labelName = ['studentId', 'realName', 'username', 'password', 'confirmPassword'];

  const [showPassword, setShowPassword] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const registerError = useSelector((state) => state.error.auth);
  const registerLoading = useSelector((state) => state.loading.auth);

  useEffect(() => {
    if (!registerLoading.signup && hasRequest) {
      if (registerError.signup !== null) {
        if (registerError.signup === 'UsernameExists') {
          setErrors((ori) => ({ ...ori, username: true }));
          setErrorTexts((ori) => ({ ...ori, username: 'Username exists' }));
        } else if (registerError.signup === 'DuplicateStudentId') {
          setErrors((ori) => ({ ...ori, studentId: true }));
          setErrorTexts((ori) => ({ ...ori, studentId: 'Duplicate student ID' }));
        }
      } else {
        history.push('/');
      }
    }
  }, [registerLoading.signup, registerError.signup, registerLoading, hasRequest, history]);

  const handleRegister = async () => {
    const newInputs = labelName.reduce((acc, item) => ({ ...acc, [item]: inputs[item].trim() }), {});
    let hasError = labelName.reduce((acc, item) => acc || newInputs[item] === '', false);

    setErrors(
      labelName.reduce((acc, item) => {
        if (item !== 'password' && item !== 'confirmPassword') {
          return { ...acc, [item]: newInputs[item].trim() === '' };
        }
        return { ...acc, [item]: newInputs[item] === '' };
      }, {}),
    );
    setErrorTexts(
      labelName.reduce((acc, item) => {
        if (item !== 'password' && item !== 'confirmPassword') {
          return { ...acc, [item]: newInputs[item].trim() === '' ? "Can't be empty" : '' };
        }
        return { ...acc, [item]: newInputs[item] === '' ? "Can't be empty" : '' };
      }, {}),
    );

    if (inputs.password !== inputs.confirmPassword) {
      setErrors((input) => ({ ...input, confirmPassword: true }));
      setErrorTexts((input) => ({ ...input, confirmPassword: "Passwords don't match" }));
      hasError = true;
    }

    if (!hasError) {
      dispatch(signUp(inputs.studentId, inputs.realName, inputs.username, inputs.password));
      setHasRequest(true);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));

    if (value !== '' && errorTexts[name] === "Can't be empty") {
      setErrors((input) => ({ ...input, [name]: false }));
      setErrorTexts((input) => ({ ...input, [name]: '' }));
    }
  };

  return (
    <>
      <div className={classes.main}>
        <TextField
          className={classes.registerInputField}
          name="studentId"
          label="Student ID"
          value={inputs.studentId}
          error={errors.studentId}
          helperText={errorTexts.studentId}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          className={classes.registerInputField}
          name="realName"
          label="Real Name"
          value={inputs.realName}
          error={errors.realName}
          helperText={errorTexts.realName}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          className={classes.registerInputField}
          name="username"
          label="Username"
          value={inputs.username}
          error={errors.username}
          helperText={errorTexts.username}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          className={classes.registerInputField}
          label="Password"
          name="password"
          value={inputs.password}
          error={errors.password}
          helperText={errorTexts.password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleShowPassword} edge="end" style={{ color: theme.palette.grey[300] }}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.registerInputField}
          name="confirmPassword"
          label="Confirm Password"
          value={inputs.confirmPassword}
          error={errors.confirmPassword}
          helperText={errorTexts.confirmPassword}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleShowPassword} edge="end" style={{ color: theme.palette.grey[300] }}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button color="primary" variant="contained" onClick={handleRegister}>Register</Button>
      </div>
    </>
  );
}
