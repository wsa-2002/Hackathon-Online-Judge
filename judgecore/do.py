from dataclasses import dataclass
from typing import Optional, Sequence

import enums


@dataclass
class JudgeTask:
    problem_url: str
    submission_id: int
    submission_url: str


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