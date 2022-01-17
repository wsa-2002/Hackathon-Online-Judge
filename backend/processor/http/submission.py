from base import do
from dataclasses import dataclass
from typing import Sequence
from uuid import uuid4

from fastapi import APIRouter, Depends, responses, UploadFile, File

from middleware.headers import get_auth_token
from middleware.envelope import enveloped
from middleware.context import request
import persistence.database as db
from base.enums import RoleType
import exceptions as exc
from persistence.s3 import s3_handler
from persistence.amqp_publisher import send_judge
from processor.http.util import timezone_validate

router = APIRouter(
    tags=['Submission'],
    default_response_class=responses.JSONResponse,
    dependencies=[Depends(get_auth_token)])


@dataclass
class AddSubmissionOutput:
    id: int


@router.post('/problem/{problem_id}/submission')
@enveloped
async def submit(problem_id: int, content_file: UploadFile = File(...)) -> AddSubmissionOutput:
    problem = await db.problem.read(problem_id=problem_id)
    if request.account.role is not RoleType.TA and timezone_validate(request.time) < problem.start_time:
        raise exc.NoPermission

    content_file_uuid = uuid4()
    await s3_handler.upload(file=content_file.file, key=content_file_uuid)
    await db.s3_file.add(s3_file=do.S3File(uuid=content_file_uuid,
                                           key=str(content_file_uuid),
                                           bucket='temp'))  # FIXME: bucket name

    submission_id = await db.submission.add(account_id=request.account.id,
                                            problem_id=problem.id,
                                            submit_time=timezone_validate(request.time),
                                            filename=content_file.filename,
                                            content_file_uuid=content_file_uuid)

    problem_url = await s3_handler.sign_url(bucket='temp',
                                            key=str(problem.testcase_file_uuid),
                                            filename=problem.filename)

    content_file_url = await s3_handler.sign_url(bucket='temp', key=str(content_file_uuid), filename=content_file.filename)
    await send_judge(do.JudgeTask(problem_url=problem_url,
                                  submission_id=submission_id,
                                  submission_url=content_file_url))

    return AddSubmissionOutput(id=submission_id)


@router.get('/submission/{submission_id}/judge-case')
@enveloped
async def browse_judge_case_under_submission(submission_id: int) -> Sequence[do.JudgeCase]:
    submission = await db.submission.read(submission_id=submission_id)
    if not (request.account.role is RoleType.TA or request.account.id == submission.account_id):
        raise exc.NoPermission

    return await db.judge_case.browse(submission_id=submission_id)


@router.get('/submission/{submission_id}')
@enveloped
async def read_submission(submission_id: int) -> do.Submission:
    submission = await db.submission.read(submission_id=submission_id)
    if not (request.account.id == submission.account_id or request.account.role == RoleType.TA):
        raise exc.NoPermission

    return submission
