import { submissionConstants } from '../../actions/submission/constant';
import { problemConstants } from '../../actions/problem/constant';

const initialState = {
  addSubmission: false,
  browseJudgeCase: false,
  fetchSubmission: false,
  fetchLastSubmission: false,
};

export default function submission(state = initialState, action) {
  switch (action.type) {
    case submissionConstants.ADD_SUBMISSION_START:
      return {
        ...state,
        addSubmission: true,
      };
    case submissionConstants.ADD_SUBMISSION_SUCCESS:
    case submissionConstants.ADD_SUBMISSION_FAIL:
      return {
        ...state,
        addSubmission: false,
      };
    case submissionConstants.FETCH_SUBMISSION_START:
      return {
        ...state,
        fetchSubmission: true,
      };
    case submissionConstants.FETCH_SUBMISSION_SUCCESS:
    case submissionConstants.FETCH_SUBMISSION_FAIL:
      return {
        ...state,
        fetchSubmission: false,
      };
    case submissionConstants.BROWSE_JUDGE_CASE_START:
      return {
        ...state,
        browseJudgeCase: true,
      };
    case submissionConstants.BROWSE_JUDGE_CASE_SUCCESS:
    case submissionConstants.BROWSE_JUDGE_CASE_FAIL:
      return {
        ...state,
        browseJudgeCase: false,
      };
    case problemConstants.FETCH_LAST_SUBMISSION_START:
      return {
        ...state,
        fetchLastSubmission: true,
      };
    case problemConstants.FETCH_LAST_SUBMISSION_SUCCESS:
    case problemConstants.FETCH_LAST_SUBMISSION_FAIL:
      return {
        ...state,
        fetchLastSubmission: false,
      };
    default:
      return state;
  }
}
