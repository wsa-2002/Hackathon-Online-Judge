CREATE TABLE s3_file (
    uuid    UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    key     VARCHAR NOT NULL,
    bucket  VARCHAR NOT NULL
);

CREATE TYPE role_type AS ENUM (
    'STUDENT',
    'TA'
);

CREATE TABLE account (
    id          SERIAL      PRIMARY KEY,
    username    VARCHAR     NOT NULL UNIQUE,
    pass_hash   VARCHAR     NOT NULL,
    role        role_type   NOT NULL
);

CREATE TABLE problem (
    id              SERIAL  PRIMARY KEY,
    title           VARCHAR NOT NULL UNIQUE,
    testcase_file_uuid UUID    REFERENCES s3_file(uuid)
);

CREATE TABLE submission (
    id                  SERIAL    PRIMARY KEY,
    account_id          INTEGER   NOT NULL REFERENCES account(id),
    problem_id          INTEGER   NOT NULL REFERENCES problem(id),
    submit_time         TIMESTAMP NOT NULL,
    content_file_uuid   UUID      NOT NULL REFERENCES s3_file(uuid),
    filename            VARCHAR   NOT NULL,
    total_pass          INTEGER,
    total_fail          INTEGER
);

CREATE TYPE judge_case_state AS ENUM (
    'PASS',
    'FAIL'
);

CREATE TABLE judge_case (
    id              SERIAL              PRIMARY KEY,
    submission_id   INTEGER             NOT NULL REFERENCES submission(id),
    title           VARCHAR             NOT NULL,
    description     TEXT                NOT NULL,
    state           judge_case_state    NOT NULL,
    error_msg       TEXT
);