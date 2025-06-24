-- Drop old columns
ALTER TABLE service_date_time
DROP COLUMN monday,
DROP COLUMN tuesday,
DROP COLUMN wednesday,
DROP COLUMN thursday,
DROP COLUMN friday,
DROP COLUMN saturday,
DROP COLUMN sunday,
DROP COLUMN date,
DROP COLUMN start_time,
DROP COLUMN end_time,
DROP COLUMN duration;

-- Add new columns
ALTER TABLE service_date_time
ADD COLUMN work_hours_start TIME NOT NULL,
ADD COLUMN work_hours_end TIME NOT NULL,
ADD COLUMN working_days JSON,
ADD COLUMN time_packages INT NOT NULL; 