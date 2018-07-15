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
) ENGINE=InnoDB AUTO_INCREMENT=583 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_bairros`
--

LOCK TABLES `maxse_bairros` WRITE;
/*!40000 ALTER TABLE `maxse_bairros` DISABLE KEYS */;
INSERT INTO `maxse_bairros` VALUES (1,'413','AEROPORTO VIRACOPOS',5),(2,'946','ALTO DO JD IPAUSSURAMA',6),(3,'940','ALTO JD IPAUSSURAMA',1),(4,'344','BACURI',5),(5,'155','BOSQUE',3),(6,'831','BUENO DE MIRANDA',3),(7,'788','CAMBO BELO',5),(8,'764','CAMPINAS',1),(9,'877','CAMPO REDONDO',5),(10,'359','CAMPOS ELISEOS',1),(11,'164','CENTRO',3),(12,'498','CH ARVORE GRANDE',1),(13,'474','CH BURITI',3),(14,'16','CH CAMPOS ELISEOS',1),(15,'66','CH CRUZEIRO DO SUL',6),(16,'454','CH DA REPUBLICA',1),(17,'988','CH FLORIANO C. PENTEADO',3),(18,'416','CH FORMOSA',5),(19,'948','CH LULU PONTES',1),(20,'149','CH MARISA',1),(21,'140','CH MORUMBI',6),(22,'560','CH OLIMPIA',3),(23,'976','CH PRADO',3),(24,'95','CH RECANTO DA COLINA',6),(25,'613','CH RECREIO',3),(26,'976','CH SAMAMBAIA',3),(27,'220','CH SAO DOMINGOS',3),(28,'528','CH SAO FRANCISCO',5),(29,'294','CH SAO JOSE',5),(30,'934','CH SAO JUDAS TADEU',6),(31,'795','CH SAO MARTINHO',3),(32,'337','CH STA LETICIA',5),(33,'693','CH STO ANTONIO',1),(34,'2','CH STO ANTONIO DA SAUDADE',3),(35,'502','CH STO ANTONIO SAUDADE',3),(36,'334','CH STOS DUMONT',5),(37,'989','CH VIEIRA',3),(38,'24','CID JARDIM',1),(39,'420','CID SATELITE IRIS',6),(40,'','CID SATELITE IRIS II',6),(41,'148','CID SATELITE IRIS III',6),(42,'382','CID SINGER I',5),(43,'102','CID SINGER II',5),(44,'494','CJ HAB LECH WALESA',5),(45,'496','CJ HAB MONS LUIZ F ABREU',5),(46,'497','CJ HAB RUY NOVAES',5),(47,'749','CJ RES PQ SAO BENTO',6),(48,'290','COND ALTO NOVA CAMPINAS',5),(49,'26','COUNTRY VILLE',1),(50,'371','DIC',5),(51,'319','DIC I',5),(52,'320','DIC II',5),(53,'321','DIC III',5),(54,'322','DIC IV',5),(55,'323','DIC V',5),(56,'699','DIC V - II FASE',5),(57,'726','DIC V - III FASE',5),(58,'727','DIC V - IV FASE',5),(59,'733','DIC V - V FASE',5),(60,'52','DIC V VI FASE',5),(61,'324','DIC VI',5),(62,'470','DISTRITO INDUSTRIAL',5),(63,'455','FAZ BARREIRO',3),(64,'503','FAZ SETE QUEDAS',1),(65,'','FAZ TIJUCA',5),(66,'973','FUNDACAO DA CASA POPULAR',1),(67,'504','JD ACADEMICO',5),(68,'288','JD ADHEMAR DE BARROS',5),(69,'1','JD AERO CONTINENTAL',1),(70,'289','JD AERONAVE',5),(71,'286','JD AEROPORTO',5),(72,'342','JD AIRES DA COSTA',5),(73,'145','JD ALIANCA',3),(74,'2','JD ALVORADA',1),(75,'146','JD AMAZONAS',3),(76,'6','JD AMOREIRAS',1),(77,'422','JD ANA LUIZA',3),(78,'3','JD ANCHIETA',1),(79,'151','JD ANTONIO VON ZUBEN',3),(80,'291','JD AVIACAO',5),(81,'621','JD BAHIA',5),(82,'152','JD BARONEZA',3),(83,'111','JD BASSOLI',6),(84,'7','JD BELA VISTA CONT',1),(85,'153','JD BOM SUCESSO',3),(86,'14','JD BONFIM',1),(87,'588','JD BORDON',1),(88,'138','JD CAIMAN',6),(89,'517','JD CALIFORNIA',5),(90,'759','JD CAMPINA GRANDE',6),(91,'293','JD CAMPO BELO',5),(92,'789','JD CAMPO BELO II',5),(93,'402','JD CAMPO BELO III',5),(94,'21','JD CAMPO GRANDE',6),(95,'17','JD CAMPOS ELISEOS',1),(96,'19','JD CAPIVARI',1),(97,'734','JD CELESTE',1),(98,'163','JD CENTENARIO',3),(99,'129','JD CIDADE UNIVERSITARIA',5),(100,'296','JD COLUMBIA',5),(101,'297','JD CRISTINA',5),(102,'169','JD CURA D\'ARS',3),(103,'9','JD DAS BANDEIRAS',1),(104,'10','JD DAS BANDEIRAS II',1),(105,'37','JD DAS CEREJEIRA',3),(106,'38','JD DAS CEREJEIRAS',3),(107,'45','JD DO LAGO',1),(108,'374','JD DO LAGO CONT',3),(109,'754','JD DO LAGO I',1),(110,'233','JD DO TREVO',3),(111,'91','JD DO TREVO ( PARTE )',1),(112,'235','JD DO VALE',3),(113,'387','JD DOM BOSCO',1),(114,'1085','JD DOM GILBERTO',5),(115,'27','JD DOM NERY',1),(116,'941','JD DOM PAULO TARSO CAMPOS',3),(117,'170','JD DOM VIEIRA',1),(118,'622','JD DONA EMILIA',5),(119,'202','JD DOS OLIVEIRAS',3),(120,'202','JD DOS OLIVEIRAS  PARTE',3),(121,'70','JD DOS OLIVEIRAS CONT',3),(122,'172','JD ESMERALDINA',3),(123,'298','JD ESPLANADA',5),(124,'173','JD ESTORIL',3),(125,'299','JD FERNANDA',5),(126,'829','JD FERNANDA CONT',5),(127,'29','JD FLORENCE I',6),(128,'30','JD FLORENCE II',6),(129,'519','JD FORTUNATO',3),(130,'489','JD FRIBURGO',5),(131,'44','JD FUTURAMA',3),(132,'','JD GARCIA',1),(133,'','JD GARCIA CONT',1),(134,'300','JD GUAIANILA',5),(135,'301','JD HANGAR',5),(136,'','JD IBIRAPUERA',1),(137,'44','JD ICAR',3),(138,'33','JD INDIANOPOLIS',1),(139,'303','JD INTERLAND PAULISTA',5),(140,'304','JD INTERNACIONAL',5),(141,'37','JD IPAUSSURAMA',1),(142,'39','JD IPIRANGA',1),(143,'362','JD IRACI',3),(144,'520','JD IRAJA',3),(145,'343','JD IRMAOS SIGRIST',5),(146,'307','JD ITACOLOMY',5),(147,'305','JD ITAGUACU',5),(148,'306','JD ITAGUACU II',5),(149,'369','JD ITATINGA',5),(150,'191','JD LEONOR',3),(151,'964','JD LEONOR CONT',3),(152,'47','JD LILIZA',6),(153,'48','JD LISA',6),(154,'391','JD LISA II',6),(155,'50','JD LONDRES',1),(156,'720','JD LOURDES',1),(157,'193','JD MAISA',3),(158,'54','JD MARACANA',6),(159,'310','JD MARAJO',5),(160,'56','JD MARCIA',1),(161,'57','JD MARIA EUGENIA',1),(162,'313','JD MARIA HELENA',5),(163,'751','JD MARIA JOSE',5),(164,'309','JD MARIA ROSA',5),(165,'348','JD MARIALVA',6),(166,'522','JD MARINGA',6),(167,'499','JD MARISA',5),(168,'523','JD MARLENE',6),(169,'312','JD MELINA I',5),(170,'315','JD MERCEDES',5),(171,'58','JD METONOPOLIS',6),(172,'61','JD MIRANDA',1),(173,'36','JD MOEMA',5),(174,'918','JD MONTE CRISTO',3),(175,'347','JD MONTE LIBANO',3),(176,'314','JD MORUMBI',5),(177,'62','JD N SRA DE LOURDES',5),(178,'460','JD NOEMIA',3),(179,'430','JD NOVA ALIANCA',1),(180,'317','JD NOVA AMERICA',5),(181,'919','JD NOVA AMERICA II',5),(182,'678','JD NOVA ANCHIETA',1),(183,'483','JD NOVA ESPERANCA',6),(184,'461','JD NOVA ESPERANCA CONT',6),(185,'197','JD NOVA EUROPA',3),(186,'954','JD NOVA EUROPA CONT',3),(187,'316','JD NOVA MERCEDES',5),(188,'354','JD NOVA MORADA',1),(189,'18','JD NOVO C ELISEOS',1),(190,'481','JD NOVO IPAUSSURAMA',1),(191,'55','JD NOVO MARACANA',6),(192,'823','JD NOVO PLANALTO',5),(193,'583','JD NOVO SAO FERNANDO',3),(194,'198','JD NOVO SAO JOSE',3),(195,'599','JD NOVO SOL',5),(196,'201','JD OKITA',3),(197,'204','JD OURO BRANCO',3),(198,'1028','JD OURO PRETO',6),(199,'325','JD OURO VERDE',5),(200,'732','JD PALMEIRAS',5),(201,'525','JD PAMPULHA',6),(202,'326','JD PARAISO VIRACOPOS',5),(203,'67','JD PAULICEIA',1),(204,'524','JD PAULISTA',5),(205,'209','JD PAULISTANO',3),(206,'329','JD PETROPOLIS',5),(207,'210','JD PITA',3),(208,'327','JD PL VIRACOPOS',5),(209,'593','JD PL VIRACOPOS CONT',5),(210,'214','JD PRIMAVERA',3),(211,'212','JD PROENCA',3),(212,'953','JD PROENCA CONT',3),(213,'1086','JD PUCCAMP',5),(214,'595','JD QUATORZE BIS',5),(215,'74','JD REGINA',1),(216,'370','JD REPRESA',5),(217,'59','JD RES NOVO ANCHIETA II',1),(218,'9','JD ROSALIA III',1),(219,'873','JD ROSALINA',5),(220,'72','JD ROSEIRA',1),(221,'73','JD ROSSIN',6),(222,'336','JD S PEDRO VIRACOPOS',5),(223,'79','JD S RITA DE CASSIA',1),(224,'836','JD SAMAMBAIA',3),(225,'804','JD SAN DIEGO',5),(226,'85','JD SAO BENTO',1),(227,'82','JD SAO CAETANO',6),(228,'357','JD SAO CRISTOVAO',5),(229,'376','JD SAO DOMINGOS',5),(230,'372','JD SAO FRANCISCO',5),(231,'223','JD SAO GABRIEL',3),(232,'412','JD SAO JOAO',5),(233,'101','JD SAO JOAO / CAMPITUBA',5),(234,'511','JD SAO JOAQUIM',3),(235,'110','JD SAO JORGE',5),(236,'360','JD SAO JOSE',1),(237,'84','JD SAO JUDAS TADEU',6),(238,'603','JD SAO LOURENCO',3),(239,'226','JD SAO PEDRO',3),(240,'227','JD SAO VICENTE',3),(241,'340','JD SHANGAI',5),(242,'88','JD SOUZA QUEIROZ',1),(243,'75','JD STA AMALIA',1),(244,'77','JD STA CLARA',6),(245,'76','JD STA CRUZ',1),(246,'971','JD STA JUDITH',3),(247,'78','JD STA LUCIA',1),(248,'513','JD STA MARIA I',5),(249,'514','JD STA MARIA II',5),(250,'761','JD STA MARTA',1),(251,'200','JD STA ODILA',3),(252,'80','JD STA ROSA',6),(253,'333','JD STA TEREZINHA',5),(254,'81','JD STA VITORIA',1),(255,'89','JD STELLA',3),(256,'219','JD STO EXPEDITO',3),(257,'531','JD SUL AMERICA',6),(258,'741','JD TELESP',5),(259,'234','JD TUPI',3),(260,'571','JD TUPINAMBA',1),(261,'532','JD UMUARAMA',5),(262,'24','JD URUGUAI',6),(263,'338','JD VERA CRUZ',5),(264,'600','JD VISTA ALEGRE',5),(265,'97','JD YEDA',1),(266,'806','LONDRES',1),(267,'447','N FAV VL IPE',3),(268,'747','N H UNIAO DA VITORIA',5),(269,'429','N JD NOVO SOL',5),(270,'84','N N R VL SAO LUCAS',5),(271,'452','N NOVO PARQUE',5),(272,'417','N OSMAR VILACA',5),(273,'12','N RES 16 DE JANEIRO',5),(274,'760','N RES 28 DE FEVEREIRO',5),(275,'473','N RES AERO AEROPORTO',5),(276,'109','N RES AERO AEROPORTO II',5),(277,'718','N RES ALIANCA',1),(278,'834','N RES ARUANA',5),(279,'33','N RES BAIRRO DA CONQUI',3),(280,'679','N RES BAIRRO DA VITORIA',3),(281,'680','N RES BANDEIRAS II',1),(282,'881','N RES BARRA FUNDA',5),(283,'605','N RES CAMPINA GRANDE',6),(284,'924','N RES CARLOS MARIGHELA',5),(285,'141','N RES CHACARAS POETA',1),(286,'736','N RES CHICO MENDES',5),(287,'882','N RES CINCO DE MARCO',5),(288,'710','N RES CRISTO REDENTOR',1),(289,'687','N RES DA CONQUISTA',3),(290,'690','N RES DAS BANDEIRAS I',1),(291,'816','N RES DEZ DE MARCO',5),(292,'791','N RES DIC I',5),(293,'737','N RES DIC V DE MARCO',5),(294,'797','N RES DOIS DE JULHO',1),(295,'920','N RES ELDORADO DOS CARAJAS',5),(296,'925','N RES FILADELFIA',5),(297,'815','N RES ILHA DO LAGO',3),(298,'713','N RES IPORA',5),(299,'458','N RES JD AEROPORTO',5),(300,'707','N RES JD ALVORADA',1),(301,'686','N RES JD ANCHIETA',1),(302,'884','N RES JD BORDON',1),(303,'48','N RES JD CAMPINEIRO II',5),(304,'863','N RES JD CAMPO BELO I',5),(305,'814','N RES JD CANAA',3),(306,'423','N RES JD CAPIVARI',1),(307,'922','N RES JD DA PAZ',5),(308,'930','N RES JD DAS ANDORINHAS',3),(309,'691','N RES JD DAS BANDEIRAS',1),(310,'914','N RES JD DAS BANDEIRAS I',1),(311,'725','N RES JD DO LAGO',1),(312,'781','N RES JD DO LAGO II',3),(313,'898','N RES JD FLORENCE',6),(314,'740','N RES JD ICARAI',3),(315,'608','N RES JD IRMAOS SIGRIS',5),(316,'783','N RES JD LISA',6),(317,'793','N RES JD MARACANA',6),(318,'705','N RES JD MARIA HELENA',5),(319,'702','N RES JD MARIA ROSA',5),(320,'112','N RES JD MONTE ALTO',6),(321,'916','N RES JD N AMERICA II',5),(322,'870','N RES JD N SRA DE LOURDES',5),(323,'609','N RES JD NOVA AMERICA I',5),(324,'703','N RES JD NOVA AMERICA II',5),(325,'704','N RES JD NOVA AMERICA III',5),(326,'900','N RES JD NOVO ANCHIETA',1),(327,'799','N RES JD NOVO LONDRES',1),(328,'803','N RES JD NOVO MARACANA',6),(329,'840','N RES JD NOVO PLANALTO',5),(330,'901','N RES JD OURO VERDE',5),(331,'938','N RES JD OURO VERDE II PTE',5),(332,'433','N RES JD PALMARES',1),(333,'864','N RES JD PARAISO VIRACOPOS',5),(334,'706','N RES JD PAULICEIA I PARTE',1),(335,'876','N RES JD PAULICEIA II PARTE',1),(336,'902','N RES JD PRIMAVERA II',5),(337,'88','N RES JD ROSALINA',5),(338,'142','N RES JD ROSARIO',5),(339,'903','N RES JD ROSEIRA',1),(340,'932','N RES JD S FRANCISCO II',5),(341,'777','N RES JD S RITA DE CASSIA',1),(342,'215','N RES JD SAMAMBAIA',3),(343,'134','N RES JD SAO CHARBEL',5),(344,'752','N RES JD SAO CRISTOVAO',5),(345,'731','N RES JD SAO FERNANDO',3),(346,'892','N RES JD SAO JOSE',1),(347,'865','N RES JD SHANGAI',5),(348,'926','N RES JD STA CLARA',6),(349,'933','N RES JD STA CRUZ',1),(350,'879','N RES JD STA LUCIA',1),(351,'880','N RES JD STA MARTA',1),(352,'822','N RES JD STO ANTONIO',5),(353,'839','N RES JD STOS DUMONT II',5),(354,'534','N RES JD VISTA ALEGRE I',5),(355,'778','N RES JD YEDA',1),(356,'601','N RES JOSYARA',5),(357,'757','N RES LIBERDADE',1),(358,'866','N RES MAURO MARCONDES PTE 1',5),(359,'867','N RES MAURO MARCONDES PTE 2',5),(360,'464','N RES METONOPOLIS',6),(361,'869','N RES N SRA APARECIDA',5),(362,'724','N RES NOVA ESPERANCA',6),(363,'711','N RES NOVA REPUBLICA',1),(364,'730','N RES NOVO IPAUSSURAMA',1),(365,'130','N RES NOVO ORIENTE',6),(366,'871','N RES NOVO SAO FERNANDO',3),(367,'681','N RES NOVO SOL',5),(368,'894','N RES OSMAR VILACA',5),(369,'604','N RES PALMARES',1),(370,'696','N RES PLAN VIRACOPOS',5),(371,'895','N RES PQ CAMBORIU',1),(372,'923','N RES PQ DA AMIZADE',6),(373,'897','N RES PQ DAS FLORES',6),(374,'776','N RES PQ DAS INDUSTRIAS',5),(375,'896','N RES PQ DOM PEDRO II',5),(376,'45','N RES PQ FLORESTAL',6),(377,'685','N RES PQ SOCIAL',1),(378,'878','N RES PQ UNIAO',1),(379,'855','N RES PQ UNIVERSAL',1),(380,'26','N RES PQ UNIVERSAL I',1),(381,'60','N RES PQ UNIVERSAL II',1),(382,'712','N RES PQ UNIVERSITARIO',5),(383,'427','N RES PQ UNIVERSITARIO II',5),(384,'469','N RES PRINCESA',5),(385,'394','N RES PRINCESA D\'OESTE',6),(386,'536','N RES PROGRESSO',6),(387,'','N RES RECANTO DOS PASSAROS',1),(388,'849','N RES S PEDRO DE VIRACOPOS',5),(389,'395','N RES SAO JUDAS TADEU',6),(390,'851','N RES SAO LUIZ EDVALDO',1),(391,'692','N RES SAPUCAI',1),(392,'607','N RES STOS DUMONT',5),(393,'606','N RES TANCREDO NEVES',5),(394,'850','N RES TRES ESTRELAS',6),(395,'888','N RES UNIAO',5),(396,'846','N RES UNIAO POPULAR',6),(397,'535','N RES VISTA NOVA',5),(398,'841','N RES VL AEROPORTO',5),(399,'813','N RES VL CESAR',1),(400,'688','N RES VL FORMOSA',3),(401,'780','N RES VL FRANCISCA',1),(402,'772','N RES VL INDEPENDENCIA',1),(403,'890','N RES VL IPE',3),(404,'891','N RES VL LOURDES',1),(405,'833','N RES VL MARIA',1),(406,'31','N RES VL NILZA',5),(407,'762','N RES VL PALACIOS',1),(408,'729','N RES VL PRINCESA',5),(409,'915','N RES VL SAO GERALDO',1),(410,'868','N RES VL TODESCAN',5),(411,'385','N RES VL VITORIA',3),(412,'905','N RES VL VITORIA I',5),(413,'935','N RES VL VITORIA II',5),(414,'826','N RES ZUMBI DOS PALMARES',5),(415,'640','NOVA INDEPENDENCIA',1),(416,'641','NOVO RES D PEDRO II',5),(417,'211','PONTE PRETA',3),(418,'','PQ AEROPORTO VIRACOPOS',5),(419,'763','PQ ANHANGUERA',3),(420,'11','PQ BEATRIZ',1),(421,'99','PQ CAMBORIU',1),(422,'380','PQ CAMPINAS',1),(423,'295','PQ CANADA',5),(424,'643','PQ CARVALHO DE MOURA',3),(425,'538','PQ CENTENARIO',3),(426,'697','PQ CENTRAL',5),(427,'174','PQ DA FIGUEIRA',3),(428,'644','PQ DA FIGUEIRA II',3),(429,'356','PQ DA FLORESTA',6),(430,'150','PQ DAS AGUAS',3),(431,'146','PQ DAS CACHOEIRAS',3),(432,'345','PQ DAS CAMELIAS',5),(433,'985','PQ DAS FLORES CONT',6),(434,'302','PQ DAS INDUSTRIAS',5),(435,'328','PQ DOM PEDRO II',5),(436,'147','PQ DOS CANTOS',3),(437,'165','PQ DOS CISNES',3),(438,'1055','PQ ELDORADO',5),(439,'','PQ EUCALIPTOS',1),(440,'35','PQ INDUSTRIAL',1),(441,'748','PQ INDUSTRIAL LISBOA',5),(442,'38','PQ IPIRANGA',1),(443,'42','PQ ITAJAI',6),(444,'43','PQ ITAJAI II',6),(445,'392','PQ ITAJAI III',6),(446,'393','PQ ITAJAI IV',6),(447,'40','PQ ITALIA',1),(448,'185','PQ JAMBEIRO',3),(449,'72','PQ JAMBEIRO PARTE 2',3),(450,'947','PQ JAMBEIRO PARTE I',3),(451,'318','PQ MONTREAL',5),(452,'917','PQ OZIEL',3),(453,'995','PQ PRADO',3),(454,'22','PQ R CAMPINA GRANDE',6),(455,'446','PQ RES VIDA NOVA',5),(456,'98','PQ RES VL UNIAO',1),(457,'468','PQ SAO MARTINHO',3),(458,'341','PQ SAO PAULO',5),(459,'92','PQ TROPICAL',1),(460,'335','PQ UNIVERSITARIO',5),(461,'968','PQ UNIVERSITARIO VIRACOPOS',5),(462,'957','PQ VALENCA',6),(463,'956','PQ VALENCA CONT',6),(464,'93','PQ VALENCA I',6),(465,'94','PQ VALENCA II',6),(466,'339','PQ VISTA ALEGRE',5),(467,'330','PROFILURB',5),(468,'331','RECANTO DO SOL I',5),(469,'332','RECANTO DO SOL II',5),(470,'527','RECREIO LEBLON',6),(471,'100','RES CAMPINA VERDE',5),(472,'20','RES CARVALHO DE MOURA',5),(473,'128','RES CITTA DI FIRENZI',5),(474,'1145','RES CITTA DI SALERNO',5),(475,'1093','RES COLINA DAS NASCENTES',6),(476,'114','RES COND RECANTO PASSAROS',5),(477,'802','RES COSMOS',6),(478,'927','RES COSMOS I',6),(479,'1124','RES FLAVIA',5),(480,'647','RES LEBLON',6),(481,'311','RES MAURO MARCONDES',5),(482,'977','RES NOVA BANDEIRANTE',5),(483,'837','RES NOVO MUNDO',6),(484,'1127','RES PORTO SEGURO',5),(485,'115','RES PQ CAMPINAS',5),(486,'1113','RES PQ DA FAZENDA',1),(487,'478','RES PQ VISTA ALEGRE',5),(488,'105','RES ROSARIO',5),(489,'874','RES SAO JOSE',5),(490,'931','RES SAO LUIZ',6),(491,'121','RES SIRIUS',6),(492,'358','SAO BERNARDO',1),(493,'83','SAO JOAO',1),(494,'515','SITIO SAO JOAO',1),(495,'41','SUB DIV JOSE ALMEIDA',1),(496,'87','SWISS PARK',3),(497,'937','TECHNO PARK',1),(498,'653','VIRACOPOS',5),(499,'126','VL ABAETE',5),(500,'287','VL AEROPORTO',5),(501,'13','VL AEROPORTO 3 PARTE',5),(502,'144','VL ALBERTO SIMOES',3),(503,'5','VL ANGELA MARTA',1),(504,'546','VL ANHANGUERA',1),(505,'4','VL ANHANGUERA CONT',1),(506,'148','VL ANTONIO FRANCISCO',3),(507,'149','VL ANTONIO LOURENCO',3),(508,'466','VL ANTONIO VITORINO',1),(509,'8','VL AUROCAN',1),(510,'159','VL CAMPOS SALES',3),(511,'160','VL CARLITO',3),(512,'162','VL CARMINHA',3),(513,'','VL CASTELO BRANCO',1),(514,'550','VL CONGONHAS',5),(515,'549','VL CONSTANTINO',1),(516,'965','VL CURA D\'ARS',3),(517,'654','VL DA FAB',5),(518,'381','VL DAS PALMEIRAS',5),(519,'32','VL DISCOLA',1),(520,'553','VL DOM PAULO TARSO CAMPOS',3),(521,'677','VL DONA INACIA',1),(522,'171','VL ELZA',3),(523,'574','VL ESTADIOS',1),(524,'175','VL FORMOSA',3),(525,'176','VL GEORGINA',3),(526,'982','VL GEORGINA CONT',3),(527,'576','VL GUILHERME',1),(528,'577','VL HELENA',1),(529,'578','VL HORACIO TULLI',3),(530,'243','VL INDEPENDENCIA',1),(531,'34','VL INDUSTRIAL',1),(532,'180','VL INDUSTRIAL ( PARTE )',3),(533,'10','VL IZABEL',3),(534,'580','VL JEQUITIBAS',3),(535,'224','VL JOAO JORGE',3),(536,'979','VL JOAO MILANI',1),(537,'187','VL JOAQUIM INACIO',3),(538,'189','VL LEMOS 2 PARTE',3),(539,'192','VL LIDIA',3),(540,'49','VL LOURDES',1),(541,'51','VL LOVATO',1),(542,'59','VL MANOEL FERREIRA',1),(543,'838','VL MARIA',3),(544,'194','VL MARIETA',3),(545,'','VL MARTA',3),(546,'195','VL MEIRELES',3),(547,'60','VL MIMOSA',1),(548,'386','VL MINGONE',1),(549,'401','VL NILZA',5),(550,'65','VL PALACIOS',1),(551,'787','VL PALMEIRAS',5),(552,'991','VL PALMEIRAS CONT',5),(553,'206','VL PARAISO',3),(554,'561','VL PAULINO',1),(555,'','VL PE MANOEL NOBREGA',1),(556,'68','VL PERSEU L BARROS',1),(557,'69','VL POMPEIA',1),(558,'661','VL PRES DUTRA',1),(559,'375','VL PRINCESA',5),(560,'213','VL PROGRESSO',3),(561,'308','VL PROST SOUZA',5),(562,'563','VL RIALTO',1),(563,'71','VL RICA',1),(564,'662','VL RIO BRANCO',1),(565,'564','VL RODRIGUES',1),(566,'491','VL SALTINHO',3),(567,'19','VL SAN TIAGO',3),(568,'739','VL SANTANA',1),(569,'665','VL SAO BENTO',1),(570,'225','VL SAO PAULO',3),(571,'87','VL SATURNIA',1),(572,'566','VL SEGALIO',1),(573,'361','VL SETE QUEDAS',1),(574,'568','VL SOARES',1),(575,'569','VL STA ANGELA',1),(576,'200','VL STA ODILA',3),(577,'346','VL TANCREDO NEVES',5),(578,'671','VL TAVARES',3),(579,'570','VL TODESCAN',5),(580,'182','VL YPE',3),(581,'90','VL TEIXEIRA',1),(582,'109','CAMBUI',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_equipes`
--

