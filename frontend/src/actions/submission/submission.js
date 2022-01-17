import agent from '../agent';
import { submissionConstants } from './constant';

const submitCode = (token, problem_id, upload_file, onError) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('content_file', upload_file[0]);
  try {
    dispatch({ type: submissionConstants.ADD_SUBMISSION_START });
    const res = await agent.post(`/problem/${problem_id}/submission`, formData, config);
    dispatch({ type: submissionConstants.ADD_SUBMISSION_SUCCESS, payload: res.data });
  } catch (error) {
    onError(error);
    dispatch({ type: submissionConstants.ADD_SUBMISSION_FAIL, error });
  }
};

const readSubmission = (token, submission_id) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: submissionConstants.FETCH_SUBMISSION_START });
    const res = await agent.get(`/submission/${submission_id}`, config);
    dispatch({
      type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.FETCH_SUBMISSION_FAIL,
      error,
    });
  }
};

const browseJudgeCase = (token, submission_id) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: submissionConstants.BROWSE_JUDGE_CASE_START });
    const res = await agent.get(`/submission/${submission_id}/judge-case`, config);
    dispatch({
      type: submissionConstants.BROWSE_JUDGE_CASE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.ADD_SUBMISSION_FAIL,
      error,
    });
  }
};
export {
  submitCode,
  browseJudgeCase,
  readSubmission,
};
