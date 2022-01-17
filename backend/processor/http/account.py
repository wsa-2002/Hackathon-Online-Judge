from dataclasses import dataclass

from fastapi import APIRouter, responses, Depends
from pydantic import BaseModel

from security import encode_jwt, verify_password, hash_password
from middleware.envelope import enveloped
from middleware.headers import get_auth_token
from middleware.context import request
import persistence.database as db
import exceptions as exc
from base import do
from base.enums import RoleType

router = APIRouter(
    tags=['Account'],
    default_response_class=responses.JSONResponse,
    dependencies=[Depends(get_auth_token)]
)


class AddAccountInput(BaseModel):
    username: str
    password: str
    real_name: str
    student_id: str


@dataclass
class AddAccountOutput:
    id: int


@router.post('/account')
@enveloped
async def add_account(data: AddAccountInput) -> AddAccountOutput:
    if await db.account.is_duplicate_student_id(student_id=data.student_id):
        raise exc.DuplicateStudentId

    account_id = await db.account.add(username=data.username,
                                      pass_hash=hash_password(data.password),
                                      role=RoleType.student,
                                      real_name=data.real_name,
                                      student_id=data.student_id)

    return AddAccountOutput(id=account_id)


@router.get('/account/{account_id}')
@enveloped
async def read_account(account_id: int) -> do.Account:
    if not (request.account.role is RoleType.TA or request.account.id is account_id):
        raise exc.NoPermission

    return await db.account.read(account_id)


class LoginInput(BaseModel):
    username: str
    password: str


@dataclass
class LoginOutput:
    account_id: int
    token: str


@router.post('/login')
@enveloped
async def login(data: LoginInput) -> LoginOutput:
    try:
        account_id, pass_hash, role = await db.account.read_by_username(data.username)
    except TypeError:
        raise exc.LoginFailed

    if not verify_password(data.password, pass_hash):
        raise exc.LoginFailed

    token = encode_jwt(account_id=account_id, role=role)
    return LoginOutput(account_id=account_id, token=token)


@router.delete('/account/{account_id}')
@enveloped
async def delete_account(account_id: int) -> None:
    if not (request.account.role is RoleType.TA):
        raise exc.NoPermission

    return await db.account.delete(account_id=account_id)
