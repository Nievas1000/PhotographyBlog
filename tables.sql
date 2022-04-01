-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-02-2022 a las 16:03:39
-- Versión del servidor: 10.1.40-MariaDB
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- User
--


-- --------------------------------------------------------
--
-- Data base: `tables`
--
CREATE DATABASE IF NOT EXISTS `blog` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `blog`;

-- --------------------------------------------------------

--
-- Structure of the `authors` table
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `img_profile` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure of the `images` table
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(41) DEFAULT NULL,
  `id_author` int(11) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes of the `authors` table
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes of the `images` table
--
--

ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

-- AUTO_INCREMENT of dumped tables
--

--
-- AUTO_INCREMENT of table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


--
-- AUTO_INCREMENT of table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Foreign key index table `images`
--
--

ALTER TABLE `images`
  ADD FOREIGN KEY (`id_author`) REFERENCES `authors`(`id`) ON DELETE CASCADE;

COMMIT;