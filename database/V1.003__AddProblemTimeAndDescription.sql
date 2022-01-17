ALTER TABLE problem
	ADD COLUMN  start_time	 TIMESTAMP,
	ADD COLUMN  end_time	 TIMESTAMP,
	ADD COLUMN  description	 VARCHAR;

-- manual insert value to existing accounts

ALTER TABLE problem
	ALTER COLUMN start_time  SET NOT NULL,
	ALTER COLUMN end_time    SET NOT NULL;