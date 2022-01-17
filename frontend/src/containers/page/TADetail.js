import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, IconButton, makeStyles, TextField, Typography, Snackbar,
} from '@material-ui/core';
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';
import Settings from '@material-ui/icons/Settings';
import moment from 'moment';
import DateTimePicker from '../../components/ui/DateTimePicker';
import LinearProgressBar from '../../components/ui/LinearProgressBar';
import ScoreTable from '../../components/ui/ScoreTable';
import UploadButton from '../../components/ui/UploadButton';
import theme from '../../theme';
import {
  editProblem, downloadStudentScore, readProblemLastSubmission, deleteProblem,
} from '../../actions/problem/problem';
import { submitCode } from '../../actions/submission/submission';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/ui/Loading';
import NotFound from '../../components/ui/NotFound';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 30,
  },
  scoreTableGroup: {
    width: '70%',
    marginTop: 52,
  },
  progressBarGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  rightSidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    marginTop: 52,
    paddingLeft: '2.5%',
    paddingRight: '2%',
  },
  hackAndIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stuAndIcon: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noSubmissionText: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  submitBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  deleteBtn: {
    borderRadius: 10,
    // color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginLeft: 22,
  },
}));

const columns = [
  {
    id: 'task',
    label: 'Task',
    align: 'center',
    minWidth: 50,
    width: 150,
  },
  {
    id: 'description',
    label: 'Description',
    align: 'left',
    minWidth: 400,
    width: 800,
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    minWidth: 50,
    width: 100,
  },
];

