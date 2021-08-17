-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: controledespesas
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `nomeUsuario` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'fernando','fernando@gmail.com','$2b$10$gUP7QuPr0nK14BVsJqDPeOtsfOcPHrwDPy1GIkX0aaEcoqE/TRUN.','fernandosena'),(2,'','','$2b$10$YLWhX6ShIr0.F4uuwcKlNu9jcVlRQPAb9nHFHHeXm0m1p86LHjq7u','fernandosena'),(3,'','dsadsadsadsa','$2b$10$2WJzsSVbZT6l.cl8nZHISucoDbfv73MFcRcR0471GYRZxPK9hQqZ2','fernandosena'),(4,'fernando','fernanndosenna@gmail.com','$2b$10$KTfrJVGgqGlySNOKR2EWWeMPGX1iMfOLGM7AlrfqxZhA09YCI8oL6','fernandosena'),(5,'fernando','leticia@gmail.com','$2b$10$oLrPzDgZ7kaNzIQG/2nkpO/QhFkop5aiUP2mkN0W190hYSWEKcBRe','fernandosena'),(6,'priscila','priscila@gmail.com','$2b$10$hD8aWv7Cy5YJf/Aj/C.EFe3AKB/shy1QArUZCQXwWaWsOFKaZNIv.','priscilajs'),(7,'matheus','matheus@gmail.com','$2b$10$yUqb0rVMWQFW13W2l/ss1upvOLFLuCnsWcbJISA/fAtLDEnoZTGeO','matheussl');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-17 12:39:28
