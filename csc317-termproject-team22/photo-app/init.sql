CREATE DATABASE IF NOT EXISTS `csc317db`;
​
USE `csc317db`;
​
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(2048) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
​
CREATE TABLE IF NOT EXISTS `imageposts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(512) NOT NULL,
  `description` varchar(8096) NOT NULL,
  `fk_userid` int unsigned NOT NULL,
  `active` int unsigned NOT NULL,
  `photopath` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `postid_UNIQUE` (`id`),
  KEY `id_idx` (`fk_userid`),
  CONSTRAINT `id` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
​
​
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(4096) NOT NULL,
  `fk_postid` int unsigned NOT NULL,
  `fk_userid` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID_idx` (`fk_userid`),
  KEY `postimageID_idx` (`fk_postid`),
  CONSTRAINT `postimageID` FOREIGN KEY (`fk_postid`) REFERENCES `imageposts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userID` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;