import agent from '../agent';
import { problemConstants } from './constant';

const readProblem = (token, problem_id) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: problemConstants.FETCH_PROBLEM_START });
    const res = await agent.get(`/problem/${problem_id}`, config);
    dispatch({ type: problemConstants.FETCH_PROBLEM_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: problemConstants.FETCH_PROBLEM_FAIL,
      error,
    });
  }
};

const addProblem = (token, title, start_time, end_time, file, history, onError) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
    params: {
      title,
      start_time,
      end_time,
    },
  };
  const formData = new FormData();
  formData.append('problem_file', file[0]);
  try {
    dispatch({ type: problemConstants.ADD_PROBLEM_START });
    const res = await agent.post('/problem', formData, config);
    const { id } = res.data.data;
    dispatch({ type: problemConstants.ADD_PROBLEM_SUCCESS });
    history.push(`/ta/problem/${id}`);
  } catch (error) {
    onError(error);
    dispatch({
      type: problemConstants.ADD_PROBLEM_FAIL,
      error,
    });
  }
};

const editProblem = (token, problem_id, title, start_time, end_time, file, onSuccess, onError) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
    params: {
      title,
      start_time,
      end_time,
    },
  };
  const formData = new FormData();
  if (file) {
    formData.append('problem_file', file[0]);
  } else {
    formData.append('problem_file', []);
  }
  try {
    dispatch({ type: problemConstants.EDIT_PROBLEM_START });
    await agent.patch(`/problem/${problem_id}`, formData, config);
    dispatch({ type: problemConstants.EDIT_PROBLEM_SUCCESS });
    onSuccess();
  } catch (error) {
    onError(error);
    dispatch({ type: problemConstants.EDIT_PROBLEM_FAIL });
  }
};

const readProblemLastSubmission = (token, problem_id) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: problemConstants.FETCH_LAST_SUBMISSION_START });
    const res = await agent.get(`/problem/${problem_id}/last-submission`, config);
    const { id } = res.data.data;
    const res2 = await agent.get(`/submission/${id}/judge-case`, config);
    dispatch({
      type: problemConstants.FETCH_LAST_SUBMISSION_SUCCESS,
      payload: { data: res.data.data, judgecase: res2.data.data },
    });
  } catch (error) {
    dispatch({ type: problemConstants.FETCH_LAST_SUBMISSION_FAIL, error });
  }
};

const deleteProblem = (token, problem_id) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: problemConstants.DELETE_PROBLEM_START });
    await agent.delete(`/problem/${problem_id}`, config);
    await agent.get('/problem', config);
    dispatch({
      type: problemConstants.DELETE_PROBLEM_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: problemConstants.DELETE_PROBLEM_FAIL, error });
  }
};

const browseProblem = (token) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: problemConstants.BROWSE_PROBLEM_START });
    const res = await agent.get('/problem', config);
    dispatch({ type: problemConstants.BROWSE_PROBLEM_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: problemConstants.BROWSE_PROBLEM_FAIL, error });
  }
};

const downloadStudentScore = (token, problem_id, onError) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: problemConstants.DOWNLOAD_STUDENT_SCORE_START });
    const res = await agent.get(`/problem/${problem_id}/student-score`, config);
    fetch(res.data.data.url).then((t) => t.blob().then((b) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.setAttribute('download', 'score.csv');
      a.click();
    }));
    dispatch({ type: problemConstants.DOWNLOAD_STUDENT_SCORE_SUCCESS });
  } catch (error) {
    onError(error);
    dispatch({ type: problemConstants.DOWNLOAD_STUDENT_SCORE_FAIL, error });
  }
};

export {
  readProblem, addProblem, editProblem, readProblemLastSubmission, deleteProblem, downloadStudentScore, browseProblem,
};
