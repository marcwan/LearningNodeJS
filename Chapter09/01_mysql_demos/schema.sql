DROP DATABASE IF EXISTS PhotoAlbums;


CREATE DATABASE PhotoAlbums
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

USE PhotoAlbums;


CREATE TABLE Albums
(
  name VARCHAR(50) UNIQUE PRIMARY KEY,
  title VARCHAR(100),
  date DATETIME,
  description VARCHAR(500),

  -- allow for sorting on date.
  INDEX(date)
)
ENGINE = InnoDB;

CREATE TABLE Photos
(
  album_name VARCHAR(50),
  filename VARCHAR(50),
  description VARCHAR(500),
  date DATETIME,

  FOREIGN KEY (album_name) REFERENCES Albums (name),
  INDEX (album_name, date)
)
ENGINE = InnoDB;


CREATE TABLE Users
(
  user_uuid VARCHAR(50) UNIQUE PRIMARY KEY,
  email_address VARCHAR(150) UNIQUE,

  display_name VARCHAR(100) NOT NULL,
  password VARCHAR(100),

  first_seen_date BIGINT,
  last_modified_date BIGINT,
  deleted BOOL DEFAULT false,

  INDEX(email_address),
  INDEX(user_uuid)
)
ENGINE = InnoDB;


