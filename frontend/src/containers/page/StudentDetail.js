import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, makeStyles, Typography, Snackbar,
} from '@material-ui/core';
import moment from 'moment';
import LinearProgressBar from '../../components/ui/LinearProgressBar';
import ScoreTable from '../../components/ui/ScoreTable';
import UploadButton from '../../components/ui/UploadButton';
import Sidebar from '../../components/Sidebar';
import { readProblemLastSubmission } from '../../actions/problem/problem';
import { submitCode } from '../../actions/submission/submission';
import Loading from '../../components/ui/Loading';
import NotFound from '../../components/ui/NotFound';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 30,
  },
  leftSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '15%',
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

export default function Student() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { problemId } = useParams();

  const token = localStorage.getItem('auth-token');

  const problems = useSelector((state) => state.problem.byId);
  const problemIds = useSelector((state) => state.problem.byId);
  const submissions = useSelector((state) => state.submission);
  const submitLoading = useSelector((state) => state.loading.submission);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submitFile, setSubmitFile] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [openSubmitCard, setOpenSubmitCard] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [hasRequest, setHasRequest] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (problemId !== undefined) {
      dispatch(readProblemLastSubmission(token, problemId));
      setProgress(((submissions.total_pass / (submissions.total_pass + submissions.total_fail)) * 100));
    }
  }, [dispatch, problemId, submissions.total_fail, submissions.total_pass, token]);

  useEffect(() => {
    if (problems[problemId] !== undefined) {
      setTitle(problems[problemId].title);
      setStartTime(moment(problems[problemId].start_time).format('YYYY-MM-DD HH:mm'));
      setEndTime(moment(problems[problemId].end_time).format('YYYY-MM-DD HH:mm'));
    }
  }, [problemId, problems]);

  useEffect(() => {
    if (!submitLoading.browseJudgeCase) {
      setTableData(submissions.judgecases.map((item) => ({
        task: item.title.split(':')[0],
        description: item.description,
        errorMsg: item.error_message,
        status: item.state,
      })));
    }
  }, [submissions.judgecases, submitLoading.browseJudgeCase]);

  const handleError = (text) => {
    setShowSnackbar(true);
    setSnackbarText(text);
    setHasRequest(true);
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
          {submissions.submission_id === '' && <Typography variant="h4" className={classes.noSubmissionText}>No submission yet.</Typography>}
          {submissions.submission_id !== '' && (
            submissions.judgecases.length === 0
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
        {problems[problemId] !== undefined && (
        <div className={classes.rightSidebar}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h4">{title}</Typography>
            <Typography style={{ marginTop: 15 }} variant="h6">Start Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{startTime}</Typography>
            <Typography style={{ marginTop: 5 }} variant="h6">End Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{endTime}</Typography>
          </div>
          {/* submit only between  start time and end time */}
          {moment(moment().toDate()).isBetween(problems[problemId].start_time, problems[problemId].end_time) && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30,
          }}
          >
            <Button color="primary" variant="contained" onClick={() => setOpenSubmitCard(true)}>Submit</Button>
          </div>
          )}
        </div>
        )}
      </div>

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
        key={snackbarText}
        open={hasRequest && showSnackbar}
        onClose={() => { setShowSnackbar(false); setSnackbarText(''); setHasRequest(false); }}
        message={snackbarText}
      />
    </>
  );
}
