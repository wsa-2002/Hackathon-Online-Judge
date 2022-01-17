"""
data objects
"""

from dataclasses import dataclass
from typing import Optional, Sequence
from datetime import datetime
from uuid import UUID

from base import enums


@dataclass
class Account:
    id: int
    username: str
    role: enums.RoleType
    real_name: str
    student_id: str


@dataclass
class Problem:
    id: int
    title: str
    description: str
    filename: str
    testcase_file_uuid: UUID
    start_time: datetime
    end_time: datetime


@dataclass
class Submission:
    id: int
    account_id: int
    problem_id: int
    submit_time: datetime
    content_file_uuid: UUID
    filename: str
    total_pass: Optional[int]
    total_fail: Optional[int]


@dataclass
class JudgeCase:
    id: int
    submission_id: int
    title: str
    description: str
    state: enums.JudgeCaseState
    error_message: Optional[str]


@dataclass
class S3File:
    uuid: UUID
    key: str
    bucket: str


# Judge related objects


@dataclass
class JudgeCaseReport:
    title: str
    description: str
    state: enums.JudgeCaseState
    error_message: Optional[str]


@dataclass
class JudgeReport:
    submission_id: int
    total_passes: int
    total_failures: int
    judge_cases: Sequence[JudgeCaseReport]


@dataclass
class JudgeTask:
    problem_url: str
    submission_id: int
    submission_url: str