LOCK TABLES `maxse_equipes` WRITE;
/*!40000 ALTER TABLE `maxse_equipes` DISABLE KEYS */;
INSERT INTO `maxse_equipes` VALUES (3,'Base 1','B1',2,1,118),(4,'Tapa Buraco A1','TBR1',1,1,122),(5,'Guias e Sarjetas 1','G&S1',3,1,123),(6,'Equpe Mecanizada','CBQ1',4,1,124),(7,'Base 2','B2',2,1,125),(8,'Tapa Buraco A2','TBR2',1,1,126),(18,'Equipe Teste 6','eqt6',1,1,140),(19,'asdasd','as',1,1,145),(20,'eeeeeeeeeeeeeeeeeeeee','eee',1,1,149),(21,'fffewwe','yy',4,1,151);
/*!40000 ALTER TABLE `maxse_equipes` ENABLE KEYS */;
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
  CONSTRAINT `fk_maxse_medidas_area_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_area`
--

LOCK TABLES `maxse_medidas_area` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_area` DISABLE KEYS */;
INSERT INTO `maxse_medidas_area` VALUES (34,3.50,2.20,16,'p');
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
  CONSTRAINT `fk_maxse_medidas_linear_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_linear`
--

LOCK TABLES `maxse_medidas_linear` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_linear` DISABLE KEYS */;
INSERT INTO `maxse_medidas_linear` VALUES (14,3.00,17,'p');
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
  CONSTRAINT `fk_maxse_medidas_unidades_1` FOREIGN KEY (`id_sse`) REFERENCES `maxse_sses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_medidas_unidades`
