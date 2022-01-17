import json
import dataclasses

import pydantic

from base import do
import persistence.database as db


def unmarshal_report(body: bytes) -> do.JudgeReport:
    return pydantic.parse_raw_as(do.JudgeReport, body.decode())


class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return super().default(o)


def marshal(obj) -> bytes:
    return json.dumps(obj, cls=EnhancedJSONEncoder).encode()


async def save_report(body: bytes) -> None:
    report = unmarshal_report(body)
    print(report)
    await db.submission.edit(submission_id=report.submission_id,
                             total_pass=report.total_passes,
                             total_fail=report.total_failures)
    for judge_case in report.judge_cases:
        await db.judge_case.add(submission_id=report.submission_id,
                                title=judge_case.title,
                                description=judge_case.description,
                                state=judge_case.state,
                                error_message=judge_case.error_message)
