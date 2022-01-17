ALTER TABLE account
  ADD student_id VARCHAR,
  ADD real_name VARCHAR;

-- manual insert value to existing accounts

ALTER TABLE account
ALTER COLUMN student_id SET NOT NULL,
ALTER COLUMN real_name SET NOT NULL,
  ADD CONSTRAINT account_student_id_key UNIQUE (student_id);