--

LOCK TABLES `maxse_medidas_unidades` WRITE;
/*!40000 ALTER TABLE `maxse_medidas_unidades` DISABLE KEYS */;
INSERT INTO `maxse_medidas_unidades` VALUES (10,1,18,'p');
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
  PRIMARY KEY (`id`),
  KEY `fk_maxse_membros_2_idx` (`id_equipe`),
  KEY `fk_maxse_membros_1_idx` (`id_pessoa`),
  CONSTRAINT `fk_maxse_membros_1` FOREIGN KEY (`id_pessoa`) REFERENCES `maxse_pessoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_maxse_membros_2` FOREIGN KEY (`id_equipe`) REFERENCES `maxse_equipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_membros`
--

LOCK TABLES `maxse_membros` WRITE;
/*!40000 ALTER TABLE `maxse_membros` DISABLE KEYS */;
INSERT INTO `maxse_membros` VALUES (118,1000.00,3,119),(119,1200.00,3,120),(120,10.03,3,121),(121,2000.00,3,122),(122,5000.00,4,123),(123,10000.00,5,124),(124,8000.00,6,125),(125,7000.00,7,126),(126,9000.00,8,127),(140,500000.00,18,146),(141,500000.00,18,147),(142,500000.00,18,148),(145,0.03,19,151),(146,0.00,19,152),(149,1283.00,20,155),(150,1283.00,20,156),(151,0.39,21,157),(152,0.39,21,158);
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
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_pessoas`
--

LOCK TABLES `maxse_pessoas` WRITE;
/*!40000 ALTER TABLE `maxse_pessoas` DISABLE KEYS */;
INSERT INTO `maxse_pessoas` VALUES (1,'SÉRGIO MOURA','smouracalmon@gmail.com'),(119,'MEMBRO BOULOS','membro_b@teste.com'),(120,'MEMBRO_COSTA','membro_c@teste.com'),(121,'MEMBRO_DAMACENO','membro_d@teste.com'),(122,'MEMBRO_ERNESTO','membro_e@teste.com'),(123,'JOÃO','joao@teste.com'),(124,'JÚPTER','jupter@planeta.com'),(125,'Pedro','pedro@teste.com'),(126,'Maxwell','maxwell@teste.com'),(127,'Edson Arantes','edson@teste.com'),(146,'Michel Temer','michel@teste.com'),(147,'Mael','mael@teste.com'),(148,'Rumbo','rumbo@teste'),(151,'qwqweqw','eee'),(152,'eeeq','qqe'),(155,'eqw','qweqq@rre'),(156,'ddd','qweq@qdwq'),(157,'qw','fsde'),(158,'qdqqw','qwdqw');
/*!40000 ALTER TABLE `maxse_pessoas` ENABLE KEYS */;
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
  `urgente` tinyint(4) DEFAULT NULL,
  `obs` varchar(256) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_UNIQUE` (`numero`),
  KEY `fk_maxse_sses_1_idx` (`id_bairro`),
  CONSTRAINT `fk_maxse_sses_1` FOREIGN KEY (`id_bairro`) REFERENCES `maxse_bairros` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_sses`
--

LOCK TABLES `maxse_sses` WRITE;
/*!40000 ALTER TABLE `maxse_sses` DISABLE KEYS */;
INSERT INTO `maxse_sses` VALUES (16,'Rua Décio Andrade Silva, 356',153,'3652359',1,'2018-07-15 10:06:06','2018-05-31 10:26:00',0,NULL,0),(17,'Rua Antônio Texeira, 70',256,'3652552',7,'2018-07-15 10:18:40','2018-06-01 09:01:00',0,NULL,0),(18,'Rua Ananias Holanda de Oliveira, 0',74,'3652530',11,'2018-07-15 10:24:16','2018-06-01 08:34:00',0,'Nivelar unidade e trocar tampão 030 na via',0);
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
  `token` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `validade_do_token` datetime DEFAULT NULL,
  `acessoApp` tinyint(1) NOT NULL DEFAULT '0',
  `acessoWeb` tinyint(1) NOT NULL DEFAULT '0',
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `id_pessoa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_maxse_usuarios_1_idx` (`id_pessoa`),
  CONSTRAINT `fk_maxse_usuarios_1` FOREIGN KEY (`id_pessoa`) REFERENCES `maxse_pessoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxse_usuarios`
--

LOCK TABLES `maxse_usuarios` WRITE;
/*!40000 ALTER TABLE `maxse_usuarios` DISABLE KEYS */;
INSERT INTO `maxse_usuarios` VALUES (1,'root','$1$isThvBp0$1zlwWhFhQDLckghROi5qj0','5b4b7cd854df02.90420045','2018-07-15 14:56:56',1,1,1,1),(44,'boulos','$1$GKXfLe5d$e9Bk9Uv6oPFq4no.PG9jI.',NULL,NULL,1,0,1,119),(45,'joao','$1$AmpuA.Jb$oOG7ujtbU0ZW9.tiiiEOb1',NULL,NULL,1,0,1,123),(46,'jupter','$1$xd9ZZwfy$0iLNsYRrExY7OSrwWcu.r/',NULL,NULL,1,0,1,124),(47,'pedro','$1$nRTM0bJi$81x6VWMIAaDDs3EpsH.Lv0',NULL,NULL,1,0,1,125),(48,'maxwell','$1$08EoUozo$ucrdOaS1lh3c8YxmA01iS.',NULL,NULL,1,0,1,126),(49,'edson','$1$9FGlpJua$uasH6R5l488WcFRl00DpI0',NULL,NULL,1,0,1,127),(62,'michel','$1$9WZEShzZ$PjX62Fls8w3EjVxyBbfA4.',NULL,NULL,0,0,1,146),(64,'ddasad','$1$n.MUb9yL$r5/xDxhxXjvy9XvW5DnPM/',NULL,NULL,0,0,1,151),(66,'ssssss','$1$F.76UOIk$wnaaXhZRz6fnfndftIq5F.',NULL,NULL,1,0,1,155),(67,'asdasda','$1$GTzKWy2A$XCesYurRUTufgqNr1nLzK0',NULL,NULL,0,0,1,157);
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

-- Dump completed on 2018-07-15 13:56:59
