CREATE TABLE `player` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Gamer_tag` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `card` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(225) NOT NULL,
  `description` varchar(255) NOT NULL,
  `defence` int NOT NULL,
  `powerfull` int NOT NULL,
  `protection` int NOT NULL,
  `attack` int NOT NULL,
  `logo_family` varchar(255) NOT NULL,
  `id_family` int NOT NULL
);

CREATE TABLE `family` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `capacity` int NOT NULL
);

ALTER TABLE `card` ADD FOREIGN KEY (`id_family`) REFERENCES `family` (`id`);