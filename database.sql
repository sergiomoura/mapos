-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: maxse000
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.17.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `maxse_bairros`
--

DROP TABLE IF EXISTS `maxse_bairros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_bairros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(4) DEFAULT NULL,
  `nome` varchar(256) DEFAULT NULL,
  `domasa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_bairros_1_idx` (`domasa`),
  CONSTRAINT `fk_maxse_bairros_1` FOREIGN KEY (`domasa`) REFERENCES `maxse_domasas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_domasas`
--

DROP TABLE IF EXISTS `maxse_domasas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_domasas` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_equipes`
--

DROP TABLE IF EXISTS `maxse_equipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_equipes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sigla` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_lider` int(11) DEFAULT NULL,
  `id_tipo` int(11) DEFAULT NULL,
  `ativa` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_maxse_equipes_1_idx` (`id_tipo`),
  KEY `fk_maxse_equipes_2_idx` (`id_lider`),
  CONSTRAINT `fk_maxse_equipes_1` FOREIGN KEY (`id_tipo`) REFERENCES `maxse_tipos_de_equipe` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_equipes_2` FOREIGN KEY (`id_lider`) REFERENCES `maxse_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_equipes_x_usuarios`
--

DROP TABLE IF EXISTS `maxse_equipes_x_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_equipes_x_usuarios` (
  `id_equipe` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_equipe`),
  KEY `fk_maxse_equipes_x_usuarios_1_idx` (`id_equipe`),
  CONSTRAINT `fk_maxse_equipes_x_usuarios_1` FOREIGN KEY (`id_equipe`) REFERENCES `maxse_equipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_equipes_x_usuarios_2` FOREIGN KEY (`id_usuario`) REFERENCES `maxse_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_medidas_area`
--

DROP TABLE IF EXISTS `maxse_medidas_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_medidas_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `l` decimal(5,2) DEFAULT NULL,
  `c` decimal(5,2) DEFAULT NULL,
  `id_sse` int(11) DEFAULT NULL,
  `tipo` enum('p','r') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_medidas_area_1_idx` (`id_sse`),
  CONSTRAINT `fk_maxse_medidas_area_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_medidas_linear`
--

DROP TABLE IF EXISTS `maxse_medidas_linear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_medidas_linear` (
  `id` int(11) NOT NULL,
  `v` decimal(5,2) DEFAULT NULL,
  `id_sse` int(11) DEFAULT NULL,
  `tipo` enum('p','r') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_medidas_linear_1_idx` (`id_sse`),
  CONSTRAINT `fk_maxse_medidas_linear_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_medidas_unidades`
--

DROP TABLE IF EXISTS `maxse_medidas_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_medidas_unidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `n` int(11) DEFAULT NULL,
  `id_sse` int(11) DEFAULT NULL,
  `tipo` enum('p','r') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_medidas_unidades_1_idx` (`id_sse`),
  CONSTRAINT `fk_maxse_medidas_unidades_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_sses`
--

DROP TABLE IF EXISTS `maxse_sses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_sses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `endereco` varchar(250) DEFAULT NULL,
  `id_bairro` int(11) DEFAULT NULL,
  `numero` varchar(12) DEFAULT NULL,
  `id_tipo_de_servico` int(11) DEFAULT NULL,
  `dh_registrado` datetime DEFAULT CURRENT_TIMESTAMP,
  `dh_recebido` datetime DEFAULT NULL,
  `dh_ini_exec` datetime DEFAULT NULL,
  `dh_fim_exec` datetime DEFAULT NULL,
  `urgente` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_sses_1_idx` (`id_bairro`),
  CONSTRAINT `fk_maxse_sses_1` FOREIGN KEY (`id_bairro`) REFERENCES `maxse_bairros` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_tipos_de_equipe`
--

DROP TABLE IF EXISTS `maxse_tipos_de_equipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_tipos_de_equipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_UNIQUE` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_tipos_de_servico`
--

DROP TABLE IF EXISTS `maxse_tipos_de_servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_tipos_de_servico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(4) DEFAULT NULL,
  `letra` varchar(1) DEFAULT NULL,
  `prazo` decimal(4,1) DEFAULT NULL,
  `desc_longa` varchar(256) DEFAULT NULL,
  `medida` enum('a','l','u') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maxse_usuarios`
--

DROP TABLE IF EXISTS `maxse_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nome` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `validade_do_token` datetime DEFAULT NULL,
  `acessoApp` tinyint(1) NOT NULL DEFAULT '0',
  `acessoWeb` tinyint(1) NOT NULL DEFAULT '0',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-09  3:03:33
