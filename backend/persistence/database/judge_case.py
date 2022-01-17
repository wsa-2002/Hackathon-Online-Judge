from base import do, enums
from typing import Sequence

from .util import pyformat2psql
from . import pool_handler


async def add(submission_id: int, title: str, description: str,
              state: enums.JudgeCaseState, error_message: str = None) -> int:
    sql, params = pyformat2psql(
        sql=fr"INSERT INTO judge_case"
            fr"            (submission_id, title, description, state, error_message)"
            fr"     VALUES (%(submission_id)s, %(title)s, %(description)s, %(state)s, %(error_message)s)"
            fr"  RETURNING id",
        submission_id=submission_id, title=title, description=description,
        state=state.value, error_message=error_message
    )
    id_, = await pool_handler.pool.fetchrow(sql, *params)
    return id_


async def browse(submission_id: int) -> Sequence[do.JudgeCase]:
    sql, params = pyformat2psql(
        sql=fr"SELECT id, submission_id, title, description, state, error_message"
            fr"  FROM judge_case"
            fr" WHERE submission_id = %(submission_id)s"
            fr" ORDER BY id ASC",
        submission_id=submission_id,
    )
    records = await pool_handler.pool.fetch(sql, *params)
    return [do.JudgeCase(id=id_, submission_id=submission_id, title=title, description=description,
                         state=state, error_message=error_message)
            for id_, submission_id, title, description, state, error_message in records]