export default function TADetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { problemId } = useParams();

  const token = localStorage.getItem('auth-token');

  const problems = useSelector((state) => state.problem.byId);
  const problemIds = useSelector((state) => state.problem.allIds);
  const problemLoading = useSelector((state) => state.loading.problem);
  const submission = useSelector((state) => state.submission);
  const submissionLoading = useSelector((state) => state.loading.submission);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [submitFile, setSubmitFile] = useState(null);

  const [openEditCard, setOpenEditCard] = useState(false);
  const [openSubmitCard, setOpenSubmitCard] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [hasRequest, setHasRequest] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (problemId !== undefined) {
      dispatch(readProblemLastSubmission(token, problemId));
      setProgress(((submission.total_pass / (submission.total_pass + submission.total_fail)) * 100));
    }
  }, [dispatch, problemId, submission.total_fail, submission.total_pass, token]);

  useEffect(() => {
    if (problems[problemId] !== undefined) {
      setTitle(problems[problemId].title);
      setStartTime(moment(problems[problemId].start_time).format('YYYY-MM-DD HH:mm'));
      setEndTime(moment(problems[problemId].end_time).format('YYYY-MM-DD HH:mm'));
      setFilename(problems[problemId].filename);
      setNewTitle(problems[problemId].title);
      setNewStartTime(problems[problemId].start_time);
      setNewEndTime(problems[problemId].end_time);
    }
  }, [problemId, problems]);

  useEffect(() => {
    if (!submissionLoading.browseJudgeCase) {
      setTableData(submission.judgecases.map((item) => ({
        task: item.title.split(':')[0],
        description: item.description,
        errorMsg: item.error_message,
        status: item.state,
      })));
    }
  }, [submissionLoading.browseJudgeCase, submission.judgecases]);

  const handleError = (text) => {
    setHasRequest(true);
    setShowSnackbar(true);
    setSnackbarText(text);
  };
  const resetHandleError = () => {
    setHasRequest(false);
    setShowSnackbar(false);
    setSnackbarText('');
  };

  // edit problem
  const handleCloseEditCard = () => {
    setTitle(problems[problemId].title);
    setStartTime(moment(problems[problemId].start_time).format('YYYY-MM-DD HH:mm'));
    setEndTime(moment(problems[problemId].end_time).format('YYYY-MM-DD HH:mm'));
    setNewTitle(problems[problemId].title);
    setNewStartTime(problems[problemId].start_time);
    setNewEndTime(problems[problemId].end_time);
    setUploadFile(null);
    setFilename(problems[problemId].filename);
    setOpenEditCard(false);
    resetHandleError();
  };
  const handleEditProblem = () => {
    setHasRequest(true);
    if (newTitle.trim() === '') {
      setShowSnackbar(true);
      setSnackbarText("Title can't be empty");
    } else if (moment(newStartTime).isAfter(newEndTime) || moment(newStartTime).isSame(newEndTime)) {
      setShowSnackbar(true);
      setSnackbarText('Start time is not before end time');
    } else {
      const start = moment(newStartTime).format('YYYY-MM-DD HH:mm');
      const end = moment(newEndTime).format('YYYY-MM-DD HH:mm');
      dispatch(editProblem(token, problemId, newTitle, start, end, uploadFile, handleCloseEditCard, handleError));
    }
  };
  // delete problem
  const handleDeleteProblem = async () => {
    await dispatch(deleteProblem(token, problemId));
    handleCloseEditCard();
    history.push('/ta');
  };
  // submit code
  const handleCloseSubmitCard = () => {
    setSubmitFile(null);
    setOpenSubmitCard(false);
    setSnackbarText('Please wait for 3-5 minutes for judging...');
    setShowSnackbar(true);
  };
  const handleSubmit = () => {
    setHasRequest(true);
    if (submitFile === null) {
      setShowSnackbar(true);
      setSnackbarText('Please select a file');
    } else {
      dispatch(submitCode(token, problemId, submitFile, handleError));
      handleCloseSubmitCard();
    }
  };
  // // download student score
  // const handleDownloadScore = () => {
  //   dispatch(downloadStudentScore(token, problemId, handleError));
  // };

  if (problems[problemId] === undefined) {
    if (problemIds.find((id) => id === problemId)) {
      return <NotFound />;
    }
    return <Loading />;
  }

  return (
    <>
      <div className={classes.main}>
        <Sidebar />
        <div className={classes.scoreTableGroup}>
          {submission.submission_id === '' && <Typography variant="h4" className={classes.noSubmissionText}>No submission yet.</Typography>}
          {submission.submission_id !== '' && (
            submission.judgecases.length === 0
              ? (<Typography variant="h4" className={classes.noSubmissionText}>Waiting for judge...</Typography>)
              : (
                <>
                  <ScoreTable data={tableData} columns={columns} />
                  <div className={classes.progressBarGroup}>
                    <Typography style={{ marginRight: 10 }} variant="body1">Task Completed</Typography>
                    <LinearProgressBar value={progress} />
                  </div>
                </>
              ))}
        </div>
        {problemIds.length !== 0 && (
        <div className={classes.rightSidebar}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <div className={classes.hackAndIcon}>
              <Typography variant="h4">{title}</Typography>
              <IconButton onClick={() => setOpenEditCard(true)}>
                <Settings htmlColor={theme.palette.grey[300]} />
              </IconButton>
            </div>
            <Typography style={{ marginTop: 15 }} variant="h6">Start Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{startTime}</Typography>
            <Typography style={{ marginTop: 5 }} variant="h6">End Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{endTime}</Typography>

            {/* {moment(moment().toDate()).isAfter(endTime) && (
            <div className={classes.stuAndIcon}>
              <Typography style={{ marginRight: 10 }} variant="body1">Student Score</Typography>
              <IconButton onClick={handleDownloadScore}>
                <CloudDownloadOutlined htmlColor={theme.palette.grey[300]} />
              </IconButton>
            </div>
            )} */}

          </div>
          {/* TA can submit whenever the problem is created */}
          <div className={classes.submitBtn}>
            <Button color="primary" variant="contained" onClick={() => setOpenSubmitCard(true)}>Submit</Button>
          </div>
        </div>
        )}
      </div>

      {/* edit problem */}
      <Dialog
        open={openEditCard}
        onClose={handleCloseEditCard}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ marginTop: 0 }}>
            <Typography variant="h4">Edit Problem</Typography>
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 15 }}>
            <Typography variant="body1">Title</Typography>
            <TextField value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 15 }}>
            <Typography variant="body1">Start Time</Typography>
            <DateTimePicker
              selectedDate={newStartTime}
              setSelectedDate={setNewStartTime}
            />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 15 }}>
            <Typography variant="body1">End Time</Typography>
            <DateTimePicker
              selectedDate={newEndTime}
              setSelectedDate={setNewEndTime}
            />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 76 }} variant="body1">Problem file</Typography>
            <UploadButton filename={filename} setUpLoadFile={setUploadFile} />
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button
            className={classes.deleteBtn}
            onClick={handleDeleteProblem}
          >
            Delete
          </Button>
          <Button color="primary" style={{ borderRadius: 10 }} onClick={handleEditProblem}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* submit */}
      <Dialog
        open={openSubmitCard}
        onClose={handleCloseSubmitCard}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ marginTop: 0 }}>
            <Typography variant="h4">Submit Code</Typography>
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 30 }} variant="body1">Select file (.zip)</Typography>
            <UploadButton setUpLoadFile={setSubmitFile} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" style={{ borderRadius: 10 }} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={hasRequest && showSnackbar}
        onClose={resetHandleError}
        key={snackbarText}
        message={snackbarText}
      />
    </>
  );
}
