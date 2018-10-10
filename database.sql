-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: maxse000
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.18.04.1

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
-- Table structure for table `estoque_movimentos`
--

DROP TABLE IF EXISTS `estoque_movimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estoque_movimentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produto` int(11) NOT NULL,
  `dh` datetime NOT NULL,
  `tipo` enum('-1','1') NOT NULL,
  `qtde` decimal(15,6) unsigned NOT NULL,
  `id_referencia` int(11) NOT NULL,
  `valor_unit` decimal(14,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `fk_estoque_movimentos_1_idx` (`id_produto`),
  CONSTRAINT `fk_estoque_movimentos_1` FOREIGN KEY (`id_produto`) REFERENCES `estoque_produtos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque_movimentos`
--

LOCK TABLES `estoque_movimentos` WRITE;
/*!40000 ALTER TABLE `estoque_movimentos` DISABLE KEYS */;
INSERT INTO `estoque_movimentos` VALUES (46,3,'2018-08-02 05:45:04','1',1000.000000,35,25.00),(47,10,'2018-08-02 05:45:05','1',1000.000000,35,294.00),(98,3,'2018-09-24 10:17:05','-1',2.064000,146,25.00),(99,3,'2018-09-24 11:42:32','-1',2.448000,147,25.00),(100,3,'2018-09-24 13:54:35','-1',1.500000,154,25.00),(101,3,'2018-09-24 14:15:27','-1',1.912500,143,25.00),(102,3,'2018-09-24 14:21:03','-1',1.500000,148,25.00),(103,3,'2018-09-24 15:14:11','-1',1.722000,142,25.00),(104,3,'2018-09-25 09:30:48','-1',2.000000,162,25.00),(105,3,'2018-09-25 10:38:12','-1',3.264000,157,25.00),(106,3,'2018-09-25 11:34:59','-1',1.080000,161,25.00),(107,3,'2018-09-25 11:42:26','-1',2.670000,150,25.00),(108,3,'2018-09-25 13:24:51','-1',0.255000,160,25.00),(109,3,'2018-09-25 15:09:31','-1',0.882000,168,25.00),(110,3,'2018-10-05 16:32:43','-1',1.772265,169,25.00),(111,3,'2018-10-07 12:39:43','-1',0.400000,174,25.00);
/*!40000 ALTER TABLE `estoque_movimentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `estoque_movimentos_AFTER_INSERT` AFTER INSERT ON `estoque_movimentos`
 FOR EACH ROW BEGIN
	declare qtde_atual decimal;
    declare valor_unit_atual decimal;
    
    select qtde into qtde_atual from estoque_produtos where id=new.id_produto;
    select valor_unit into valor_unit_atual from estoque_produtos where id=new.id_produto;
    
	if(new.tipo = '-1') then
		update estoque_produtos set qtde = qtde - new.qtde, ultimo_movimento=now() where id=new.id_produto;
	elseif (new.tipo = '1') then
		update estoque_produtos set qtde = qtde + new.qtde, valor_unit = (valor_unit_atual*qtde_atual + new.valor_unit*new.qtde)/(qtde_atual + new.qtde), ultimo_movimento=now() where id=new.id_produto;
    end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `estoque_movimentos_AFTER_UPDATE` AFTER UPDATE ON `estoque_movimentos`
 FOR EACH ROW BEGIN
	
    declare valor_unit_atual decimal;
    declare qtde_atual decimal;
    
    SELECT valor_unit,qtde INTO valor_unit_atual,qtde_atual from estoque_produtos WHERE id=old.id_produto;
    
	if(OLD.tipo = '1') then
		
		UPDATE estoque_produtos
		SET
			qtde = qtde + new.qtde - old.qtde,
            valor_unit = if(
							(qtde + new.qtde - old.qtde = 0),
                            0,
                            ( qtde_atual*valor_unit_atual + new.qtde*new.valor_unit - old.qtde*old.valor_unit)/(qtde_atual + new.qtde - old.qtde))
		WHERE id = old.id_produto;
        
    elseif (OLD.tipo = '-1') then
		UPDATE estoque_produtos SET qtde = qtde - new.qtde + old.qtde where id = old.id_produto;
    end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `estoque_movimentos_AFTER_DELETE` AFTER DELETE ON `estoque_movimentos`
 FOR EACH ROW BEGIN
	
    declare valor_unit_atual decimal;
    declare qtde_atual decimal;
    
    SELECT valor_unit,qtde INTO valor_unit_atual,qtde_atual from estoque_produtos WHERE id=old.id_produto;
    
	if(OLD.tipo = '1') then
		UPDATE
			estoque_produtos
		SET
			qtde = qtde - old.qtde,
            valor_unit = if((qtde_atual - old.qtde)=0,0,(qtde_atual*valor_unit_atual - old.qtde*old.valor_unit)/(qtde_atual - old.qtde)),
            ultimo_movimento=now()
		WHERE id = old.id_produto;
			
    elseif (OLD.tipo = '-1') then
		UPDATE
			estoque_produtos
		SET qtde = qtde + old.qtde,
            ultimo_movimento=now()
		WHERE id = old.id_produto;
    end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `estoque_nfs_entrada`
--

DROP TABLE IF EXISTS `estoque_nfs_entrada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estoque_nfs_entrada` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque_nfs_entrada`
--

LOCK TABLES `estoque_nfs_entrada` WRITE;
/*!40000 ALTER TABLE `estoque_nfs_entrada` DISABLE KEYS */;
INSERT INTO `estoque_nfs_entrada` VALUES (35,1,'2018-08-02');
/*!40000 ALTER TABLE `estoque_nfs_entrada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoque_produtos`
--

DROP TABLE IF EXISTS `estoque_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estoque_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(256) NOT NULL,
  `unidade` varchar(12) NOT NULL,
  `qtde_min` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `qtde_max` decimal(15,6) DEFAULT NULL,
  `qtde` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `ultimo_movimento` datetime DEFAULT NULL,
  `valor_unit` decimal(22,15) NOT NULL DEFAULT '0.000000000000000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque_produtos`
--

LOCK TABLES `estoque_produtos` WRITE;
/*!40000 ALTER TABLE `estoque_produtos` DISABLE KEYS */;
INSERT INTO `estoque_produtos` VALUES (3,'Bica Corrida','m³',0.000000,10000.000000,976.530235,'2018-10-07 12:40:06',25.000000000000000),(10,'CBUQ','T',0.000000,1000.000000,1000.000000,'2018-09-21 09:08:59',294.000000000000000);
/*!40000 ALTER TABLE `estoque_produtos` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=583 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_bairros`
--

LOCK TABLES `maxse_bairros` WRITE;
/*!40000 ALTER TABLE `maxse_bairros` DISABLE KEYS */;
INSERT INTO `maxse_bairros` VALUES (1,'413','AEROPORTO VIRACOPOS',5),(2,'946','ALTO DO JD IPAUSSURAMA',6),(3,'940','ALTO JD IPAUSSURAMA',1),(4,'344','BACURI',5),(5,'155','BOSQUE',3),(6,'831','BUENO DE MIRANDA',3),(7,'788','CAMBO BELO',5),(8,'764','CAMPINAS',1),(9,'877','CAMPO REDONDO',5),(10,'359','CAMPOS ELISEOS',1),(11,'164','CENTRO',3),(12,'498','CH ARVORE GRANDE',1),(13,'474','CH BURITI',3),(14,'16','CH CAMPOS ELISEOS',1),(15,'66','CH CRUZEIRO DO SUL',6),(16,'454','CH DA REPUBLICA',1),(17,'988','CH FLORIANO C. PENTEADO',3),(18,'416','CH FORMOSA',5),(19,'948','CH LULU PONTES',1),(20,'149','CH MARISA',1),(21,'140','CH MORUMBI',6),(22,'560','CH OLIMPIA',3),(23,'976','CH PRADO',3),(24,'95','CH RECANTO DA COLINA',6),(25,'613','CH RECREIO',3),(26,'976','CH SAMAMBAIA',3),(27,'220','CH SAO DOMINGOS',3),(28,'528','CH SAO FRANCISCO',5),(29,'294','CH SAO JOSE',5),(30,'934','CH SAO JUDAS TADEU',6),(31,'795','CH SAO MARTINHO',3),(32,'337','CH STA LETICIA',5),(33,'693','CH STO ANTONIO',1),(34,'2','CH STO ANTONIO DA SAUDADE',3),(35,'502','CH STO ANTONIO SAUDADE',3),(36,'334','CH STOS DUMONT',5),(37,'989','CH VIEIRA',3),(38,'24','CID JARDIM',1),(39,'420','CID SATELITE IRIS',6),(40,'','CID SATELITE IRIS II',6),(41,'148','CID SATELITE IRIS III',6),(42,'382','CID SINGER I',5),(43,'102','CID SINGER II',5),(44,'494','CJ HAB LECH WALESA',5),(45,'496','CJ HAB MONS LUIZ F ABREU',5),(46,'497','CJ HAB RUY NOVAES',5),(47,'749','CJ RES PQ SAO BENTO',6),(48,'290','COND ALTO NOVA CAMPINAS',5),(49,'26','COUNTRY VILLE',1),(50,'371','DIC',5),(51,'319','DIC I',5),(52,'320','DIC II',5),(53,'321','DIC III',5),(54,'322','DIC IV',5),(55,'323','DIC V',5),(56,'699','DIC V - II FASE',5),(57,'726','DIC V - III FASE',5),(58,'727','DIC V - IV FASE',5),(59,'733','DIC V - V FASE',5),(60,'52','DIC V VI FASE',5),(61,'324','DIC VI',5),(62,'470','DISTRITO INDUSTRIAL',5),(63,'455','FAZ BARREIRO',3),(64,'503','FAZ SETE QUEDAS',1),(65,'','FAZ TIJUCA',5),(66,'973','FUNDACAO DA CASA POPULAR',1),(67,'504','JD ACADEMICO',5),(68,'288','JD ADHEMAR DE BARROS',5),(69,'1','JD AERO CONTINENTAL',1),(70,'289','JD AERONAVE',5),(71,'286','JD AEROPORTO',5),(72,'342','JD AIRES DA COSTA',5),(73,'145','JD ALIANCA',3),(74,'2','JD ALVORADA',1),(75,'146','JD AMAZONAS',3),(76,'6','JD AMOREIRAS',1),(77,'422','JD ANA LUIZA',3),(78,'3','JD ANCHIETA',1),(79,'151','JD ANTONIO VON ZUBEN',3),(80,'291','JD AVIACAO',5),(81,'621','JD BAHIA',5),(82,'152','JD BARONEZA',3),(83,'111','JD BASSOLI',6),(84,'7','JD BELA VISTA CONT',1),(85,'153','JD BOM SUCESSO',3),(86,'14','JD BONFIM',1),(87,'588','JD BORDON',1),(88,'138','JD CAIMAN',6),(89,'517','JD CALIFORNIA',5),(90,'759','JD CAMPINA GRANDE',6),(91,'293','JD CAMPO BELO',5),(92,'789','JD CAMPO BELO II',5),(93,'402','JD CAMPO BELO III',5),(94,'21','JD CAMPO GRANDE',6),(95,'17','JD CAMPOS ELISEOS',1),(96,'19','JD CAPIVARI',1),(97,'734','JD CELESTE',1),(98,'163','JD CENTENARIO',3),(99,'129','JD CIDADE UNIVERSITARIA',5),(100,'296','JD COLUMBIA',5),(101,'297','JD CRISTINA',5),(102,'169','JD CURA D\'ARS',3),(103,'9','JD DAS BANDEIRAS',1),(104,'10','JD DAS BANDEIRAS II',1),(105,'37','JD DAS CEREJEIRA',3),(106,'38','JD DAS CEREJEIRAS',3),(107,'45','JD DO LAGO',1),(108,'374','JD DO LAGO CONT',3),(109,'754','JD DO LAGO I',1),(110,'233','JD DO TREVO',3),(111,'91','JD DO TREVO ( PARTE )',1),(112,'235','JD DO VALE',3),(113,'387','JD DOM BOSCO',1),(114,'1085','JD DOM GILBERTO',5),(115,'27','JD DOM NERY',1),(116,'941','JD DOM PAULO TARSO CAMPOS',3),(117,'170','JD DOM VIEIRA',1),(118,'622','JD DONA EMILIA',5),(119,'202','JD DOS OLIVEIRAS',3),(120,'202','JD DOS OLIVEIRAS  PARTE',3),(121,'70','JD DOS OLIVEIRAS CONT',3),(122,'172','JD ESMERALDINA',3),(123,'298','JD ESPLANADA',5),(124,'173','JD ESTORIL',3),(125,'299','JD FERNANDA',5),(126,'829','JD FERNANDA CONT',5),(127,'29','JD FLORENCE I',6),(128,'30','JD FLORENCE II',6),(129,'519','JD FORTUNATO',3),(130,'489','JD FRIBURGO',5),(131,'44','JD FUTURAMA',3),(132,'','JD GARCIA',1),(133,'','JD GARCIA CONT',1),(134,'300','JD GUAIANILA',5),(135,'301','JD HANGAR',5),(136,'','JD IBIRAPUERA',1),(137,'44','JD ICAR',3),(138,'33','JD INDIANOPOLIS',1),(139,'303','JD INTERLAND PAULISTA',5),(140,'304','JD INTERNACIONAL',5),(141,'37','JD IPAUSSURAMA',1),(142,'39','JD IPIRANGA',1),(143,'362','JD IRACI',3),(144,'520','JD IRAJA',3),(145,'343','JD IRMAOS SIGRIST',5),(146,'307','JD ITACOLOMY',5),(147,'305','JD ITAGUACU',5),(148,'306','JD ITAGUACU II',5),(149,'369','JD ITATINGA',5),(150,'191','JD LEONOR',3),(151,'964','JD LEONOR CONT',3),(152,'47','JD LILIZA',6),(153,'48','JD LISA',6),(154,'391','JD LISA II',6),(155,'50','JD LONDRES',1),(156,'720','JD LOURDES',1),(157,'193','JD MAISA',3),(158,'54','JD MARACANA',6),(159,'310','JD MARAJO',5),(160,'56','JD MARCIA',1),(161,'57','JD MARIA EUGENIA',1),(162,'313','JD MARIA HELENA',5),(163,'751','JD MARIA JOSE',5),(164,'309','JD MARIA ROSA',5),(165,'348','JD MARIALVA',6),(166,'522','JD MARINGA',6),(167,'499','JD MARISA',5),(168,'523','JD MARLENE',6),(169,'312','JD MELINA I',5),(170,'315','JD MERCEDES',5),(171,'58','JD METONOPOLIS',6),(172,'61','JD MIRANDA',1),(173,'36','JD MOEMA',5),(174,'918','JD MONTE CRISTO',3),(175,'347','JD MONTE LIBANO',3),(176,'314','JD MORUMBI',5),(177,'62','JD N SRA DE LOURDES',5),(178,'460','JD NOEMIA',3),(179,'430','JD NOVA ALIANCA',1),(180,'317','JD NOVA AMERICA',5),(181,'919','JD NOVA AMERICA II',5),(182,'678','JD NOVA ANCHIETA',1),(183,'483','JD NOVA ESPERANCA',6),(184,'461','JD NOVA ESPERANCA CONT',6),(185,'197','JD NOVA EUROPA',3),(186,'954','JD NOVA EUROPA CONT',3),(187,'316','JD NOVA MERCEDES',5),(188,'354','JD NOVA MORADA',1),(189,'18','JD NOVO C ELISEOS',1),(190,'481','JD NOVO IPAUSSURAMA',1),(191,'55','JD NOVO MARACANA',6),(192,'823','JD NOVO PLANALTO',5),(193,'583','JD NOVO SAO FERNANDO',3),(194,'198','JD NOVO SAO JOSE',3),(195,'599','JD NOVO SOL',5),(196,'201','JD OKITA',3),(197,'204','JD OURO BRANCO',3),(198,'1028','JD OURO PRETO',6),(199,'325','JD OURO VERDE',5),(200,'732','JD PALMEIRAS',5),(201,'525','JD PAMPULHA',6),(202,'326','JD PARAISO VIRACOPOS',5),(203,'67','JD PAULICEIA',1),(204,'524','JD PAULISTA',5),(205,'209','JD PAULISTANO',3),(206,'329','JD PETROPOLIS',5),(207,'210','JD PITA',3),(208,'327','JD PL VIRACOPOS',5),(209,'593','JD PL VIRACOPOS CONT',5),(210,'214','JD PRIMAVERA',3),(211,'212','JD PROENCA',3),(212,'953','JD PROENCA CONT',3),(213,'1086','JD PUCCAMP',5),(214,'595','JD QUATORZE BIS',5),(215,'74','JD REGINA',1),(216,'370','JD REPRESA',5),(217,'59','JD RES NOVO ANCHIETA II',1),(218,'9','JD ROSALIA III',1),(219,'873','JD ROSALINA',5),(220,'72','JD ROSEIRA',1),(221,'73','JD ROSSIN',6),(222,'336','JD S PEDRO VIRACOPOS',5),(223,'79','JD S RITA DE CASSIA',1),(224,'836','JD SAMAMBAIA',3),(225,'804','JD SAN DIEGO',5),(226,'85','JD SAO BENTO',1),(227,'82','JD SAO CAETANO',6),(228,'357','JD SAO CRISTOVAO',5),(229,'376','JD SAO DOMINGOS',5),(230,'372','JD SAO FRANCISCO',5),(231,'223','JD SAO GABRIEL',3),(232,'412','JD SAO JOAO',5),(233,'101','JD SAO JOAO / CAMPITUBA',5),(234,'511','JD SAO JOAQUIM',3),(235,'110','JD SAO JORGE',5),(236,'360','JD SAO JOSE',1),(237,'84','JD SAO JUDAS TADEU',6),(238,'603','JD SAO LOURENCO',3),(239,'226','JD SAO PEDRO',3),(240,'227','JD SAO VICENTE',3),(241,'340','JD SHANGAI',5),(242,'88','JD SOUZA QUEIROZ',1),(243,'75','JD STA AMALIA',1),(244,'77','JD STA CLARA',6),(245,'76','JD STA CRUZ',1),(246,'971','JD STA JUDITH',3),(247,'78','JD STA LUCIA',1),(248,'513','JD STA MARIA I',5),(249,'514','JD STA MARIA II',5),(250,'761','JD STA MARTA',1),(251,'200','JD STA ODILA',3),(252,'80','JD STA ROSA',6),(253,'333','JD STA TEREZINHA',5),(254,'81','JD STA VITORIA',1),(255,'89','JD STELLA',3),(256,'219','JD STO EXPEDITO',3),(257,'531','JD SUL AMERICA',6),(258,'741','JD TELESP',5),(259,'234','JD TUPI',3),(260,'571','JD TUPINAMBA',1),(261,'532','JD UMUARAMA',5),(262,'24','JD URUGUAI',6),(263,'338','JD VERA CRUZ',5),(264,'600','JD VISTA ALEGRE',5),(265,'97','JD YEDA',1),(266,'806','LONDRES',1),(267,'447','N FAV VL IPE',3),(268,'747','N H UNIAO DA VITORIA',5),(269,'429','N JD NOVO SOL',5),(270,'84','N N R VL SAO LUCAS',5),(271,'452','N NOVO PARQUE',5),(272,'417','N OSMAR VILACA',5),(273,'12','N RES 16 DE JANEIRO',5),(274,'760','N RES 28 DE FEVEREIRO',5),(275,'473','N RES AERO AEROPORTO',5),(276,'109','N RES AERO AEROPORTO II',5),(277,'718','N RES ALIANCA',1),(278,'834','N RES ARUANA',5),(279,'33','N RES BAIRRO DA CONQUI',3),(280,'679','N RES BAIRRO DA VITORIA',3),(281,'680','N RES BANDEIRAS II',1),(282,'881','N RES BARRA FUNDA',5),(283,'605','N RES CAMPINA GRANDE',6),(284,'924','N RES CARLOS MARIGHELA',5),(285,'141','N RES CHACARAS POETA',1),(286,'736','N RES CHICO MENDES',5),(287,'882','N RES CINCO DE MARCO',5),(288,'710','N RES CRISTO REDENTOR',1),(289,'687','N RES DA CONQUISTA',3),(290,'690','N RES DAS BANDEIRAS I',1),(291,'816','N RES DEZ DE MARCO',5),(292,'791','N RES DIC I',5),(293,'737','N RES DIC V DE MARCO',5),(294,'797','N RES DOIS DE JULHO',1),(295,'920','N RES ELDORADO DOS CARAJAS',5),(296,'925','N RES FILADELFIA',5),(297,'815','N RES ILHA DO LAGO',3),(298,'713','N RES IPORA',5),(299,'458','N RES JD AEROPORTO',5),(300,'707','N RES JD ALVORADA',1),(301,'686','N RES JD ANCHIETA',1),(302,'884','N RES JD BORDON',1),(303,'48','N RES JD CAMPINEIRO II',5),(304,'863','N RES JD CAMPO BELO I',5),(305,'814','N RES JD CANAA',3),(306,'423','N RES JD CAPIVARI',1),(307,'922','N RES JD DA PAZ',5),(308,'930','N RES JD DAS ANDORINHAS',3),(309,'691','N RES JD DAS BANDEIRAS',1),(310,'914','N RES JD DAS BANDEIRAS I',1),(311,'725','N RES JD DO LAGO',1),(312,'781','N RES JD DO LAGO II',3),(313,'898','N RES JD FLORENCE',6),(314,'740','N RES JD ICARAI',3),(315,'608','N RES JD IRMAOS SIGRIS',5),(316,'783','N RES JD LISA',6),(317,'793','N RES JD MARACANA',6),(318,'705','N RES JD MARIA HELENA',5),(319,'702','N RES JD MARIA ROSA',5),(320,'112','N RES JD MONTE ALTO',6),(321,'916','N RES JD N AMERICA II',5),(322,'870','N RES JD N SRA DE LOURDES',5),(323,'609','N RES JD NOVA AMERICA I',5),(324,'703','N RES JD NOVA AMERICA II',5),(325,'704','N RES JD NOVA AMERICA III',5),(326,'900','N RES JD NOVO ANCHIETA',1),(327,'799','N RES JD NOVO LONDRES',1),(328,'803','N RES JD NOVO MARACANA',6),(329,'840','N RES JD NOVO PLANALTO',5),(330,'901','N RES JD OURO VERDE',5),(331,'938','N RES JD OURO VERDE II PTE',5),(332,'433','N RES JD PALMARES',1),(333,'864','N RES JD PARAISO VIRACOPOS',5),(334,'706','N RES JD PAULICEIA I PARTE',1),(335,'876','N RES JD PAULICEIA II PARTE',1),(336,'902','N RES JD PRIMAVERA II',5),(337,'88','N RES JD ROSALINA',5),(338,'142','N RES JD ROSARIO',5),(339,'903','N RES JD ROSEIRA',1),(340,'932','N RES JD S FRANCISCO II',5),(341,'777','N RES JD S RITA DE CASSIA',1),(342,'215','N RES JD SAMAMBAIA',3),(343,'134','N RES JD SAO CHARBEL',5),(344,'752','N RES JD SAO CRISTOVAO',5),(345,'731','N RES JD SAO FERNANDO',3),(346,'892','N RES JD SAO JOSE',1),(347,'865','N RES JD SHANGAI',5),(348,'926','N RES JD STA CLARA',6),(349,'933','N RES JD STA CRUZ',1),(350,'879','N RES JD STA LUCIA',1),(351,'880','N RES JD STA MARTA',1),(352,'822','N RES JD STO ANTONIO',5),(353,'839','N RES JD STOS DUMONT II',5),(354,'534','N RES JD VISTA ALEGRE I',5),(355,'778','N RES JD YEDA',1),(356,'601','N RES JOSYARA',5),(357,'757','N RES LIBERDADE',1),(358,'866','N RES MAURO MARCONDES PTE 1',5),(359,'867','N RES MAURO MARCONDES PTE 2',5),(360,'464','N RES METONOPOLIS',6),(361,'869','N RES N SRA APARECIDA',5),(362,'724','N RES NOVA ESPERANCA',6),(363,'711','N RES NOVA REPUBLICA',1),(364,'730','N RES NOVO IPAUSSURAMA',1),(365,'130','N RES NOVO ORIENTE',6),(366,'871','N RES NOVO SAO FERNANDO',3),(367,'681','N RES NOVO SOL',5),(368,'894','N RES OSMAR VILACA',5),(369,'604','N RES PALMARES',1),(370,'696','N RES PLAN VIRACOPOS',5),(371,'895','N RES PQ CAMBORIU',1),(372,'923','N RES PQ DA AMIZADE',6),(373,'897','N RES PQ DAS FLORES',6),(374,'776','N RES PQ DAS INDUSTRIAS',5),(375,'896','N RES PQ DOM PEDRO II',5),(376,'45','N RES PQ FLORESTAL',6),(377,'685','N RES PQ SOCIAL',1),(378,'878','N RES PQ UNIAO',1),(379,'855','N RES PQ UNIVERSAL',1),(380,'26','N RES PQ UNIVERSAL I',1),(381,'60','N RES PQ UNIVERSAL II',1),(382,'712','N RES PQ UNIVERSITARIO',5),(383,'427','N RES PQ UNIVERSITARIO II',5),(384,'469','N RES PRINCESA',5),(385,'394','N RES PRINCESA D\'OESTE',6),(386,'536','N RES PROGRESSO',6),(387,'','N RES RECANTO DOS PASSAROS',1),(388,'849','N RES S PEDRO DE VIRACOPOS',5),(389,'395','N RES SAO JUDAS TADEU',6),(390,'851','N RES SAO LUIZ EDVALDO',1),(391,'692','N RES SAPUCAI',1),(392,'607','N RES STOS DUMONT',5),(393,'606','N RES TANCREDO NEVES',5),(394,'850','N RES TRES ESTRELAS',6),(395,'888','N RES UNIAO',5),(396,'846','N RES UNIAO POPULAR',6),(397,'535','N RES VISTA NOVA',5),(398,'841','N RES VL AEROPORTO',5),(399,'813','N RES VL CESAR',1),(400,'688','N RES VL FORMOSA',3),(401,'780','N RES VL FRANCISCA',1),(402,'772','N RES VL INDEPENDENCIA',1),(403,'890','N RES VL IPE',3),(404,'891','N RES VL LOURDES',1),(405,'833','N RES VL MARIA',1),(406,'31','N RES VL NILZA',5),(407,'762','N RES VL PALACIOS',1),(408,'729','N RES VL PRINCESA',5),(409,'915','N RES VL SAO GERALDO',1),(410,'868','N RES VL TODESCAN',5),(411,'385','N RES VL VITORIA',3),(412,'905','N RES VL VITORIA I',5),(413,'935','N RES VL VITORIA II',5),(414,'826','N RES ZUMBI DOS PALMARES',5),(415,'640','NOVA INDEPENDENCIA',1),(416,'641','NOVO RES D PEDRO II',5),(417,'211','PONTE PRETA',3),(418,'','PQ AEROPORTO VIRACOPOS',5),(419,'763','PQ ANHANGUERA',3),(420,'11','PQ BEATRIZ',1),(421,'99','PQ CAMBORIU',1),(422,'380','PQ CAMPINAS',1),(423,'295','PQ CANADA',5),(424,'643','PQ CARVALHO DE MOURA',3),(425,'538','PQ CENTENARIO',3),(426,'697','PQ CENTRAL',5),(427,'174','PQ DA FIGUEIRA',3),(428,'644','PQ DA FIGUEIRA II',3),(429,'356','PQ DA FLORESTA',6),(430,'150','PQ DAS AGUAS',3),(431,'1146','PQ DAS CACHOEIRAS',3),(432,'345','PQ DAS CAMELIAS',5),(433,'985','PQ DAS FLORES CONT',6),(434,'302','PQ DAS INDUSTRIAS',5),(435,'328','PQ DOM PEDRO II',5),(436,'147','PQ DOS CANTOS',3),(437,'165','PQ DOS CISNES',3),(438,'1055','PQ ELDORADO',5),(439,'','PQ EUCALIPTOS',1),(440,'35','PQ INDUSTRIAL',1),(441,'748','PQ INDUSTRIAL LISBOA',5),(442,'38','PQ IPIRANGA',1),(443,'42','PQ ITAJAI',6),(444,'43','PQ ITAJAI II',6),(445,'392','PQ ITAJAI III',6),(446,'393','PQ ITAJAI IV',6),(447,'40','PQ ITALIA',1),(448,'185','PQ JAMBEIRO',3),(449,'72','PQ JAMBEIRO PARTE 2',3),(450,'947','PQ JAMBEIRO PARTE I',3),(451,'318','PQ MONTREAL',5),(452,'917','PQ OZIEL',3),(453,'995','PQ PRADO',3),(454,'22','PQ R CAMPINA GRANDE',6),(455,'446','PQ RES VIDA NOVA',5),(456,'98','PQ RES VL UNIAO',1),(457,'468','PQ SAO MARTINHO',3),(458,'341','PQ SAO PAULO',5),(459,'92','PQ TROPICAL',1),(460,'335','PQ UNIVERSITARIO',5),(461,'968','PQ UNIVERSITARIO VIRACOPOS',5),(462,'957','PQ VALENCA',6),(463,'956','PQ VALENCA CONT',6),(464,'93','PQ VALENCA I',6),(465,'94','PQ VALENCA II',6),(466,'339','PQ VISTA ALEGRE',5),(467,'330','PROFILURB',5),(468,'331','RECANTO DO SOL I',5),(469,'332','RECANTO DO SOL II',5),(470,'527','RECREIO LEBLON',6),(471,'100','RES CAMPINA VERDE',5),(472,'20','RES CARVALHO DE MOURA',5),(473,'128','RES CITTA DI FIRENZI',5),(474,'1145','RES CITTA DI SALERNO',5),(475,'1093','RES COLINA DAS NASCENTES',6),(476,'114','RES COND RECANTO PASSAROS',5),(477,'802','RES COSMOS',6),(478,'927','RES COSMOS I',6),(479,'1124','RES FLAVIA',5),(480,'647','RES LEBLON',6),(481,'311','RES MAURO MARCONDES',5),(482,'977','RES NOVA BANDEIRANTE',5),(483,'837','RES NOVO MUNDO',6),(484,'1127','RES PORTO SEGURO',5),(485,'115','RES PQ CAMPINAS',5),(486,'1113','RES PQ DA FAZENDA',1),(487,'478','RES PQ VISTA ALEGRE',5),(488,'105','RES ROSARIO',5),(489,'874','RES SAO JOSE',5),(490,'931','RES SAO LUIZ',6),(491,'121','RES SIRIUS',6),(492,'358','SAO BERNARDO',1),(493,'83','SAO JOAO',1),(494,'515','SITIO SAO JOAO',1),(495,'41','SUB DIV JOSE ALMEIDA',1),(496,'87','SWISS PARK',3),(497,'937','TECHNO PARK',1),(498,'653','VIRACOPOS',5),(499,'1126','VL ABAETE',5),(500,'287','VL AEROPORTO',5),(501,'13','VL AEROPORTO 3 PARTE',5),(502,'144','VL ALBERTO SIMOES',3),(503,'5','VL ANGELA MARTA',1),(504,'546','VL ANHANGUERA',1),(505,'4','VL ANHANGUERA CONT',1),(506,'148','VL ANTONIO FRANCISCO',3),(507,'149','VL ANTONIO LOURENCO',3),(508,'466','VL ANTONIO VITORINO',1),(509,'8','VL AUROCAN',1),(510,'159','VL CAMPOS SALES',3),(511,'160','VL CARLITO',3),(512,'162','VL CARMINHA',3),(513,'','VL CASTELO BRANCO',1),(514,'550','VL CONGONHAS',5),(515,'549','VL CONSTANTINO',1),(516,'965','VL CURA D\'ARS',3),(517,'654','VL DA FAB',5),(518,'381','VL DAS PALMEIRAS',5),(519,'32','VL DISCOLA',1),(520,'553','VL DOM PAULO TARSO CAMPOS',3),(521,'677','VL DONA INACIA',1),(522,'171','VL ELZA',3),(523,'574','VL ESTADIOS',1),(524,'175','VL FORMOSA',3),(525,'176','VL GEORGINA',3),(526,'982','VL GEORGINA CONT',3),(527,'576','VL GUILHERME',1),(528,'577','VL HELENA',1),(529,'578','VL HORACIO TULLI',3),(530,'243','VL INDEPENDENCIA',1),(531,'34','VL INDUSTRIAL',1),(532,'180','VL INDUSTRIAL ( PARTE )',3),(533,'10','VL IZABEL',3),(534,'580','VL JEQUITIBAS',3),(535,'224','VL JOAO JORGE',3),(536,'979','VL JOAO MILANI',1),(537,'187','VL JOAQUIM INACIO',3),(538,'189','VL LEMOS 2 PARTE',3),(539,'192','VL LIDIA',3),(540,'49','VL LOURDES',1),(541,'51','VL LOVATO',1),(542,'59','VL MANOEL FERREIRA',1),(543,'838','VL MARIA',3),(544,'194','VL MARIETA',3),(545,'','VL MARTA',3),(546,'195','VL MEIRELES',3),(547,'60','VL MIMOSA',1),(548,'386','VL MINGONE',1),(549,'401','VL NILZA',5),(550,'65','VL PALACIOS',1),(551,'787','VL PALMEIRAS',5),(552,'991','VL PALMEIRAS CONT',5),(553,'206','VL PARAISO',3),(554,'561','VL PAULINO',1),(555,'','VL PE MANOEL NOBREGA',1),(556,'68','VL PERSEU L BARROS',1),(557,'69','VL POMPEIA',1),(558,'661','VL PRES DUTRA',1),(559,'375','VL PRINCESA',5),(560,'213','VL PROGRESSO',3),(561,'308','VL PROST SOUZA',5),(562,'563','VL RIALTO',1),(563,'71','VL RICA',1),(564,'662','VL RIO BRANCO',1),(565,'564','VL RODRIGUES',1),(566,'491','VL SALTINHO',3),(567,'19','VL SAN TIAGO',3),(568,'739','VL SANTANA',1),(569,'665','VL SAO BENTO',1),(570,'225','VL SAO PAULO',3),(571,'87','VL SATURNIA',1),(572,'566','VL SEGALIO',1),(573,'361','VL SETE QUEDAS',1),(574,'568','VL SOARES',1),(575,'569','VL STA ANGELA',1),(576,'200','VL STA ODILA',3),(577,'346','VL TANCREDO NEVES',5),(578,'671','VL TAVARES',3),(579,'570','VL TODESCAN',5),(580,'182','VL YPE',3),(581,'90','VL TEIXEIRA',1),(582,'109','CAMBUI',1);
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
  `id_tipo` int(11) DEFAULT NULL,
  `ativa` tinyint(1) DEFAULT '1',
  `id_membro_lider` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_equipes_1_idx` (`id_tipo`),
  KEY `fk_maxse_equipes_2_idx` (`id_membro_lider`),
  CONSTRAINT `fk_maxse_equipes_1` FOREIGN KEY (`id_tipo`) REFERENCES `maxse_tipos_de_equipe` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_equipes_2` FOREIGN KEY (`id_membro_lider`) REFERENCES `maxse_membros` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_equipes`
--

LOCK TABLES `maxse_equipes` WRITE;
/*!40000 ALTER TABLE `maxse_equipes` DISABLE KEYS */;
INSERT INTO `maxse_equipes` VALUES (23,'CBUQ 01 - Rui','CP01',1,1,352),(24,'Base 01 - Danilo','BS01',2,1,337),(25,'Mecanizada 1','MEC1',4,1,185),(26,'CBUQ 02 - Fábio','CP02',1,1,357),(27,'Base 03 - Marcos','BS03',2,1,341),(28,'Base 05 - Marcelo','BS05',2,1,344),(29,'Base 06 - Jaílson','BS06',2,1,348),(30,'PV, Guia, Sarjeta 01 - Eremilson','PV01',3,0,301),(31,'PV, Guia, Sarjeta 02 - Edson','PV02',3,1,307),(32,'PV, Guia, Sarjeta 03 - Roberto','PV03',3,1,311),(33,'CBUQ 03 - Mário','CP03',1,1,358),(34,'CBUQ 04 - Osvalmir','CP04',1,1,359),(35,'CBUQ 05 - Pacelli','CP05',1,1,360),(36,'CBUQ 06 - Erivânio','CP06',1,1,361);
/*!40000 ALTER TABLE `maxse_equipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_faixas_de_tipos_de_servicos`
--

DROP TABLE IF EXISTS `maxse_faixas_de_tipos_de_servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_faixas_de_tipos_de_servicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_de_servico` int(11) NOT NULL,
  `li` int(11) NOT NULL,
  `ls` int(11) DEFAULT NULL,
  `valor` decimal(10,2) NOT NULL,
  `label` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_faixas_de_tipos_de_servicos_1_idx` (`id_tipo_de_servico`),
  CONSTRAINT `fk_maxse_faixas_de_tipos_de_servicos_1` FOREIGN KEY (`id_tipo_de_servico`) REFERENCES `maxse_tipos_de_servico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_faixas_de_tipos_de_servicos`
--

LOCK TABLES `maxse_faixas_de_tipos_de_servicos` WRITE;
/*!40000 ALTER TABLE `maxse_faixas_de_tipos_de_servicos` DISABLE KEYS */;
INSERT INTO `maxse_faixas_de_tipos_de_servicos` VALUES (1,1,0,2,93.00,'37.1'),(2,1,2,7,90.00,'37.2'),(3,1,7,20,87.00,'37.3'),(4,1,20,40,86.00,'37.4'),(5,1,40,2000000000,85.00,'37.5'),(6,2,0,2,98.00,'4B.1'),(7,2,2,7,96.00,'4B.2'),(8,2,7,20,95.00,'4B.3'),(9,2,20,40,94.00,'4B.4'),(10,2,40,2000000000,93.00,'4B.5'),(11,3,0,7,53.00,'52.1'),(12,3,7,40,52.00,'52.2'),(13,3,40,160,51.00,'52.3'),(14,3,160,400,50.00,'52.4'),(15,3,400,2000000000,45.00,'52.5'),(16,4,0,2,150.00,'54.1'),(17,4,2,7,142.00,'54.2'),(18,4,7,20,122.00,'54.3'),(19,4,20,2000000000,112.00,'54.4'),(20,7,0,2,59.00,'56.1'),(21,7,2,7,55.00,'56.2'),(22,7,7,20,50.00,'56.3'),(23,7,20,2000000000,45.00,'56.4'),(24,8,0,2,59.00,'58.1'),(25,8,2,7,54.52,'58.2'),(26,8,7,20,50.00,'58.3'),(27,8,20,2000000000,45.00,'58.4'),(28,9,0,2,74.60,'88.1'),(29,9,2,7,65.00,'88.2'),(30,9,7,20,55.00,'88.3'),(31,9,20,2000000000,45.00,'88.4'),(32,10,0,2000000000,4.00,'FR.1'),(33,11,0,2000000000,265.00,'NV.1');
/*!40000 ALTER TABLE `maxse_faixas_de_tipos_de_servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_fechamentos`
--

DROP TABLE IF EXISTS `maxse_fechamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_fechamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inicio` date NOT NULL,
  `final` date NOT NULL,
  `faturamento_prev` decimal(15,2) DEFAULT NULL,
  `faturamento_real` decimal(15,2) DEFAULT NULL,
  `cmo` decimal(15,2) DEFAULT NULL,
  `cmp` decimal(15,2) DEFAULT NULL,
  `aberto` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_fechamentos`
--

LOCK TABLES `maxse_fechamentos` WRITE;
/*!40000 ALTER TABLE `maxse_fechamentos` DISABLE KEYS */;
INSERT INTO `maxse_fechamentos` VALUES (1,'2018-02-16','2018-03-15',NULL,NULL,NULL,NULL,NULL),(2,'2018-03-16','2018-04-15',NULL,NULL,NULL,NULL,NULL),(3,'2018-04-16','2018-05-15',NULL,NULL,NULL,NULL,NULL),(4,'2018-05-16','2018-06-15',NULL,NULL,NULL,NULL,NULL),(5,'2018-06-16','2018-07-15',NULL,NULL,NULL,NULL,NULL),(6,'2018-07-16','2018-08-15',NULL,NULL,NULL,NULL,NULL),(7,'2018-08-16','2018-09-15',NULL,NULL,0.00,NULL,0),(8,'2018-09-16','2018-10-15',NULL,NULL,NULL,NULL,1),(9,'2018-10-16','2018-11-15',0.00,0.00,0.00,NULL,0);
/*!40000 ALTER TABLE `maxse_fechamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_medidas_area`
--

DROP TABLE IF EXISTS `maxse_medidas_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_medidas_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `l` decimal(5,2) NOT NULL,
  `c` decimal(5,2) NOT NULL,
  `id_sse` int(11) NOT NULL,
  `tipo` enum('p','r','l') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_medidas_area_1_idx` (`id_sse`),
  CONSTRAINT `fk_maxse_medidas_area_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=651 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_area`
--

LOCK TABLES `maxse_medidas_area` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_area` DISABLE KEYS */;
INSERT INTO `maxse_medidas_area` VALUES (467,4.10,2.80,244,'p'),(468,7.50,1.70,245,'p'),(469,2.10,1.00,246,'p'),(470,1.00,2.10,246,'p'),(471,2.10,1.00,246,'p'),(472,2.10,1.00,246,'p'),(473,2.30,1.00,246,'p'),(474,2.50,1.00,246,'p'),(475,2.10,1.00,246,'p'),(476,2.10,1.00,246,'p'),(477,2.10,1.00,246,'p'),(478,2.10,1.00,246,'p'),(479,22.00,1.60,247,'p'),(480,3.80,2.70,248,'p'),(481,2.70,2.70,249,'p'),(482,1.00,1.00,250,'p'),(483,6.30,2.50,251,'p'),(484,3.00,2.00,252,'p'),(485,2.50,2.00,253,'p'),(486,3.20,2.40,254,'p'),(487,4.60,1.60,254,'p'),(488,5.50,2.20,255,'p'),(489,2.00,2.70,255,'p'),(490,3.00,2.50,256,'p'),(491,2.50,2.80,257,'p'),(492,4.00,2.70,257,'p'),(493,3.00,2.00,258,'p'),(494,7.50,2.70,259,'p'),(495,2.90,1.10,260,'p'),(496,4.00,3.00,261,'p'),(497,2.50,2.50,262,'p'),(498,3.50,2.20,263,'p'),(499,2.50,1.20,264,'p'),(500,2.00,2.00,264,'p'),(501,1.20,3.50,265,'p'),(502,6.00,6.20,266,'p'),(503,6.70,2.70,267,'p'),(504,2.20,8.00,268,'p'),(505,2.50,5.50,269,'p'),(506,7.30,2.30,270,'p'),(507,4.30,2.90,271,'p'),(508,3.10,2.50,272,'p'),(509,1.20,2.20,273,'p'),(510,1.80,1.60,274,'p'),(511,3.90,3.00,275,'p'),(512,2.90,2.15,276,'p'),(513,2.60,2.00,277,'p'),(514,1.50,2.00,277,'p'),(515,2.00,13.20,278,'p'),(516,5.10,3.20,279,'p'),(517,6.00,4.00,280,'p'),(518,4.00,3.50,281,'p'),(519,4.30,3.20,282,'p'),(520,4.80,3.40,283,'p'),(521,4.00,2.50,284,'p'),(522,4.00,2.50,285,'p'),(523,4.90,2.60,286,'p'),(524,1.70,1.00,287,'p'),(525,4.00,1.80,288,'p'),(526,4.00,2.50,289,'p'),(527,3.00,2.20,290,'p'),(528,3.00,1.60,291,'p'),(529,2.20,3.30,291,'p'),(530,1.60,3.70,292,'p'),(531,3.10,1.70,292,'p'),(532,2.80,2.10,293,'p'),(533,3.30,2.30,294,'p'),(534,2.50,1.30,294,'p'),(535,2.80,2.50,295,'p'),(536,5.50,2.00,295,'p'),(537,4.00,4.00,296,'p'),(538,10.00,2.00,296,'p'),(539,5.00,3.00,296,'p'),(540,4.30,3.20,282,'r'),(541,3.00,2.00,297,'p'),(543,3.80,3.70,301,'p'),(544,4.80,3.40,283,'r'),(545,1.80,2.60,302,'p'),(546,4.50,1.80,303,'p'),(547,3.20,2.50,304,'p'),(548,3.50,2.80,307,'p'),(549,2.20,2.00,308,'p'),(550,7.50,1.70,245,'r'),(551,4.00,2.50,285,'r'),(552,4.00,2.50,284,'r'),(553,4.10,2.80,244,'r'),(554,4.67,2.53,309,'p'),(555,4.00,2.50,289,'r'),(556,5.10,3.20,279,'r'),(557,2.50,2.80,257,'r'),(558,4.00,2.70,257,'r'),(559,4.00,1.80,288,'r'),(560,1.70,1.00,287,'r'),(561,2.80,2.10,293,'r'),(562,4.67,2.53,309,'r'),(563,22.00,1.60,247,'r'),(564,2.00,1.00,312,'p'),(587,2.00,1.00,312,'r'),(588,2.00,1.00,312,'l'),(599,20.01,1.00,309,'l'),(601,1.00,1.00,313,'r'),(602,1.00,1.00,313,'l'),(604,1.00,2.00,313,'r'),(605,1.00,2.00,313,'l'),(607,1.00,3.00,313,'r'),(608,1.00,3.00,313,'l'),(639,1.00,1.00,313,'p'),(640,1.00,2.00,313,'p'),(641,1.00,3.00,313,'p'),(642,5.00,6.00,314,'p'),(643,5.00,6.00,314,'r'),(644,5.00,6.00,314,'l'),(645,8.00,2.00,314,'p'),(646,8.00,2.00,314,'r'),(647,8.00,2.00,314,'l'),(648,1.00,5.00,315,'p'),(649,1.00,5.00,315,'r'),(650,1.00,5.00,315,'l');
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
  `v` decimal(5,2) NOT NULL,
  `id_sse` int(11) NOT NULL,
  `tipo` enum('p','r','l') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_medidas_linear_1_idx` (`id_sse`),
  CONSTRAINT `fk_maxse_medidas_linear_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_linear`
--

LOCK TABLES `maxse_medidas_linear` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_linear` DISABLE KEYS */;
INSERT INTO `maxse_medidas_linear` VALUES (48,1.80,299,'p'),(49,1.80,300,'p'),(50,1.50,305,'p'),(51,1.50,306,'p'),(52,1.00,310,'p');
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
  `n` int(11) NOT NULL,
  `id_sse` int(11) NOT NULL,
  `tipo` enum('p','r','l') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_medidas_unidades_1_idx` (`id_sse`),
  CONSTRAINT `fk_maxse_medidas_unidades_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_unidades`
--

LOCK TABLES `maxse_medidas_unidades` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_unidades` DISABLE KEYS */;
INSERT INTO `maxse_medidas_unidades` VALUES (4,1,298,'p');
/*!40000 ALTER TABLE `maxse_medidas_unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_membros`
--

DROP TABLE IF EXISTS `maxse_membros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_membros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salario` decimal(8,2) DEFAULT NULL,
  `id_equipe` int(11) DEFAULT NULL,
  `id_pessoa` int(11) NOT NULL,
  `id_tipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_membros_2_idx` (`id_equipe`),
  KEY `fk_maxse_membros_1_idx` (`id_pessoa`),
  KEY `fk_maxse_membros_3_idx` (`id_tipo`),
  CONSTRAINT `fk_maxse_membros_1` FOREIGN KEY (`id_pessoa`) REFERENCES `maxse_pessoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_maxse_membros_2` FOREIGN KEY (`id_equipe`) REFERENCES `maxse_equipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_membros_3` FOREIGN KEY (`id_tipo`) REFERENCES `maxse_tipos_de_membro` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=362 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_membros`
--

LOCK TABLES `maxse_membros` WRITE;
/*!40000 ALTER TABLE `maxse_membros` DISABLE KEYS */;
INSERT INTO `maxse_membros` VALUES (185,0.00,25,192,NULL),(301,1872.07,30,467,NULL),(302,1920.00,30,468,NULL),(303,1416.92,30,469,NULL),(304,1416.92,30,470,NULL),(305,1416.92,30,471,NULL),(306,1416.92,30,472,NULL),(307,1872.07,31,473,NULL),(308,1920.00,31,474,NULL),(309,1416.92,31,475,NULL),(310,1416.92,31,476,NULL),(311,1872.07,32,477,NULL),(312,1920.00,32,478,NULL),(313,1416.92,32,479,NULL),(314,1416.92,32,480,NULL),(337,1872.07,24,503,NULL),(338,1740.00,24,504,NULL),(339,1416.92,24,505,NULL),(340,1416.92,24,506,NULL),(341,1872.07,27,507,NULL),(342,1740.00,27,508,NULL),(343,1416.92,27,509,NULL),(344,1872.07,28,510,NULL),(345,1740.00,28,511,NULL),(346,1416.92,28,512,NULL),(347,1416.92,28,513,NULL),(348,1872.07,29,514,NULL),(349,1740.00,29,515,NULL),(350,1416.92,29,516,NULL),(351,1416.92,29,517,NULL),(352,1872.07,23,518,NULL),(353,1723.67,23,519,NULL),(354,1723.67,23,520,NULL),(355,1723.67,23,521,NULL),(356,1416.92,23,522,NULL),(357,1976.07,26,523,NULL),(358,1872.07,33,524,NULL),(359,1800.07,34,525,NULL),(360,1872.07,35,526,NULL),(361,2513.03,36,527,NULL);
/*!40000 ALTER TABLE `maxse_membros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_pessoas`
--

DROP TABLE IF EXISTS `maxse_pessoas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_pessoas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=530 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_pessoas`
--

LOCK TABLES `maxse_pessoas` WRITE;
/*!40000 ALTER TABLE `maxse_pessoas` DISABLE KEYS */;
INSERT INTO `maxse_pessoas` VALUES (1,'SÉRGIO MOURA','smouracalmon@gmail.com'),(185,'Registrador','registrador@teste.com'),(192,'Mecanilsson Oliveira','mecanilsson@teste.com'),(195,'Registrador Dois de Araújo','registrador2@teste.com'),(210,'Marcos José Moreira',''),(211,'Marcos José Moreira',''),(212,'Marcos José Moreira',''),(213,'Marcos José Moreira',''),(214,'Marcos José Moreira',''),(215,'Marcos José Moreira',''),(216,'Marcos José Moreira',''),(217,'Marcos José Moreira',''),(218,'Marcos José Moreira',''),(219,'Marcos José Moreira',''),(220,'Marcos Jose Moreira',''),(221,'Marcos Jose Moreira',''),(222,'Marcos',''),(223,'Marcos',''),(224,'Marcos',''),(225,'Marcos',''),(226,'Marcos',''),(227,'Marcos',''),(228,'Marcos',''),(229,'Marcos',''),(230,'Marcos',''),(231,'Marcos',''),(232,'MArcos',''),(233,'MArcos',''),(234,'MArcos',''),(235,'MArcos',''),(236,'MArcos',''),(237,'MArcos',''),(242,'Marcos',''),(243,'Marcos',''),(244,'Marcos',''),(245,'Marcos',''),(246,'Marcos',''),(247,'Marcos',''),(248,'Marcos',''),(249,'Marcos',''),(250,'Marcos',''),(251,'Marcos',''),(252,'Marcos',''),(253,'Marcos',''),(254,'Marcos',''),(255,'Marcos',''),(256,'Marcos',''),(257,'Marcos',''),(258,'Marcos',''),(259,'Marcos',''),(260,'Marcos',''),(269,'Marcos',''),(270,'Marcos',''),(271,'Marcos',''),(272,'Marcos',''),(273,'Marcos',''),(274,'Marcos',''),(275,'Marcos',''),(276,'Marcos',''),(277,'Marcos',''),(278,'Marcos',''),(279,'Marcos',''),(280,'Marcos',''),(281,'Marcos',''),(282,'Marcelo',''),(283,'Marcelo',''),(284,'Marcelo',''),(285,'Marcelo',''),(286,'Marcelo',''),(287,'Marcelo',''),(288,'Ruy',''),(289,'Ruy',''),(290,'Ruy',''),(291,'Ruy',''),(292,'Ruy',''),(293,'Ruy',''),(294,'Ruy',''),(295,'Ruy',''),(296,'Ruy',''),(297,'Ruy',''),(298,'Ruy',''),(317,'Programador','programador@acasamax.com.br'),(326,'Jailson Barbosa Pantoja',''),(327,'Jailson Barbosa Pantoja',''),(328,'Jailson Barbosa Pantoja',''),(329,'Jailson Barbosa Pantoja',''),(330,'Jailson Barbosa Pantoja',''),(331,'Jailson Barbosa Pantoja',''),(332,'Jailson Barbosa Pantoja',''),(333,'Jailson Barbosa Pantoja',''),(334,'Jailson Barbosa Pantoja',''),(335,'Jailson Barbosa Pantoja',''),(336,'Jailson Barbosa Pantoja',''),(337,'Jailson Barbosa Pantoja',''),(338,'Jailson Barbosa Pantoja',''),(339,'Jailson Barbosa Pantoja',''),(340,'Jailson Barbosa Pantoja',''),(341,'Jailson Barbosa Pantoja',''),(342,'Jailson Barbosa Pantoja',''),(343,'Jailson Barbosa Pantoja',''),(344,'Jailson Barbosa Pantoja',''),(345,'Jailson Barbosa Pantoja',''),(346,'Jailson Barbosa Pantoja',''),(347,'Jailson Barbosa Pantoja',''),(348,'Jailson Barbosa Pantoja',''),(349,'Jailson Barbosa Pantoja',''),(350,'Jailson Barbosa Pantoja',''),(351,'Jailson Barbosa Pantoja',''),(352,'Jailson Barbosa Pantoja',''),(353,'Jailson Barbosa Pantoja',''),(354,'Jailson Barbosa Pantoja',''),(355,'Jailson Barbosa Pantoja',''),(356,'Jailson Barbosa Pantoja',''),(357,'Jailson Barbosa Pantoja',''),(358,'Jailson Barbosa Pantoja',''),(359,'Jailson Barbosa Pantoja',''),(360,'Jailson Barbosa Pantoja',''),(361,'Jailson Barbosa Pantoja',''),(362,'Jailson Barbosa Pantoja',''),(363,'Jailson Barbosa Pantoja',''),(364,'Jailson Barbosa Pantoja',''),(365,'Jailson Barbosa Pantoja',''),(366,'Jailson Barbosa Pantoja',''),(367,'Jailson Barbosa Pantoja',''),(368,'Jailson Barbosa Pantoja',''),(369,'Jailson Barbosa Pantoja',''),(370,'Jailson Barbosa Pantoja',''),(371,'Jailson Barbosa Pantoja',''),(372,'Jailson Barbosa Pantoja',''),(373,'Jailson Barbosa Pantoja',''),(374,'Jailson Barbosa Pantoja',''),(375,'Jailson Barbosa Pantoja',''),(376,'Jailson Barbosa Pantoja',''),(377,'Jailson Barbosa Pantoja',''),(378,'Jailson Barbosa Pantoja',''),(394,'',''),(395,'Jailson',''),(396,'Jailson',''),(397,'Jailson',''),(398,'Jailson',''),(399,'Jailson','Motorista de Caminhão'),(400,'Jailson','Motorista de Caminhão'),(401,'Jailson','Motorista de Caminhão'),(402,'Jailson','Motorista de Caminhão'),(403,'Jailson','Motorista de Caminhão'),(404,'Jailson','Motorista de Caminhão'),(405,'Jailson','Motorista de Caminhão'),(406,'Jailson','Motorista de Caminhão'),(407,'Jailson','Motorista de Caminhão'),(408,'Jailson','Motorista de Caminhão'),(409,'Jailson','Motorista de Caminhão'),(410,'Jailson','Motorista de Caminhão'),(411,'Jailson','Motorista de Caminhão'),(412,'Jailson','Motorista de Caminhão'),(413,'Jailson','Motorista de Caminhão'),(414,'Jailson','Motorista de Caminhão'),(415,'Jailson','Motorista de Caminhão'),(416,'Jailson','Motorista de Caminhão'),(417,'Jailson','Motorista de Caminhão'),(418,'Jailson','Motorista de Caminhão'),(419,'Jailson','Motorista de Caminhão'),(420,'Jailson','Motorista de Caminhão'),(467,'Eremilson de Souza Campos','Motorista de Caminhão'),(468,'Emilio dos Santos','Pedreiro'),(469,'Irineu Euclides de Oliveira','Ajudante Geral'),(470,'Ronaldo Gomes Torres','Ajudante Geral'),(471,'Ritchely Luiz Alvarado','Ajudante Geral'),(472,'Cleiton Chrintian Santos de Lima','Ajudante Geral'),(473,'Edson da Silva Ferreira','Motorista de Caminhão'),(474,'José Ilson Silva','Pedreiro'),(475,'Ari Paganott dos Santos','Ajudante Geral'),(476,'Thiago de Jesus Pinto','Ajudante Geral'),(477,'José Roberto da Silva','roberto@acasamax.com.br'),(478,'Raimundo Nonato Leitão','Pedreiro'),(479,'Erisvelton Pereira de Melo','Ajudante Geral'),(480,'Ademilson da Silva Oliveira','Ajudante Geral'),(503,'Danilo Simões','sanasa@acasamax.com.br'),(504,'Josimar Farias Ferreira','Ajudante Líder'),(505,'Carlos Reginaldo Rosa','Ajudante Geral'),(506,'Givanildo da Silva','Ajudante Geral'),(507,'Marcos José Moreira','sanasa@acasamax.com.br'),(508,'Francisco das Chagas da Conceição','Ajudante Líder'),(509,'Robson José Jesus dos Santos','Ajudante Geral'),(510,'Marcelo Fabiano Carvalho Moreira','sanasa@acasamax.com.br'),(511,'Marcos Francisco Barbosa da Silva','Ajudante Líder'),(512,'Everson da Silva','Ajudante Geral'),(513,'Jefferson Bismack da Silva dos Santos','Ajudante Geral'),(514,'Jaílson Barbosa Pantoja','sanasa@acasamax.com.br'),(515,'Rafael Moreira Alves','Ajudante Líder'),(516,'Edinei Duarte Pinto','Ajudante Geral'),(517,'Felipe dos Santos Ferreira','Ajudante Geral'),(518,'Rui Mauricio da Silva','rui@acasamax.com.br'),(519,'Francisco Vieira da Silva','Rasteleiro'),(520,'José Macena da Silva','Rasteleiro'),(521,'José Roberto da Silva Bezerra','Rasteleiro'),(522,'Roberto Carlos de Oliveira','Ajudante Geral'),(523,'Fábio Alexandre Caputo','Motorista de Caminhão'),(524,'Mário Donizete Correa','Motorista de Caminhão'),(525,'Osvalmir Fernandes da Cunha','osvalmir@acasamax.com.br'),(526,'José Pacelli da Silva','Motorista de Caminhão'),(527,'Erivânio Manoel Batista','Op. Retroescavadeira'),(528,'André Cintra','custos@acasamax.com.br'),(529,'Wagner Sadao Katayose','operacaosn2@acasamax.com.br');
/*!40000 ALTER TABLE `maxse_pessoas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_produtos_utilizados_por_tdes`
--

DROP TABLE IF EXISTS `maxse_produtos_utilizados_por_tdes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_produtos_utilizados_por_tdes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produto` int(11) NOT NULL,
  `id_tde` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_produtos_utilizados_por_tdes_1_idx` (`id_tde`),
  KEY `fk_maxse_produtos_utilizados_por_tdes_2_idx` (`id_produto`),
  CONSTRAINT `fk_maxse_produtos_utilizados_por_tdes_1` FOREIGN KEY (`id_tde`) REFERENCES `maxse_tipos_de_equipe` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_produtos_utilizados_por_tdes_2` FOREIGN KEY (`id_produto`) REFERENCES `estoque_produtos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_produtos_utilizados_por_tdes`
--

LOCK TABLES `maxse_produtos_utilizados_por_tdes` WRITE;
/*!40000 ALTER TABLE `maxse_produtos_utilizados_por_tdes` DISABLE KEYS */;
INSERT INTO `maxse_produtos_utilizados_por_tdes` VALUES (1,3,2),(2,10,1);
/*!40000 ALTER TABLE `maxse_produtos_utilizados_por_tdes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_sse_status`
--

DROP TABLE IF EXISTS `maxse_sse_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_sse_status` (
  `id` tinyint(1) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_sse_status`
--

LOCK TABLES `maxse_sse_status` WRITE;
/*!40000 ALTER TABLE `maxse_sse_status` DISABLE KEYS */;
INSERT INTO `maxse_sse_status` VALUES (-100,'CANCELADA'),(-2,'RETRABALHO'),(-1,'DIVERGENTE'),(0,'CADASTRADA'),(1,'AGENDADA'),(2,'EXECUTANDO'),(3,'PENDENTE'),(100,'FINALIZADA');
/*!40000 ALTER TABLE `maxse_sse_status` ENABLE KEYS */;
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
  `id_bairro` int(11) NOT NULL,
  `numero` varchar(12) DEFAULT NULL,
  `id_tipo_de_servico` int(11) NOT NULL,
  `id_tipo_de_servico_r` int(11) DEFAULT NULL,
  `dh_registrado` datetime DEFAULT NULL,
  `dh_recebido` datetime DEFAULT NULL,
  `urgente` tinyint(4) NOT NULL,
  `obs` varchar(256) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `lat` decimal(11,7) DEFAULT NULL,
  `lng` decimal(11,7) DEFAULT NULL,
  `valor_prev` decimal(15,2) DEFAULT NULL,
  `valor_real` decimal(15,2) DEFAULT NULL,
  `valor_libe` decimal(15,2) DEFAULT NULL,
  `ini_retrabalho` datetime DEFAULT NULL,
  `fim_retrabalho` datetime DEFAULT NULL,
  `data_devolucao` date DEFAULT NULL,
  `prazo_final` date DEFAULT NULL,
  `finalizacao_parcial` tinyint(4) NOT NULL DEFAULT '0',
  `motivo_finalizacao_parcial` varchar(256) DEFAULT NULL,
  `id_fechamento` int(11) DEFAULT NULL,
  `cmo` decimal(15,2) DEFAULT NULL,
  `cmp` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_UNIQUE` (`numero`),
  KEY `fk_maxse_sses_1_idx` (`id_bairro`),
  KEY `fk_maxse_sses_2_idx` (`status`),
  KEY `fk_maxse_sses_3_idx` (`id_tipo_de_servico`),
  KEY `fk_maxse_sses_4_idx` (`id_tipo_de_servico_r`),
  CONSTRAINT `fk_maxse_sses_1` FOREIGN KEY (`id_bairro`) REFERENCES `maxse_bairros` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_sses_2` FOREIGN KEY (`status`) REFERENCES `maxse_sse_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_sses_3` FOREIGN KEY (`id_tipo_de_servico`) REFERENCES `maxse_tipos_de_servico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_sses_4` FOREIGN KEY (`id_tipo_de_servico_r`) REFERENCES `maxse_tipos_de_servico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_sses`
--

LOCK TABLES `maxse_sses` WRITE;
/*!40000 ALTER TABLE `maxse_sses` DISABLE KEYS */;
INSERT INTO `maxse_sses` VALUES (244,'Rua Maximiliano Weinlich, 34',247,'3692668',1,1,'2018-09-21 11:41:17','2018-09-13 10:00:00',0,'',3,-22.9403696,-47.1172817,998.76,998.76,1720.86,NULL,NULL,NULL,'2018-09-17',0,'',0,NULL,NULL),(245,'Rua Nilo Rezende Rubim, 35',69,'3693031',1,1,'2018-09-21 11:42:46','2018-09-14 10:00:00',0,NULL,3,-22.9407798,-47.0925569,1109.25,1109.25,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(246,'Avenida das Amoreiras, 5300',189,'3693061',2,NULL,'2018-09-21 11:46:21','2018-09-14 10:00:00',0,NULL,1,-22.9458964,-47.0980735,2030.40,2030.40,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(247,'Avenida das Amoreiras, 4990',189,'3693062',2,2,'2018-09-21 11:47:50','2018-09-14 10:00:00',0,NULL,2,-22.9432658,-47.0982089,3308.80,3308.80,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(248,'Rua Doutor Israel Martins, 45',456,'3693933',1,NULL,'2018-09-21 11:49:17','2018-09-17 10:00:00',0,NULL,0,-22.9497706,-47.1226783,892.62,892.62,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(249,'Rua Mineiros do Tiete, 635',557,'3694028',1,NULL,'2018-09-21 11:50:32','2018-09-17 10:00:00',0,NULL,0,-22.9275625,-47.0927726,634.23,634.23,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(250,'Rua General Lauro Sodre, 514',531,'3694043',1,NULL,'2018-09-21 11:52:04','2018-09-17 10:00:00',0,NULL,0,-22.9123777,-47.0769476,93.00,93.00,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(251,'Rua Itatiba, 513',189,'3694380',1,NULL,'2018-09-21 11:53:40','2018-09-18 10:00:00',0,NULL,0,-22.9343748,-47.0982951,1370.25,1370.25,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(252,'Rua Laranjal Paulista, 766',557,'3694714',1,NULL,'2018-09-21 11:54:42','2018-09-19 10:00:00',0,NULL,0,-22.9284595,-47.0860402,540.00,540.00,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(253,'Rua Arlindo Lucio da Silva, 125',442,'3695228',1,NULL,'2018-09-21 11:56:55','2018-09-20 10:00:00',0,'Reparo pela Rua Jose Ernesto dos Santos Filho - Dúvidas Natanael 98455-0827',0,-22.9499779,-47.1055405,450.00,450.00,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(254,'Rua Professora Amalia de Arruda L Martini, 621',108,'3692518',2,NULL,'2018-09-21 13:23:41','2018-09-13 10:00:00',0,'Alteração de metragem para 8,00 x 2,50 = 20,00 m² - Marcio ciente',0,-22.9509300,-47.0798974,1428.80,1428.80,1720.86,NULL,NULL,NULL,'2018-09-17',0,'',0,NULL,NULL),(255,'Rua Rodolfo Ribeiro, 156',448,'3693067',1,NULL,'2018-09-21 13:27:46','2018-09-14 10:00:00',0,'',1,-22.9614679,-47.0509875,1522.50,1522.50,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(256,'Avenida Francisco Glicerio, 1058',11,'3693127',2,NULL,'2018-09-21 13:28:53','2018-09-14 10:00:00',1,NULL,0,-22.9052415,-47.0593284,712.50,712.50,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(257,'Rua Celso de Barros, 213',174,'3693532',1,1,'2018-09-21 13:30:13','2018-09-17 10:00:00',0,NULL,3,-22.9389053,-47.0823249,1548.60,1548.60,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(258,'Avenida da Saudade, 869',417,'3694227',2,NULL,'2018-09-21 13:31:08','2018-09-18 10:00:00',1,NULL,0,-22.9206315,-47.0521062,576.00,576.00,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(259,'Rua Professora Nadir Leite do Canto, 40',174,'3694438',2,NULL,'2018-09-21 13:32:28','2018-09-18 10:00:00',0,NULL,0,-22.9360735,-47.0787857,1903.50,1903.50,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(260,'Rua Jose Ferreira da Silva, 385',427,'3695008',1,NULL,'2018-09-21 13:34:28','2018-09-19 10:00:00',0,NULL,1,-22.9428694,-47.0623125,287.10,287.10,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(261,'Rua Cristovao Bonini, 597',211,'3695306',1,NULL,'2018-09-21 13:37:10','2018-09-20 10:00:00',0,NULL,1,-22.9245947,-47.0411593,1044.00,1044.00,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(262,'Rua Gentil Ribeiro, 54',452,'7361188',1,NULL,'2018-09-21 13:38:14','2018-09-20 10:00:00',0,NULL,1,-22.9329252,-47.0738450,562.50,562.50,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(263,'Rua Mario Bassani, 206',240,'3695284',1,NULL,'2018-09-21 13:39:16','2018-09-20 10:00:00',1,NULL,1,-22.9471277,-47.0266319,669.90,669.90,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(264,'Rua Virginia Fontes da Silva Padilha, 35',479,'3693142',1,NULL,'2018-09-21 13:55:18','2018-09-14 10:00:00',0,'',0,-22.9724169,-47.1520672,630.00,630.00,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(265,'Rua Sarah Kubitschek de Oliveira, 87',455,'3693668',1,NULL,'2018-09-21 13:57:29','2018-09-17 10:00:00',0,NULL,0,-22.9746818,-47.1744092,378.00,378.00,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(266,'Rua Antonio Luchiari, 499',62,'3692347',2,NULL,'2018-09-21 13:59:12','2018-09-12 10:00:00',1,NULL,-100,-22.9893609,-47.1122654,3496.80,3496.80,1720.86,NULL,NULL,NULL,'2018-09-15',0,'',0,NULL,NULL),(267,'Rua Antonio Fernando Von Ah, 176',253,'3693259',1,NULL,'2018-09-21 14:05:44','2018-09-14 10:00:00',0,'',1,-22.9626672,-47.1120609,1573.83,1573.83,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(268,'Rua Apostal Sotir Tako, 35',126,'3693133',1,NULL,'2018-09-21 14:09:23','2018-09-14 10:00:00',0,NULL,1,-22.9079263,-47.0579599,1531.20,1531.20,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(269,'Rua Rogerio Garcia Sanches, 488',176,'3693502',2,NULL,'2018-09-21 14:15:08','2018-09-17 10:00:00',1,NULL,1,-22.9601373,-47.1177468,1306.25,1306.25,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(270,'Rua Anair Caetano Goncalves, 608',145,'3693903',2,NULL,'2018-09-21 14:16:31','2018-09-17 10:00:00',1,NULL,0,-23.0021703,-47.1025963,1595.05,1595.05,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(271,'Rua Manoella Marcolino da Silva Derigo, 65',482,'3694254',1,NULL,'2018-09-21 14:17:57','2018-09-18 10:00:00',0,NULL,0,-22.9860052,-47.1010718,1084.89,1084.89,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(272,'Rua Onze, 609',466,'3694431',1,NULL,'2018-09-21 14:19:07','2018-09-18 10:00:00',0,'N. Res. Eldorado dos Carajas',0,-22.9035038,-47.0681962,674.25,674.25,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(273,'Rua Cacilda Becker, 0 / Rua Zulmira de Souza Rodrigues, 0',467,'3694478',1,NULL,'2018-09-21 14:20:43','2018-09-18 10:00:00',0,'Proximo a Torre',0,-22.9798341,-47.1328700,237.60,237.60,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(274,'Rua Urupes, 75',435,'3694485',1,NULL,'2018-09-21 14:24:50','2018-09-18 10:00:00',0,'Formou buraco ao lado do PV, na rua lateral (Ant. 2/ Ibira - Portão do fundo) Asfalto afundando',0,-22.9766458,-47.1091676,259.20,259.20,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(275,'Rua Jose Gomes Oliveira Filho, 173',481,'3694782',1,NULL,'2018-09-21 14:25:47','2018-09-19 10:00:00',0,NULL,0,-22.9747816,-47.1689792,1017.90,1017.90,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(276,'Rua Itaocara, 31',435,'3695052',1,NULL,'2018-09-21 14:26:51','2018-09-19 10:00:00',0,NULL,0,-22.9735202,-47.1421943,561.15,561.15,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(277,'Rua Antonio Baracat, 36',479,'3695313',1,NULL,'2018-09-21 14:28:13','2018-09-20 10:00:00',0,NULL,0,-22.9727355,-47.1529362,713.40,713.40,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(278,'Avenida Marginal, 584',229,'7361183',2,NULL,'2018-09-21 14:29:58','2018-09-20 10:00:00',0,NULL,0,-23.0375089,-47.1077862,2481.60,2481.60,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(279,'Rua Roberto Antonio Manfredini Filho, 328',39,'3692439',2,2,'2018-09-21 14:34:45','2018-09-13 10:00:00',0,NULL,3,-22.9291192,-47.1533738,1550.40,1550.40,1720.86,NULL,NULL,NULL,'2018-09-17',0,'',0,NULL,NULL),(280,'Rua Professora Carolina de Oliveira, 5',39,'3692634',1,NULL,'2018-09-21 14:36:10','2018-09-13 10:00:00',0,NULL,1,-22.9415566,-47.1339962,2064.00,2064.00,1720.86,NULL,NULL,NULL,'2018-09-17',0,'',0,NULL,NULL),(281,'Avenida John Boyd Dunlop, 12500',244,'3693291',2,NULL,'2018-09-21 14:38:07','0208-09-14 10:06:00',0,'Em frente a Odontoclinic',0,-22.9353706,-47.1372705,1330.00,1330.00,1720.86,NULL,NULL,NULL,'0208-09-17',0,'',0,NULL,NULL),(282,'Rua Romeu Marinelli, 780',39,'7359389',1,1,'2018-09-21 14:39:11','2018-09-14 10:00:00',0,NULL,3,-22.9386521,-47.1295944,1197.12,1197.12,1720.86,NULL,NULL,NULL,'2018-09-18',0,'',0,NULL,NULL),(283,'Rua Fernando Padua Castro Mundt, 517',252,'3693693',1,1,'2018-09-21 14:40:30','2018-09-17 10:00:00',0,NULL,3,-22.9320584,-47.1842029,1419.84,1419.84,1720.86,NULL,NULL,NULL,'2018-09-20',0,'',0,NULL,NULL),(284,'Rua Rene Verinaud, 512',191,'3694161',1,1,'2018-09-21 14:44:15','2018-09-18 10:00:00',0,'',3,-22.9668866,-47.1671589,870.00,870.00,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(285,'Rua Rene Verinaud, 530',191,'3694163',1,1,'2018-09-21 14:45:21','2018-09-18 10:00:00',0,NULL,3,-22.9668866,-47.1671589,870.00,870.00,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(286,'Rua Expedicionario Horacio Carlos Teixeira, 25',477,'3694497',1,NULL,'2018-09-21 14:47:39','2018-09-18 10:00:00',0,NULL,1,-22.9468763,-47.1562705,1108.38,1108.38,1720.86,NULL,NULL,NULL,'2018-09-21',0,'',0,NULL,NULL),(287,'Rua Guilherme Fragoso Ferrao, 112',128,'3694797',1,1,'2018-09-21 14:48:53','2018-09-19 10:00:00',0,NULL,3,-22.9439330,-47.1644882,158.10,158.10,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(288,'Rua Celso Soares Couto, 366',443,'3694864',1,1,'2018-09-21 14:49:42','2018-09-19 10:00:00',0,NULL,3,-22.9616704,-47.1925358,626.40,626.40,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(289,'Rua General Carlos Coari Iracema Gomes, 202',39,'3694969',2,2,'2018-09-21 14:50:44','2019-09-19 10:00:00',0,NULL,3,-22.9309825,-47.1526972,950.00,950.00,1720.86,NULL,NULL,NULL,'2019-09-23',0,'',0,NULL,NULL),(290,'Rua Rio Capivari, 72',475,'3695002',1,NULL,'2018-09-21 14:51:52','2018-09-19 10:00:00',0,NULL,1,-23.0633559,-46.9829255,594.00,594.00,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(291,'Rua Expedicionario Horacio Carlos Teixeira, 33',477,'3695018',1,NULL,'2018-09-21 14:53:31','2018-09-19 10:00:00',0,NULL,0,-22.9467375,-47.1562533,1049.22,1049.22,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(292,'Rua Expedicionario Horacio CArlos Teixeira, 41',477,'3695021',1,NULL,'2018-09-21 14:55:19','2018-09-19 10:00:00',0,'',0,-22.9467412,-47.1564035,973.53,973.53,1720.86,NULL,NULL,NULL,'2018-09-22',0,'',0,NULL,NULL),(293,'Rua Osvaldo Gallerani, 494',39,'3695264',1,1,'2018-09-21 14:56:39','2018-09-20 10:00:00',0,NULL,3,-22.9471137,-47.1338594,529.20,529.20,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(294,'Rua Expedicionario Horacio Carlos Teixeira, 47',477,'3695265',1,NULL,'2018-09-21 15:02:58','2018-09-20 10:00:00',0,'',0,-22.9468067,-47.1560736,943.08,943.08,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(295,'Rua Antonio Augusto Vianna, 43',237,'3695266',1,NULL,'2018-09-21 15:04:15','2018-09-20 10:00:00',0,NULL,0,-22.9484356,-47.1368669,1566.00,1566.00,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(296,'Rua Rodolfo Favalli, 152',432,'3693363',1,1,'2018-09-22 09:00:55','2018-09-15 10:00:00',0,'',1,-22.9824353,-47.0925282,4335.00,4335.00,1720.86,NULL,NULL,NULL,'2018-09-19',0,'',0,NULL,NULL),(297,'Avenida Brasilia, 132',556,'3695509',2,NULL,'2018-09-24 10:25:47','2018-09-21 10:00:00',1,'',0,-22.9309127,-47.1142691,576.00,576.00,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(298,'Rua Ibitinga, 437',535,'3695583',11,NULL,'2018-09-24 10:27:13','2018-09-21 10:00:00',1,NULL,0,-22.9214509,-47.0603256,265.00,265.00,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(299,'Rua Tres, 58',436,'3695603',7,NULL,'2018-09-24 10:28:41','2018-09-21 10:00:00',0,NULL,0,-22.8352313,-47.0937089,106.20,106.20,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(300,'Rua Tres, 58',436,'3695604',8,NULL,'2018-09-24 10:35:28','2018-09-21 10:00:00',0,'',0,-22.8352313,-47.0937089,106.20,106.20,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(301,'Rua Tres, 58',436,'3695605',1,NULL,'2018-09-24 10:38:54','2018-09-21 10:00:00',0,'',0,-22.8352313,-47.0937089,1223.22,1223.22,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(302,'Rua Sem Denominacao, 108',496,'3695649',1,NULL,'2018-09-24 10:47:35','2018-09-21 10:00:00',0,'',0,-22.7970360,-47.4706560,421.20,421.20,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(303,'Rua Kikuo Motoyama, 2',62,'3695611',1,NULL,'2018-09-24 10:52:31','2018-09-21 10:00:00',0,'',0,-22.9861459,-47.1310781,704.70,704.70,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(304,'Rua  Jacana, 654',500,'3695615',1,NULL,'2018-09-24 10:55:55','2018-09-21 10:00:00',0,'',0,-22.9697031,-47.1314973,696.00,696.00,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(305,'R. Jacana, 654',500,'3695616',7,NULL,'2018-09-24 11:01:10','2018-09-21 10:00:00',0,'',0,-22.9697031,-47.1314973,88.50,88.50,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(306,'Rua Jacana, 654',500,'3695617',8,NULL,'2018-09-24 11:08:07','2018-09-21 10:00:00',0,'',0,-22.9697031,-47.1314973,88.50,88.50,1720.86,NULL,NULL,NULL,'2018-09-24',0,'',0,NULL,NULL),(307,'Rua Dezessete, 12',70,'3695624',1,NULL,'2018-09-24 11:12:23','2018-09-21 10:00:00',0,'N. Res. N. Sra. Aparecida',0,-22.9915967,-47.1229455,852.60,852.60,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(308,'Rua Arnaldo Machado Florence, 135',47,'3695541',1,NULL,'2018-09-24 11:15:15','2018-09-21 10:00:00',0,'',1,-22.9601572,-47.1978250,396.00,396.00,1720.86,NULL,NULL,NULL,'2018-09-25',0,'',0,NULL,NULL),(309,'Rua Expedicionario Horacio Carlos Teixeira, 53',477,'3695555',1,1,'2018-09-24 15:08:23','2018-09-21 10:00:00',0,'',100,-22.9467165,-47.1563311,1000.50,1027.91,1720.86,NULL,NULL,'2018-10-08','2018-09-25',0,NULL,8,3222.96,44.31),(310,'Av Alberto Sarmento, 500',8,'9999999',7,NULL,'2018-09-26 07:17:55','2018-09-25 10:00:00',0,'teste',-100,-22.8956673,-47.0795070,59.00,59.00,1720.86,NULL,NULL,NULL,'2018-09-27',0,'',0,NULL,NULL),(312,'R José ramos catarino, 235, Parque tropical',8,'9999998',2,2,'2018-10-07 08:20:08','2018-10-07 10:00:00',0,'Teste! Ação!',100,-22.9347384,-47.1164279,196.00,196.00,1720.86,NULL,NULL,'2018-10-08','2018-10-11',0,NULL,8,3222.96,10.00),(313,'Av Brasil, 500',8,'9999997',1,NULL,'2018-10-09 12:29:35','2018-10-08 15:15:00',0,'teste',0,-22.8902529,-47.0637006,540.00,540.00,540.00,NULL,NULL,NULL,'2018-10-11',0,NULL,NULL,NULL,NULL),(314,'Av Brasil, n 500',8,'9999996',1,NULL,'2018-10-09 12:52:12','2018-10-09 18:00:00',0,'Testtre',0,-22.8902529,-47.0637006,3910.00,3910.00,3910.00,NULL,NULL,NULL,'2018-10-12',0,NULL,NULL,NULL,NULL),(315,'Av Brasil, 1000',8,'9999995',2,NULL,'2018-10-09 13:26:22','2018-10-09 12:00:00',0,'Teste',0,-22.8870154,-47.0673498,480.00,480.00,480.00,NULL,NULL,NULL,'2018-10-12',0,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `maxse_sses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_tarefas`
--

DROP TABLE IF EXISTS `maxse_tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_tarefas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_sse` int(11) NOT NULL,
  `id_equipe` int(11) NOT NULL,
  `id_apoio` int(11) DEFAULT NULL,
  `inicio_p` datetime NOT NULL,
  `final_p` datetime NOT NULL,
  `inicio_r` datetime DEFAULT NULL,
  `final_r` datetime DEFAULT NULL,
  `divergente` tinyint(1) NOT NULL DEFAULT '0',
  `autorizadaPor` varchar(45) DEFAULT NULL,
  `obs_ini` text,
  `obs_fim` text,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_tarefas_1_idx` (`id_sse`),
  KEY `fk_maxse_tarefas_2_idx` (`id_equipe`),
  KEY `fk_maxse_tarefas_3_idx` (`id_apoio`),
  CONSTRAINT `fk_maxse_tarefas_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_tarefas_2` FOREIGN KEY (`id_equipe`) REFERENCES `maxse_equipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_tarefas_3` FOREIGN KEY (`id_apoio`) REFERENCES `maxse_equipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_tarefas`
--

LOCK TABLES `maxse_tarefas` WRITE;
/*!40000 ALTER TABLE `maxse_tarefas` DISABLE KEYS */;
INSERT INTO `maxse_tarefas` VALUES (142,244,24,NULL,'2018-09-24 08:00:00','2018-09-24 08:40:00','2018-09-24 17:41:00','2018-09-24 15:14:11',0,NULL,NULL,NULL),(143,245,24,NULL,'2018-09-24 08:41:00','2018-09-24 09:30:00','2018-09-24 16:12:00','2018-09-24 14:15:27',0,NULL,NULL,NULL),(144,296,28,NULL,'2018-09-24 10:00:00','2018-09-24 11:00:00',NULL,NULL,0,NULL,'Trabalho',NULL),(146,282,29,NULL,'2018-09-24 09:00:00','2018-09-24 09:59:00','2018-09-24 12:29:00','2018-09-24 10:17:05',0,NULL,'Inicio','Finalizado, sem entulho .'),(147,283,29,NULL,'2018-09-24 10:00:00','2018-09-24 10:59:00','2018-09-24 13:44:00','2018-09-24 11:42:32',0,NULL,'Inicial.','Finalizado.'),(148,284,29,NULL,'2018-09-24 11:00:00','2018-09-24 11:59:00','2018-09-24 16:55:00','2018-09-24 14:21:03',0,NULL,'Inicio.','Finalizado, sem entulho!!'),(149,255,27,NULL,'2018-09-24 09:00:00','2018-09-24 09:59:00',NULL,NULL,0,NULL,NULL,NULL),(150,257,27,NULL,'2018-09-24 10:00:00','2018-09-24 10:59:00','2018-09-25 13:17:00','2018-09-25 11:42:26',0,NULL,'Base','Ok'),(151,267,28,NULL,'2018-09-24 12:00:00','2018-09-24 12:59:00',NULL,NULL,0,NULL,NULL,NULL),(152,268,28,NULL,'2018-09-24 13:00:00','2018-09-24 13:59:00',NULL,NULL,0,NULL,NULL,NULL),(153,269,28,NULL,'2018-09-24 14:00:00','2018-09-24 14:59:00',NULL,NULL,0,NULL,NULL,NULL),(154,285,29,NULL,'2018-09-24 14:00:00','2018-09-24 14:59:00','2018-09-24 16:30:00','2018-09-24 13:54:35',0,NULL,'Inicio.','Finalizado, sem entulho.'),(155,246,24,NULL,'2018-09-25 08:00:00','2018-09-25 08:59:00',NULL,NULL,0,NULL,NULL,NULL),(156,247,24,NULL,'2018-09-25 09:00:00','2018-09-25 09:59:00','2018-10-05 16:45:00',NULL,0,NULL,NULL,NULL),(157,279,29,NULL,'2018-09-25 08:00:00','2018-09-25 08:59:00','2018-09-25 12:37:00','2018-09-25 10:38:12',0,NULL,'Inicio.','Final.'),(158,280,29,NULL,'2018-09-25 09:00:00','2018-09-25 09:59:00',NULL,NULL,0,NULL,NULL,NULL),(159,286,29,NULL,'2018-09-25 10:00:00','2018-09-25 10:59:00',NULL,NULL,0,NULL,NULL,NULL),(160,287,29,NULL,'2018-09-25 11:00:00','2018-09-25 11:59:00','2018-09-25 16:07:00','2018-09-25 13:24:51',0,NULL,'Inicio.','Final.'),(161,288,29,NULL,'2018-09-25 12:00:00','2018-09-25 12:59:00','2018-09-25 13:58:00','2018-09-25 11:34:59',0,NULL,'Inicio.','Final.'),(162,289,29,NULL,'2018-09-25 13:00:00','2018-09-25 13:59:00','2018-09-25 11:46:00','2018-09-25 09:30:48',0,NULL,'Inicio.','Finalizado.'),(163,260,27,NULL,'2018-09-25 08:00:00','2018-09-25 08:59:00',NULL,NULL,0,NULL,NULL,NULL),(164,261,27,NULL,'2018-09-25 09:00:00','2018-09-25 09:59:00',NULL,NULL,0,NULL,NULL,NULL),(165,262,27,NULL,'2018-09-25 10:00:00','2018-09-25 10:59:00',NULL,NULL,0,NULL,NULL,NULL),(166,263,27,NULL,'2018-09-25 11:00:00','2018-09-25 11:59:00',NULL,NULL,0,NULL,NULL,NULL),(167,290,29,NULL,'2018-09-25 14:10:00','2018-09-25 14:59:00',NULL,NULL,0,NULL,NULL,NULL),(168,293,29,NULL,'2018-09-25 15:00:00','2018-09-25 15:59:00','2018-09-25 17:17:00','2018-09-25 15:09:31',0,NULL,'Inicio.','Finalizado.'),(169,309,24,NULL,'2018-10-04 17:00:00','2018-10-04 18:00:00','2018-10-05 16:31:00','2018-10-05 16:32:43',0,NULL,NULL,NULL),(173,308,27,NULL,'2018-10-04 17:30:00','2018-10-04 18:00:00',NULL,NULL,0,NULL,NULL,NULL),(174,312,24,NULL,'2018-10-07 10:00:00','2018-10-07 11:00:00','2018-10-07 12:39:00','2018-10-07 12:39:43',0,NULL,NULL,'Teste');
/*!40000 ALTER TABLE `maxse_tarefas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `maxse_tarefas_BEFORE_INSERT` BEFORE INSERT ON `maxse_tarefas`
 FOR EACH ROW BEGIN
	DECLARE sse_status INT;
	SELECT status into sse_status from maxse_sses where id=NEW.id_sse;
	IF sse_status = sseStatus('FINALIZADA') THEN
		SIGNAL SQLSTATE '45000'	SET MESSAGE_TEXT = 'Não é possível agendar tarefa para SSE finalizada.';
    END IF;
    IF sse_status = sseStatus('CANCELADA') THEN
		SIGNAL SQLSTATE '45000'	SET MESSAGE_TEXT = 'Não é possível agendar tarefa para SSE cancelada.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `maxse_tarefas_AFTER_INSERT` AFTER INSERT ON `maxse_tarefas`
 FOR EACH ROW BEGIN
	DECLARE sse_status int;
    SELECT status INTO sse_status FROM maxse_sses WHERE id=NEW.id_sse;
    
    IF sse_status = sseStatus('CADASTRADA') THEN
		UPDATE maxse_sses SET status=sseStatus('AGENDADA') WHERE id=NEW.id_sse;
    END IF;
    IF sse_status = sseStatus('PENDENTE') THEN
		UPDATE maxse_sses SET status=sseStatus('AGENDADA') WHERE id=NEW.id_sse;
    END IF;
    IF sse_status = sseStatus('RETRABALHO') THEN
		UPDATE maxse_sses SET status=sseStatus('AGENDADA') WHERE id=NEW.id_sse;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary table structure for view `maxse_tarefas_v`
--

DROP TABLE IF EXISTS `maxse_tarefas_v`;
/*!50001 DROP VIEW IF EXISTS `maxse_tarefas_v`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `maxse_tarefas_v` AS SELECT 
 1 AS `id`,
 1 AS `id_sse`,
 1 AS `id_equipe`,
 1 AS `id_apoio`,
 1 AS `inicio_p`,
 1 AS `final_p`,
 1 AS `inicio_r`,
 1 AS `final_r`,
 1 AS `divergente`,
 1 AS `status`*/;
SET character_set_client = @saved_cs_client;

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
INSERT INTO `maxse_tipos_de_equipe` VALUES (4,'Apoio'),(2,'Base'),(1,'Capa'),(3,'PVs, Guias e Sarjetas');
/*!40000 ALTER TABLE `maxse_tipos_de_equipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_tipos_de_membro`
--

DROP TABLE IF EXISTS `maxse_tipos_de_membro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_tipos_de_membro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_tipos_de_membro`
--

LOCK TABLES `maxse_tipos_de_membro` WRITE;
/*!40000 ALTER TABLE `maxse_tipos_de_membro` DISABLE KEYS */;
INSERT INTO `maxse_tipos_de_membro` VALUES (1,'Ajudante Geral'),(2,'Ajudante Líder'),(3,'Motorista de Caminhão'),(4,'Op. Retroescavadeira'),(5,'Pedreiro'),(6,'Rasteleiro');
/*!40000 ALTER TABLE `maxse_tipos_de_membro` ENABLE KEYS */;
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
INSERT INTO `maxse_tipos_de_servico` VALUES (1,'37','A',3.5,'Construção e/ou recuperação de pavimento asfáltico espessura 20cm','a'),(2,'4B','B',3.5,'Construção e/ou recuperação de pavimento asfáltico espessura 28 cm','a'),(3,'52','C',3.5,'Recapeamento de pavimento','a'),(4,'54','D',3.5,'Construção de pavimento em paralelepípedo','a'),(7,'56','G',2.5,'Construção e/ou recuperação de guias','l'),(8,'58','H',2.5,'Construção e/ou recuperação de sarjetas','l'),(9,'88','E',3.5,'Recuperação (nivelamento) de pavimento em paralelepípedo','a'),(10,'FR','I',7.0,'Fresagem contínua de pavimento a frio','a'),(11,'NV','F',3.5,'Nivelamento de poços de visita ou caixas de registro na via','u');
/*!40000 ALTER TABLE `maxse_tipos_de_servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxse_tipos_de_servico_x_produtos`
--

DROP TABLE IF EXISTS `maxse_tipos_de_servico_x_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maxse_tipos_de_servico_x_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `qtde_por_unidade_de_trab` decimal(15,6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maxse_tipos_de_servico_x_produtos_1_idx` (`id_tipo`),
  KEY `fk_maxse_tipos_de_servico_x_produtos_2_idx` (`id_produto`),
  CONSTRAINT `fk_maxse_tipos_de_servico_x_produtos_1` FOREIGN KEY (`id_tipo`) REFERENCES `maxse_tipos_de_servico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_maxse_tipos_de_servico_x_produtos_2` FOREIGN KEY (`id_produto`) REFERENCES `estoque_produtos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_tipos_de_servico_x_produtos`
--

LOCK TABLES `maxse_tipos_de_servico_x_produtos` WRITE;
/*!40000 ALTER TABLE `maxse_tipos_de_servico_x_produtos` DISABLE KEYS */;
INSERT INTO `maxse_tipos_de_servico_x_produtos` VALUES (1,1,3,0.150000),(2,1,10,0.120000),(3,2,3,0.200000),(4,2,10,0.192000),(5,3,10,0.072000),(6,11,10,0.273270);
/*!40000 ALTER TABLE `maxse_tipos_de_servico_x_produtos` ENABLE KEYS */;
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
  `token` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `validade_do_token` datetime DEFAULT NULL,
  `acessoApp` tinyint(1) NOT NULL DEFAULT '0',
  `acessoWeb` tinyint(1) NOT NULL DEFAULT '0',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `id_pessoa` int(11) NOT NULL,
  `perm_dados_financeiros` tinyint(4) NOT NULL DEFAULT '0',
  `perm_tela_fechamentos` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_maxse_usuarios_1_idx` (`id_pessoa`),
  CONSTRAINT `fk_maxse_usuarios_1` FOREIGN KEY (`id_pessoa`) REFERENCES `maxse_pessoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_usuarios`
--

LOCK TABLES `maxse_usuarios` WRITE;
/*!40000 ALTER TABLE `maxse_usuarios` DISABLE KEYS */;
INSERT INTO `maxse_usuarios` VALUES (1,'root','$1$gmbfYvmh$.ZApczm94NzffSYmQt6mE0','5bbdc8aa3810a8.58666686','2018-10-10 07:38:50',1,1,1,1,1,1),(79,'registrador','$1$eV1UyioP$lmn/z4rxqoh8BlRKbdZwa0','5bbdc83b27a284.63858084','2018-10-10 07:36:59',1,1,1,185,0,0),(83,'meca','$1$Ge2AW7uC$6Bb8hHxR5cL0y/i.JeBkW/',NULL,NULL,2,0,1,192,0,0),(85,'registrador22',NULL,NULL,NULL,1,0,1,195,0,0),(180,'programador','$1$LswGfmTh$Wn.rNQYeWiYnip4q1rQOK1','5ba51f61556f54.43419390','2018-09-21 14:42:09',0,1,1,317,0,0),(286,'eremilson','$1$8ot/kUpm$ZCM7OccLmD9rmO0ssdZmB/',NULL,NULL,2,0,1,467,0,0),(287,'edson','$1$WQsUXpTf$fic5iV.tCNf6FS151nJBz.',NULL,NULL,0,1,1,473,0,0),(288,'roberto','$1$MgWEu9Jo$L11gn6jt9AzQh.lnIP.yJ0','5ba2aa21b37424.24450800','2018-09-19 17:57:21',2,0,1,477,0,0),(299,'danilo','$1$H44CSd./$QeS846hVlkEfdi384BqXB/','5bbdc7bb254464.07176836','2018-10-10 07:34:51',2,0,1,503,0,0),(300,'marcos','$1$2XfT..BR$3QOO.6hi76F8uTrWvHpSf/','5baa493d7d3460.21469404','2018-09-25 12:42:05',2,0,1,507,0,0),(301,'marcelo','$1$tnJpyb5X$Tux3KneJD9rMa4tn125jU1','5bab920208edc3.90021641','2018-09-26 12:04:50',2,0,1,510,0,0),(302,'jailson','$1$aolYRajW$kQr2CW0vsMa7d8t1C5Hyz1','5baa87e82d0412.21124758','2018-09-25 17:09:28',2,0,1,514,0,0),(303,'rui','$1$pgF9natg$AEpCYQlh6b9GcqPRymOxA/','5ba29e9fd482a3.55236479','2018-09-19 17:08:15',2,0,1,518,0,0),(304,'fabio','$1$wZSp24yk$RvuYxgJj0U7Un9KYVQ2hD0',NULL,NULL,2,0,1,523,0,0),(305,'mario','$1$CDR6h23o$6PYvCI2192ngJvJ6Y2.ub1',NULL,NULL,2,0,1,524,0,0),(306,'osvalmir','$1$pMz4JS7z$wJE.Ge/Sw49VEHV7b6v2o0','5ba3847c7ccfa0.02061842','2018-09-20 09:29:00',2,0,1,525,0,0),(307,'pacelli','$1$uSy/AcfY$m7WoMWC.5pLIpScoj51hI/',NULL,NULL,2,0,1,526,0,0),(308,'erivanio','$1$P1glRzbB$CCwylN.DBNmgQJkhFBosq/',NULL,NULL,2,0,1,527,0,0),(309,'andre','$1$.dd3xf7W$3cppCrTBZv/xP8ydpAJEe0','5bae6369660cf9.24337882','2018-09-28 15:22:49',1,1,1,528,1,1),(310,'wagner','$1$D3.EP9wt$g/ixyZPLatsltCtzxFciy1','5baa91241dac00.28016114','2018-09-25 17:48:52',1,1,1,529,1,1);
/*!40000 ALTER TABLE `maxse_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'maxse000'
--
/*!50003 DROP FUNCTION IF EXISTS `sseStatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `sseStatus`(nome_do_status varchar(45)) RETURNS int(11)
BEGIN
	DECLARE id_status int;
    SELECT id INTO id_status FROM maxse_sse_status WHERE UPPER(nome) = UPPER(nome_do_status);
	RETURN id_status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `maxse_tarefas_v`
--

/*!50001 DROP VIEW IF EXISTS `maxse_tarefas_v`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `maxse_tarefas_v` AS select `maxse_tarefas`.`id` AS `id`,`maxse_tarefas`.`id_sse` AS `id_sse`,`maxse_tarefas`.`id_equipe` AS `id_equipe`,`maxse_tarefas`.`id_apoio` AS `id_apoio`,`maxse_tarefas`.`inicio_p` AS `inicio_p`,`maxse_tarefas`.`final_p` AS `final_p`,`maxse_tarefas`.`inicio_r` AS `inicio_r`,`maxse_tarefas`.`final_r` AS `final_r`,`maxse_tarefas`.`divergente` AS `divergente`,if(`maxse_tarefas`.`divergente`,5,if(isnull(`maxse_tarefas`.`inicio_r`),1,if(isnull(`maxse_tarefas`.`final_r`),2,3))) AS `status` from `maxse_tarefas` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-10  6:40:58
