-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: myblog
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `articletype`
--

DROP TABLE IF EXISTS `articletype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articletype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `decription` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articletype`
--

LOCK TABLES `articletype` WRITE;
/*!40000 ALTER TABLE `articletype` DISABLE KEYS */;
INSERT INTO `articletype` VALUES (1,'question','编程问题'),(2,'blogs','技术博客'),(3,'life','生活分享');
/*!40000 ALTER TABLE `articletype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile` varchar(255) DEFAULT NULL,
  `content` varchar(8000) DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `creatime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastupdatetime` timestamp NULL DEFAULT NULL,
  `uploaduser` int DEFAULT NULL,
  `state` tinyint DEFAULT '0',
  `type` int DEFAULT '2',
  `comments` int DEFAULT '0',
  `likes` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'语义化  Html5  标签','<p>HTML5新增的语义化标签主要有:<br>&lt;article>、&lt;section>、&lt;nav>、&lt;aside>、&lt;header>、&lt;footer>、&lt;time>等等...</p><h2>优点:</h2><ul><li>为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构</li><li>比&lt;div>标签有更加丰富的含义，方便开发与维护</li><li>方便搜索引擎能识别页面结构，有利于SEO</li><li>方便其他设备解析（如移动设备、盲人阅读器等）</li><li>有利于合作，遵守W3C标准</li></ul><h2>注意:</h2><ul><li>尽可能少的使用无语义的标签div和span</li><li>在语义不明显时，既可以使用div或者p时，尽量用p，因为p在默认情况下有上下间距，对兼容特殊终端有利</li><li>不要使用纯样式标签，如：b、font、u等，改用css设置</li><li>需要强调的文本，可以包含在strong或者em标签中</li><li>使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td</li><li>表单域要用fieldset标签包起来，并用legend标签说明表单的用途</li><li>每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性</li></ul><h2>1.header 与hgroup</h2><p>通常放在页面或布局的顶部，一般放置导航栏或标题</p><p>一个文档中可以包含一对或者一对以上的&lt;header&gt;标签。<br>标签的位置是次要的，不一定非要显示在页面的上方，我们可以为任何需要的区块标签添加&lt;header&gt;元素，例如下面将要讲解的&lt;article&gt;、&lt;section&gt;等标签。</p><ul><li>如果有连续多个h1-h6标签就用hgroup</li><li>如果有连续多个标题和其他文章数据，h1-h6标签就用hgroup包住，和其他文章元数据一起放入header标签</li></ul><h2>2.nav</h2><p>表示页面的导航，也可以在&lt;header&gt;标签中使用，还可以显示在侧边栏中。一个页面之中可以有多个&lt;nav&gt;标签。<br>为了方便搜索引擎解析，最好是将主要的链接放在nav中。</p><h2>3.aside</h2><p>所包含的内容不是页面的主要内容、具有独立性，是对页面的补充。<br>&lt;aside&gt;一般使用在页面、文章的侧边栏、广告、友情链接等区域。</p><h2>4.footer</h2><p>一般被放置在页面或者页面中某个区块的底部，包含版权信息、联系方式等信息。一个页面也可以有多个footer</p><h2>5.article</h2><p>&lt;article&gt;元素应该使用在相对比较独立、完整的的内容区块，所以我们可以在一篇博客、一个论坛帖子、一篇新闻报道或者一个用户评论中使用&lt;article&gt;元素。article可以互相嵌套。</p><h2>6.section</h2><p>一组或者一节内容。</p><h5>&lt;div&gt;、&lt;section&gt;、&lt;article&gt;三者的比较：</h5><p>&lt;div&gt;：应用广泛，任意一个区域<br> &lt;section&gt;：包含的内容是一个明确的主题，通常有标题区域<br>&lt;article&gt;：如果我们的页面中需要一个单独的模块来实现一个单独的功能，就用&lt;article&gt;，其他的时候都用&lt;section&gt;</p><h2>7.time</h2><p>可以带格式的时间标签</p><h2>8.mark</h2><p>高亮目标</p> <h2>9.address</h2> <p>address代表区块容器，必须是作为联系信息出现，邮编地址、邮件地址等等,一般出现在footer。</p>',1,'Html(5)-语义化标签','2022-06-29 14:19:56',NULL,1,0,2,2,1),(2,'块 元素 行内 行内块 ',NULL,1,'Html(5)-块元素、行内元素和行内块元素','2022-06-29 14:18:05',NULL,1,0,2,0,0),(3,NULL,NULL,1,'Html(5)-媒体元素audio、video','2022-06-29 14:18:05',NULL,1,0,2,0,0),(4,NULL,NULL,1,'Html(5)-Html常用标签','2022-06-23 15:43:50',NULL,1,0,2,0,0),(5,NULL,NULL,1,'Html(5)-Html常用属性详解','2022-06-23 15:44:45',NULL,1,0,2,0,0),(6,NULL,NULL,1,'Html(5)-Html注释','2022-06-23 15:49:15',NULL,1,0,2,0,0),(7,NULL,NULL,1,'Html(5)-段落标签详解','2022-06-23 15:49:15',NULL,1,0,2,0,0),(8,NULL,NULL,1,'Html(5)-文本格式化标签','2022-06-23 15:49:15',NULL,1,0,2,0,0),(9,NULL,NULL,1,'Html(5)-超链接详解','2022-06-23 15:49:15',NULL,1,0,2,0,0),(10,NULL,NULL,1,'Html(5)-图像标签img','2022-06-23 15:49:15',NULL,1,0,2,0,0),(11,NULL,NULL,1,'Html(5)-表格标签table','2022-06-23 15:49:15',NULL,1,0,2,0,0),(12,NULL,NULL,1,'Html(5)-有序列表与无序列表','2022-06-23 15:49:15',NULL,1,0,2,0,0),(13,'块','<h1>大学终于结束了</h1>',NULL,'四年大学，终于毕业啦','2022-06-29 14:00:35',NULL,NULL,0,2,0,0);
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `aid` int DEFAULT NULL,
  `atype` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `blogid` int DEFAULT NULL,
  `state` tinyint(1) DEFAULT '0',
  `createDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `blogtype` int DEFAULT NULL,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'感谢',3,1,0,'2022-06-28 05:27:15',2,0),(2,'牛啊牛啊',2,1,0,'2022-06-28 05:27:52',2,0),(3,'非常有用，感谢感谢',3,2,0,'2022-06-28 06:14:29',2,0),(4,'好',2,2,0,'2022-06-28 06:14:50',2,0),(5,'好',1,1,0,'2022-06-28 14:44:16',2,0),(6,'背一下，背一下',1,1,0,'2022-06-28 14:46:01',2,0),(7,'可以',1,1,0,'2022-06-29 11:48:12',2,0),(8,'test',1,1,0,'2022-06-29 11:56:37',2,0),(9,'哈哈',1,1,0,'2022-06-29 15:16:58',3,0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flags`
--

DROP TABLE IF EXISTS `flags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `flagname` varchar(45) DEFAULT NULL,
  `counts` int DEFAULT NULL,
  `state` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flags`
--

LOCK TABLES `flags` WRITE;
/*!40000 ALTER TABLE `flags` DISABLE KEYS */;
INSERT INTO `flags` VALUES (1,'Html(5)',NULL,0),(2,'Css(3)',NULL,0),(3,'Javascript',NULL,0),(4,'Es6',NULL,0),(5,'Ajax',NULL,0),(6,'Jquery',NULL,0),(7,'Vue.js',NULL,0),(8,'Node.js',NULL,0),(9,'React.js',NULL,0),(10,'Axios',NULL,0);
/*!40000 ALTER TABLE `flags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `life`
--

DROP TABLE IF EXISTS `life`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `life` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `uploaduser` int DEFAULT NULL,
  `state` tinyint DEFAULT '0',
  `content` varchar(2000) DEFAULT NULL,
  `comments` int DEFAULT '0',
  `profile` varchar(45) DEFAULT NULL,
  `type` int DEFAULT '3',
  `creatime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `life`
--

LOCK TABLES `life` WRITE;
/*!40000 ALTER TABLE `life` DISABLE KEYS */;
INSERT INTO `life` VALUES (1,'四年大学，终于毕业啦',1,0,'<h1>终于毕业了！</h1>',0,'块',3,'2022-06-29 14:08:57',0),(2,'吃的好，心情好',1,0,NULL,0,'好心情',3,'2022-06-28 13:32:05',0),(3,'test',1,0,'<h1>test</h1>',0,'test',3,'2022-06-28 13:51:16',0),(4,'test',1,0,'<h1>test</h1>',0,'test',3,'2022-06-28 13:51:16',0);
/*!40000 ALTER TABLE `life` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aid` int DEFAULT NULL,
  `atype` int DEFAULT NULL,
  `Like` tinyint DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,1,2,1,3);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `state` tinyint DEFAULT '0',
  `questionimg` varchar(255) DEFAULT NULL,
  `uploaduser` int DEFAULT NULL,
  `flag` int DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `type` int DEFAULT '1',
  `creatime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comments` int DEFAULT '0',
  `likes` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'vue-关于vue中动态的组件高度随宽度变化',NULL,0,NULL,1,7,NULL,1,'2022-06-24 08:58:49',0,0);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `sign` varchar(20) DEFAULT NULL,
  `state` tinyint DEFAULT '0',
  `authority` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'1373325137@qq.com','fenqyda','435bdbbbbcaa6d5dcdcea1a2812cc1be','http://localhost:3000/avatar_uploads/avatar_default.jpg',0,'','',0,0),(2,'3208205685@qq.com','2013157603','e2256b3f0bf9e4f03a657ef7abf5e210','http://localhost:3000/avatar_uploads/avatar_default.jpg',NULL,NULL,NULL,0,1),(3,'1586949065@qq.com','星火','435bdbbbbcaa6d5dcdcea1a2812cc1be','http://localhost:3000/avatar_uploads/avatar_default.jpg',NULL,NULL,NULL,0,1),(5,'2013157603@qq.com','test','fb1330b87552d5bcebe75178d7766eeb','http://localhost:3000/avatar_uploads/avatar_default.jpg',NULL,NULL,NULL,0,1),(6,'18770045046@gemail.com','安德鲁','d8ec9586dc27488d4cb4e4f79361e0f5','http://localhost:3000/avatar_uploads/avatar_default.jpg',0,'','',0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'myblog'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-30  0:06:44
