import { problemConstants } from '../../actions/problem/constant';

const initialState = {
  readProblem: null,
  addProblem: null,
  editProblem: null,
  readProblemLastSubmission: null,
  deleteProblem: null,
  downloadStudentScore: null,
  browseProblem: null,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
    case problemConstants.ADD_PROBLEM_FAIL:
      return {
        ...state,
        addProblem: action.error,
      };
    case problemConstants.ADD_PROBLEM_SUCCESS:
      return {
        ...state,
        addProblem: null,
      };
    case problemConstants.FETCH_PROBLEM_FAIL:
      return {
        ...state,
        readProblem: action.error,
      };
    case problemConstants.FETCH_PROBLEM_SUCCESS:
      return {
        ...state,
        readProblem: null,
      };
    case problemConstants.EDIT_PROBLEM_FAIL:
      return {
        ...state,
        editProblem: action.error,
      };
    case problemConstants.EDIT_PROBLEM_SUCCESS:
      return {
        ...state,
        editProblem: null,
      };
    case problemConstants.FETCH_LAST_SUBMISSION_FAIL:
      return {
        ...state,
        readProblemLastSubmission: action.error,
      };
    case problemConstants.FETCH_LAST_SUBMISSION_SUCCESS:
      return {
        ...state,
        readProblemLastSubmission: null,
      };
    case problemConstants.DELETE_PROBLEM_FAIL:
      return {
        ...state,
        deleteProblem: action.error,
      };
    case problemConstants.DELETE_PROBLEM_SUCCESS:
      return {
        ...state,
        deleteProblem: null,
      };
    case problemConstants.DOWNLOAD_STUDENT_SCORE_FAIL:
      return {
        ...state,
        downloadStudentScore: action.error,
      };
    case problemConstants.DOWNLOAD_STUDENT_SCORE_SUCCESS:
      return {
        ...state,
        downloadStudentScore: null,
      };
    case problemConstants.BROWSE_PROBLEM_FAIL:
      return {
        ...state,
        browseProblem: action.error,
      };
    case problemConstants.BROWSE_PROBLEM_SUCCESS:
      return {
        ...state,
        browseProblem: null,
      };
    default:
      return state;
  }
}
