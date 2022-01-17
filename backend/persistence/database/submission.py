from datetime import datetime
from uuid import UUID

from base import do
import exceptions as exc

from .util import pyformat2psql
from . import pool_handler


async def edit(submission_id: int, total_pass: int, total_fail: int) -> None:
    sql, params = pyformat2psql(
        sql=fr"UPDATE submission"
            fr"   SET total_pass = %(total_pass)s, total_fail = %(total_fail)s"
            fr" WHERE id = %(submission_id)s",
        total_pass=total_pass, total_fail=total_fail, submission_id=submission_id
    )
    await pool_handler.pool.execute(sql, *params)


async def add(account_id: int, problem_id: int, submit_time: datetime, filename: str, content_file_uuid: UUID) -> int:
    sql, params = pyformat2psql(
        sql=fr"INSERT INTO submission"
            fr"            (account_id, problem_id, submit_time, filename, content_file_uuid)"
            fr"     VALUES (%(account_id)s, %(problem_id)s, %(submit_time)s, %(filename)s, %(content_file_uuid)s)"
            fr"  RETURNING id",
        account_id=account_id, problem_id=problem_id, submit_time=submit_time,
        filename=filename, content_file_uuid=content_file_uuid
    )
    id_, = await pool_handler.pool.fetchrow(sql, *params)
    return id_


async def read(submission_id: int) -> do.Submission:
    sql, params = pyformat2psql(
        sql=fr"SELECT problem_id, account_id, content_file_uuid, filename, total_pass, total_fail, submit_time"
            fr"  FROM submission"
            fr" WHERE id = %(submission_id)s",
            submission_id=submission_id
    )
    try:
        problem_id, account_id, content_file_uuid, filename, total_pass, total_fail, submit_time = \
            await pool_handler.pool.fetchrow(sql, *params)
    except TypeError:
        raise exc.NotFound
    return do.Submission(id=submission_id, problem_id=problem_id, account_id=account_id,
                         content_file_uuid=content_file_uuid, filename=filename,
                         total_pass=total_pass, total_fail=total_fail, submit_time=submit_time)


async def read_last_submission(account_id: int, problem_id: int) -> do.Submission:
    sql, params = pyformat2psql(
        sql=fr"SELECT id, account_id, problem_id, submit_time, content_file_uuid, filename, total_pass, total_fail"
            fr"  FROM submission"
            fr" WHERE account_id = %(account_id)s AND problem_id = %(problem_id)s"
            fr" ORDER BY id DESC"
            fr" LIMIT 1",
        account_id=account_id,
        problem_id=problem_id
    )

    try:
        id_, account_id, problem_id, submit_time, content_file_uuid, filename, total_pass, total_fail = \
            await pool_handler.pool.fetchrow(sql, *params)
    except TypeError:
        raise exc.NotFound

    return do.Submission(id=id_, account_id=account_id, problem_id=problem_id,
                         submit_time=submit_time, content_file_uuid=content_file_uuid, filename=filename,
                         total_pass=total_pass, total_fail=total_fail)
