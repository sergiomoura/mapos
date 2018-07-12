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
-- Dumping data for table `maxse_bairros`
--

LOCK TABLES `maxse_bairros` WRITE;
/*!40000 ALTER TABLE `maxse_bairros` DISABLE KEYS */;
INSERT INTO `maxse_bairros` VALUES (1,'413','AEROPORTO VIRACOPOS',5),(2,'946','ALTO DO JD IPAUSSURAMA',6),(3,'940','ALTO JD IPAUSSURAMA',1),(4,'344','BACURI',5),(5,'155','BOSQUE',3),(6,'831','BUENO DE MIRANDA',3),(7,'788','CAMBO BELO',5),(8,'764','CAMPINAS',1),(9,'877','CAMPO REDONDO',5),(10,'359','CAMPOS ELISEOS',1),(11,'164','CENTRO',3),(12,'498','CH ARVORE GRANDE',1),(13,'474','CH BURITI',3),(14,'16','CH CAMPOS ELISEOS',1),(15,'66','CH CRUZEIRO DO SUL',6),(16,'454','CH DA REPUBLICA',1),(17,'988','CH FLORIANO C. PENTEADO',3),(18,'416','CH FORMOSA',5),(19,'948','CH LULU PONTES',1),(20,'149','CH MARISA',1),(21,'140','CH MORUMBI',6),(22,'560','CH OLIMPIA',3),(23,'976','CH PRADO',3),(24,'95','CH RECANTO DA COLINA',6),(25,'613','CH RECREIO',3),(26,'976','CH SAMAMBAIA',3),(27,'220','CH SAO DOMINGOS',3),(28,'528','CH SAO FRANCISCO',5),(29,'294','CH SAO JOSE',5),(30,'934','CH SAO JUDAS TADEU',6),(31,'795','CH SAO MARTINHO',3),(32,'337','CH STA LETICIA',5),(33,'693','CH STO ANTONIO',1),(34,'2','CH STO ANTONIO DA SAUDADE',3),(35,'502','CH STO ANTONIO SAUDADE',3),(36,'334','CH STOS DUMONT',5),(37,'989','CH VIEIRA',3),(38,'24','CID JARDIM',1),(39,'420','CID SATELITE IRIS',6);
/*!40000 ALTER TABLE `maxse_bairros` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `maxse_domasas`
--

LOCK TABLES `maxse_domasas` WRITE;
/*!40000 ALTER TABLE `maxse_domasas` DISABLE KEYS */;
INSERT INTO `maxse_domasas` VALUES (1),(3),(5),(6);
/*!40000 ALTER TABLE `maxse_domasas` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `maxse_equipes`
--

LOCK TABLES `maxse_equipes` WRITE;
/*!40000 ALTER TABLE `maxse_equipes` DISABLE KEYS */;
INSERT INTO `maxse_equipes` VALUES (2,'Tapa Buraco A1','TBR4',2,1,1),(3,'Base 1','B1',3,2,1),(4,'Tapa Buraco 5','TBR5',2,1,1),(5,'Mecanizada 1','MEC1',4,4,1),(6,'Mecanizada 2','MEC2',1,4,1),(7,'Guias e Sarjetas 1','GS1',1,3,0),(9,'Equipe teste','test',10,3,1),(10,'Equipe Teste 2','TT2',9,4,1),(11,'asdasdasd','aaa',10,3,0),(13,'Equipe Teste 3','ett4',NULL,3,1),(14,'Equipe Teste 5','ET5',NULL,2,1),(15,'Equipe Teste 6','ETT6',NULL,2,1);
/*!40000 ALTER TABLE `maxse_equipes` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `maxse_equipes_x_usuarios`
--

LOCK TABLES `maxse_equipes_x_usuarios` WRITE;
/*!40000 ALTER TABLE `maxse_equipes_x_usuarios` DISABLE KEYS */;
INSERT INTO `maxse_equipes_x_usuarios` VALUES (2,1),(2,2),(2,3),(2,4),(3,1),(3,9),(4,1),(4,2),(4,4),(4,5),(5,1),(5,2),(5,3),(5,5),(6,1),(6,2),(6,3),(6,9),(7,4),(7,5),(7,6),(9,1),(9,6),(9,10),(10,3),(10,6),(10,10),(11,1),(11,6),(13,3),(13,6),(13,9),(14,1),(14,6),(15,1),(15,6),(15,10);
/*!40000 ALTER TABLE `maxse_equipes_x_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_area`
--

LOCK TABLES `maxse_medidas_area` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_area` DISABLE KEYS */;
INSERT INTO `maxse_medidas_area` VALUES (16,0.10,2.00,2,'p'),(23,20.00,2.00,6,'p'),(24,1.00,2.00,6,'p'),(25,10.00,2.00,8,'p'),(31,5.00,5.00,13,'p');
/*!40000 ALTER TABLE `maxse_medidas_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_medidas_linear`
--

DROP TABLE IF EXISTS `maxse_medidas_linear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_medidas_linear` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `v` decimal(5,2) DEFAULT NULL,
  `id_sse` int(11) DEFAULT NULL,
  `tipo` enum('p','r') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_medidas_linear_1_idx` (`id_sse`),
  CONSTRAINT `fk_maxse_medidas_linear_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_linear`
--

LOCK TABLES `maxse_medidas_linear` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_linear` DISABLE KEYS */;
INSERT INTO `maxse_medidas_linear` VALUES (1,10.00,1,'p'),(4,2.30,3,'p'),(5,2.00,3,'p'),(7,12.00,7,'p'),(8,5.00,10,'p'),(9,55.00,11,'p'),(10,5.00,12,'p'),(11,5.00,14,'p'),(12,6.00,15,'p');
/*!40000 ALTER TABLE `maxse_medidas_linear` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_unidades`
--

LOCK TABLES `maxse_medidas_unidades` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_unidades` DISABLE KEYS */;
INSERT INTO `maxse_medidas_unidades` VALUES (4,5,4,'p'),(5,3,4,'p'),(6,4,4,'p'),(8,5,5,'p'),(9,1,5,'p');
/*!40000 ALTER TABLE `maxse_medidas_unidades` ENABLE KEYS */;
UNLOCK TABLES;

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
  `numero` varchar(12) NOT NULL,
  `id_tipo_de_servico` int(11) DEFAULT NULL,
  `dh_registrado` datetime DEFAULT CURRENT_TIMESTAMP,
  `dh_recebido` datetime DEFAULT NULL,
  `dh_ini_exec` datetime DEFAULT NULL,
  `dh_fim_exec` datetime DEFAULT NULL,
  `urgente` tinyint(4) DEFAULT NULL,
  `obs` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_UNIQUE` (`numero`),
  KEY `fk_maxse_sses_1_idx` (`id_bairro`),
  CONSTRAINT `fk_maxse_sses_1` FOREIGN KEY (`id_bairro`) REFERENCES `maxse_bairros` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_sses`
