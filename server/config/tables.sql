-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 01, 2020 at 10:54 PM
-- Server version: 10.5.5-MariaDB-1:10.5.5+maria~buster
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hey-fit`
--

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `height` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `weight` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lactose_intolerance` tinyint(1) DEFAULT 0,
  `athlete` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `height`, `weight`, `lactose_intolerance`, `athlete`, `createdAt`, `updatedAt`) VALUES
(1, 'dd23', '4', '4', 0, 1, '2020-10-31 22:33:53', '2020-11-01 12:30:30'),
(2, 'pessoa 2', '180', '85', 0, 1, '2020-11-01 11:16:57', '2020-11-01 11:16:57'),
(3, 'pessoa 2', '180', '85', 0, 1, '2020-11-01 11:17:07', '2020-11-01 11:17:07'),
(4, 'pessoa 4', '180', '85', 0, 1, '2020-11-01 11:18:01', '2020-11-01 11:18:01'),
(5, 'pessoa 44', '180', '85', 0, 1, '2020-11-01 11:20:01', '2020-11-01 12:30:38'),
(6, 'pessoa 4', '180', '85', 0, 1, '2020-11-01 11:22:09', '2020-11-01 11:22:09'),
(7, 'pessoa 4', '180', '85', 0, 1, '2020-11-01 11:22:37', '2020-11-01 11:22:37'),
(8, 'dfdfd', '454', '4545', 0, 1, '2020-11-01 11:25:14', '2020-11-01 11:25:14'),
(9, 'dfdfdjjjjjj', '454', '4545', 0, 1, '2020-11-01 11:25:52', '2020-11-01 12:45:35'),
(22, 'hghgh', '3', '45', 0, 0, '2020-11-01 12:52:44', '2020-11-01 12:52:44');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('people.js'),
('users.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@admin.com', '$2b$10$VUx25FqrQUKosUblsUsnQ./Q8REDkhP1bxgSwQNoGXiV0jj2Re0oi', 1, '2020-10-31 00:00:00', NULL),
(2, 'testes', 'lucianopalharesrosa@hotmail.com', '$2b$10$1WpNSYBmSnOWW0EfZQEb1.9Wb3Ewmu/3lpSrooQyaeGVN2x/ccqre', 0, '2020-11-01 22:47:23', '2020-11-01 22:47:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
