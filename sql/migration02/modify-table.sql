use liniodb;

ALTER TABLE usuario ADD COLUMN saltstamp text;
ALTER TABLE usuario CHANGE COLUMN `password` `passwordhash` TEXT NOT NULL;