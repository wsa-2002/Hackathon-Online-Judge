import { problemConstants } from '../../actions/problem/constant';

const initialState = {
  readProblem: false,
  addProblem: false,
  editProblem: false,
  readProblemLastSubmission: false,
  deleteProblem: false,
  downloadStudentScore: false,
  browseProblem: false,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
    case problemConstants.FETCH_PROBLEM_START:
      return {
        ...state,
        readProblem: true,
      };
    case problemConstants.FETCH_PROBLEM_SUCCESS:
    case problemConstants.FETCH_PROBLEM_FAIL:
      return {
        ...state,
        readProblem: false,
      };
    case problemConstants.ADD_PROBLEM_START:
      return {
        ...state,
        addProblem: true,
      };
    case problemConstants.ADD_PROBLEM_SUCCESS:
    case problemConstants.ADD_PROBLEM_FAIL:
      return {
        ...state,
        addProblem: false,
      };
    case problemConstants.EDIT_PROBLEM_START:
      return {
        ...state,
        editProblem: true,
      };
    case problemConstants.EDIT_PROBLEM_SUCCESS:
    case problemConstants.EDIT_PROBLEM_FAIL:
      return {
        ...state,
        editProblem: false,
      };
    case problemConstants.FETCH_LAST_SUBMISSION_START:
      return {
        ...state,
        readProblemLastSubmission: true,
      };
    case problemConstants.FETCH_LAST_SUBMISSION_SUCCESS:
    case problemConstants.FETCH_LAST_SUBMISSION_FAIL:
      return {
        ...state,
        readProblemLastSubmission: false,
      };
    case problemConstants.DELETE_PROBLEM_START:
      return {
        ...state,
        deleteProblem: true,
      };
    case problemConstants.DELETE_PROBLEM_SUCCESS:
    case problemConstants.DELETE_PROBLEM_FAIL:
      return {
        ...state,
        deleteProblem: false,
      };
    case problemConstants.DOWNLOAD_STUDENT_SCORE_START:
      return {
        ...state,
        downloadStudentScore: true,
      };
    case problemConstants.DOWNLOAD_STUDENT_SCORE_SUCCESS:
    case problemConstants.DOWNLOAD_STUDENT_SCORE_FAIL:
      return {
        ...state,
        downloadStudentScore: false,
      };
    case problemConstants.BROWSE_PROBLEM_START:
      return {
        ...state,
        browseProblem: true,
      };
    case problemConstants.BROWSE_PROBLEM_SUCCESS:
    case problemConstants.BROWSE_PROBLEM_FAIL:
      return {
        ...state,
        browseProblem: false,
      };
    default:
      return state;
  }
}
