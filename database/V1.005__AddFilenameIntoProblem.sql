ALTER TABLE problem
  ADD COLUMN filename VARCHAR;

UPDATE problem
   SET filename = 'uploadFile.zip';

ALTER TABLE problem
ALTER COLUMN filename SET NOT NULL;