--

LOCK TABLES `maxse_sses` WRITE;
/*!40000 ALTER TABLE `maxse_sses` DISABLE KEYS */;
INSERT INTO `maxse_sses` VALUES (1,'Rua Frederico Campos, nº 1231',17,'65555',7,'2018-07-11 14:28:14','2018-07-07 08:00:00',NULL,NULL,0,'Ação: Um texto com alguma observação sobre a SSE'),(2,'Rua Antônio Almeida Paiva, nº 121',2,'67788',2,'2018-07-11 16:03:21','2018-07-07 02:00:00',NULL,NULL,1,'URGÊNCIA DEVIDA À LOCALIZAÇÃO PERIGOSA DO BURACO'),(3,'Av Francisco Rodrigues Filho, nº 2002',2,'77777',7,'2018-07-11 16:29:47','2018-07-11 14:00:00',NULL,NULL,1,'Uma observação qualquer'),(4,'Rua Teste',21,'11111',11,'2018-07-11 16:02:18','2018-07-10 17:00:00',NULL,NULL,0,NULL),(5,'Rua da Vida, nº44',5,'22222',11,'2018-07-11 16:28:37','2018-07-11 13:00:00',NULL,NULL,1,NULL),(6,'Rua da Viola, nº 50',10,'654444',1,'2018-07-11 16:28:05','2018-07-14 13:04:00',NULL,NULL,1,'Teste'),(7,'Rua azambuja, n 45',1,'333333',7,'2018-07-11 16:31:29','2018-07-11 12:01:00',NULL,NULL,0,NULL),(8,'asfsdafffsdadf',12,'88797',2,'2018-07-11 23:58:23','2018-07-12 09:00:00',NULL,NULL,0,'eee'),(9,'eeeeeeeee',30,'99978',11,'2018-07-12 00:25:12','2018-07-12 15:00:00',NULL,NULL,1,'asadasa das'),(10,'lllll',6,'54555',7,'2018-07-12 00:34:56','2018-07-12 04:06:00',NULL,NULL,0,NULL),(11,'Ffghh',18,'222',7,'2018-07-12 01:01:00','2018-07-12 09:00:00',NULL,NULL,0,'Obs'),(12,'Fghhj',12,'9954',7,'2018-07-12 01:12:30','2018-07-12 00:23:00',NULL,NULL,0,'Tffd'),(13,'Ffd ducha jj',6,'3636',4,'2018-07-12 02:48:16','2018-07-12 15:05:00',NULL,NULL,0,NULL),(14,'Ghhgfdd',13,'Hhh',7,'2018-07-12 01:46:58','2018-07-12 00:00:00',NULL,NULL,0,NULL),(15,'Ggg',13,'5588',7,'2018-07-12 02:54:21','2018-07-12 00:00:00',NULL,NULL,1,'Ddf');
/*!40000 ALTER TABLE `maxse_sses` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `maxse_tipos_de_equipe`
--

LOCK TABLES `maxse_tipos_de_equipe` WRITE;
/*!40000 ALTER TABLE `maxse_tipos_de_equipe` DISABLE KEYS */;
INSERT INTO `maxse_tipos_de_equipe` VALUES (2,'Base'),(3,'Guias e Sarjetas'),(4,'Mecanizada'),(1,'Tapa Buraco');
/*!40000 ALTER TABLE `maxse_tipos_de_equipe` ENABLE KEYS */;
UNLOCK TABLES;

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
  `descricao` varchar(256) DEFAULT NULL,
  `medida` enum('a','l','u') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_tipos_de_servico`
--

LOCK TABLES `maxse_tipos_de_servico` WRITE;
/*!40000 ALTER TABLE `maxse_tipos_de_servico` DISABLE KEYS */;
INSERT INTO `maxse_tipos_de_servico` VALUES (1,'37','A',3.5,'Construção e/ou recuperação de pavimento asfáltico espessura 20cm','a'),(2,'4B','B',3.5,'Construção e/ou recuperação de pavimento asfáltico espessura 28 cm','a'),(3,'52','C',3.5,'Recapeamento de pavimento','a'),(4,'54','D',3.5,'Construção de pavimento em paralelepípedo','a'),(7,'56','G',2.5,'Construção e/ou recuperação de guias','l'),(8,'58','H',2.5,'Construção e/ou recuperação de sarjetas','l'),(9,'88','E',3.5,'Recuperação (nivelamento) de pavimento em paralelepípedo','a'),(10,'FR','I',7.0,'Fresagem contínua de pavimento a frio','a'),(11,'NV','F',3.5,'Fresagem contínua de pavimento a frio','u');
/*!40000 ALTER TABLE `maxse_tipos_de_servico` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `maxse_usuarios`
--

LOCK TABLES `maxse_usuarios` WRITE;
/*!40000 ALTER TABLE `maxse_usuarios` DISABLE KEYS */;
INSERT INTO `maxse_usuarios` VALUES (1,'Root','$1$a3WRsNEw$3sfx0L/.ZBK.KhawVuJi7/','Root Sérgio Moura','smouracalmon@gmail.com','5b46caa7ac3b09.60691220','2018-07-12 05:27:35',1,1,1),(2,'teste1','$2y$10$GHI.FKQs95iMPE/wkcQDxe7rJbbHpKLyrWQldkNQl8VV35nAu2hMe','Teste Um da Silva','teste1@teste.com','5b37062648caf8.80791613','2018-06-30 02:25:10',1,0,0),(3,'teste2',NULL,'Teste Dois de Sanches Almeida','teste2@teste.com','5b365e81433059.70203088','2018-06-29 13:34:53',0,1,1),(4,'teste3',NULL,'Teste Três Ruttember Steeper','teste3@teste.com','5b365e81433059.70203088','2018-06-29 13:34:53',0,0,0),(5,'teste4',NULL,'Teste Quatro de Araújo Pinho','teste4@teste.com',NULL,NULL,0,1,1),(6,'teste5',NULL,'Teste Cinco Pereita','teste5@teste.com',NULL,NULL,1,0,1),(8,'teste6',NULL,'Teste Seis','teste6@teste.com',NULL,NULL,0,0,1),(9,'teste10','$2y$10$8jG7GdKl4hISqWp8LKak0uvtIeqegUl1Pq0BHi5/ZWsoPLsLbr4Fy','Ataúlfo Rodrigues Filho','ataulfo@teste.com',NULL,NULL,1,0,1),(10,'rogerio','$1$Eund7yHt$gQWV1mj1yqzpzM/0IPxox1','Rogério Ceni','rc@teste.com','5b3f924e00fad0.05066281','2018-07-06 14:01:18',0,0,1);
/*!40000 ALTER TABLE `maxse_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-12  3:02:46
