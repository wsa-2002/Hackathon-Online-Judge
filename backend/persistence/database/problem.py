from datetime import datetime
from typing import Optional, Sequence
from uuid import UUID

import asyncpg

from base import do
import exceptions as exc

from .util import pyformat2psql
from . import pool_handler


async def read(problem_id: int) -> do.Problem:
    sql, params = pyformat2psql(
        sql=fr"SELECT id, title, testcase_file_uuid, description, start_time, end_time, filename"
            fr"  FROM problem"
            fr" WHERE id = %(problem_id)s"
            fr"   AND NOT is_deleted",
        problem_id=problem_id,
    )
    try:
        id_, title, testcase_file_uuid, description, start_time, end_time, filename = \
            await pool_handler.pool.fetchrow(sql, *params)
    except TypeError:
        raise exc.NotFound
    return do.Problem(id=id_, title=title, testcase_file_uuid=testcase_file_uuid, filename=filename,
                      description=description, start_time=start_time, end_time=end_time)


async def add(title: str, start_time: datetime, end_time: datetime,
              filename: str, testcase_file_uuid: UUID, description: Optional[str] = None) -> int:
    sql, params = pyformat2psql(
        sql=fr"INSERT INTO problem"
            fr"            (title, start_time, end_time, filename, testcase_file_uuid, description)"
            fr"     VALUES (%(title)s, %(start_time)s, %(end_time)s, %(filename)s, %(testcase_file_uuid)s," 
            fr"             %(description)s)"
            fr"  RETURNING id",
        title=title, start_time=start_time, end_time=end_time, description=description,
        filename=filename, testcase_file_uuid=testcase_file_uuid
    )
    try:
        id_, = await pool_handler.pool.fetchrow(sql, *params)
    except asyncpg.exceptions.UniqueViolationError:
        raise exc.ProblemTitleExist
    return id_


async def delete(problem_id: int) -> None:
    sql, params = pyformat2psql(
        sql=fr"UPDATE problem"
            fr"   SET is_deleted = %(is_deleted)s"
            fr" WHERE id = %(problem_id)s",
        problem_id=problem_id, is_deleted=True,
    )
    await pool_handler.pool.execute(sql, *params)


async def edit(problem_id: int, title: str = None, start_time: datetime = None, end_time: datetime = None,
               description: Optional[str] = None, filename: str = None, testcase_file_uuid: UUID = None) -> None:
    to_updates = {}
    if title:
        to_updates['title'] = title
    if start_time:
        to_updates['start_time'] = start_time
    if end_time:
        to_updates['end_time'] = end_time
    if filename:
        to_updates['filename'] = filename
    if testcase_file_uuid:
        to_updates['testcase_file_uuid'] = testcase_file_uuid
    to_updates['description'] = description

    if not to_updates:
        return

    set_sql = ', '.join(fr"{field_name} = %({field_name})s" for field_name in to_updates)

    sql, params = pyformat2psql(
        sql=fr"UPDATE problem"
            fr"   SET {set_sql}"
            fr" WHERE id = %(problem_id)s"
            fr"   AND NOT is_deleted",
        problem_id=problem_id, **to_updates,
    )
    try:
        await pool_handler.pool.execute(sql, *params)
    except asyncpg.exceptions.UniqueViolationError:
        raise exc.ProblemTitleExist


async def browse() -> Sequence[do.Problem]:
    sql, params = pyformat2psql(
        sql=fr"SELECT id, title, testcase_file_uuid, description, start_time, end_time, filename"
            fr"  FROM problem"
            fr" WHERE NOT is_deleted"
            fr" ORDER BY id ASC",
    )
    problems = await pool_handler.pool.fetch(sql, *params)
    return [do.Problem(id=id_, title=title, testcase_file_uuid=testcase_file_uuid, description=description,
                       start_time=start_time, end_time=end_time, filename=filename)
            for id_, title, testcase_file_uuid, description, start_time, end_time, filename in problems]
