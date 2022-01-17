CREATE UNIQUE INDEX judge_case_submission_id_description_key ON judge_case (submission_id, description);

CREATE INDEX ON judge_case (submission_id);

CREATE INDEX ON problem (start_time);
CREATE INDEX ON problem (end_time);

CREATE INDEX ON submission (account_id);
CREATE INDEX ON submission (problem_id);
CREATE INDEX ON submission (submit_time);