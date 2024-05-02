-- MySQL dump 10.13  Distrib 8.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: lms
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `desc` varchar(2048) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `slug` varchar(500) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_32b67ddf344608b5c2fb95bc90c` (`category_id`),
  KEY `FK_08dfe0c802192ba0c499d4cdb9c` (`user_id`),
  CONSTRAINT `FK_08dfe0c802192ba0c499d4cdb9c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_32b67ddf344608b5c2fb95bc90c` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,NULL,'2024-03-19T17:04:27.974Z',NULL,0,1,7,'Nghệ thuật ổn định của hệ thống và tính sẵn sàng cao của một backend (beginer-> junior -> senior -> level 5)','Lập trình viên đề cập đến hệ thống ai cũng nghĩ về kiến trúc với 3 điều sau. Một tính sẵn sàng cao, hai đồng thời cao, và ba là hiệu suất cao.  3 yếu tố này bắt buộc phải hiểu nếu bạn là một Backend phải xem xét trong quá trình làm việc với dự án. Trong bài viết này, chúng ta sẽ nói những điều này cũng là điều mà chúng ta thường gọi là tính ổn định của hệ thống',5,'nghe-thuat-on-djinh-cua-he-thong-va-tinh-san-sang-cao-cua-mot-backend-beginer-greater-junior-greater-senior-greater-level-5-8t758',1,'<h2><strong>Lộ trình backend từ (beginer-&gt; junior -&gt; senior -&gt; level 5...)</strong></h2><p>Thông thường quá trình phát triển dự án của một backend thì có sự bắt đầu từ <a href=\"https://www.youtube.com/playlist?list=PLw0w5s5b9NK5fDx409WXgT06Zm4P83yiA\">(beginer-&gt; junior -&gt; senior -&gt; level 5...)</a> thì tất nhiên sẽ có những lộ trình khác nhau thời gian cũng như sự nỗ lực của mỗi cá nhân.</p><p>Các anh chị đừng đặt mục tiêu của mình cao và xa. Đừng làm như vậy, tôi đã từng... Khi đặt mục tiêu xa va cao, chỉ khiến chúng ta bị áp lực stress nặng nề mà thôi. Và khi bị điều đó, nó sẽ liên đới nhiều người với cảm xúc của bạn. Chúng ta sẽ mang những tâm trạng đó đi khắp nơi. Chuyện nhỏ hóa to, chuyện to hóa khắp nơi.</p><p>Thay vì như vậy hãy đặt nó nhẹ nhàng, tối thiểu. Ví dụ mục tiêu là hoàn thành một <a href=\"https://github.com/anonystick/anonystick\">dự án cấp doanh nghiệp về backend như thế này</a>. Thì chúng ta chia nhỏ nó ra, ví dụ có 100 modules. Thì mỗi ngày or 2 ngày hãy làm một module. Như hình tôi chia sẻ dưới đây cho các bạn.</p><figure class=\"image\"><img src=\"https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png\" srcset=\"https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_131 131w, https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_211 211w, https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_291 291w, https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_371 371w, https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_451 451w, https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_531 531w, https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_611 611w, https://106494.cdn.cke-cs.com/85exzvxx8NXoC1fyaOcT/images/f48da1ead1e4c1e074eea2a8ca977069d42f4b7bd1efcb49.png/w_691 691w\" sizes=\"100vw\" width=\"691\"></figure><p>Ngày một \"tạo cấu trúc thư mục dự án\", ngày 2 \"Tạo module public...\"... Như thế, như thế...</p><p>Mục tiêu thấp, bạn trải qua, thì mục tiêu đó nó biến mất or chính bạn là người gạch nó đi, tiếp theo là mục tiêu mới. Cứ như thế, ngàn dặm đi bắt đầu một bước chân nhỏ. Kiên trì là sự thành công kinh khủng có thể bạn chưa nhìn thấy đâu. Ngoài ra tôi có tóm tắt nguyên tắc phát triển rộng về một system có nhan đề <a href=\"https://www.youtube.com/watch?v=M4AFU8CNtk4\">\"Lộ trình trở thành BACKEND Developer TÔI đã quyết tâm khi nhìn thấy kiến trúc của hệ thống này\"</a> anh chị bớt chút thời gian ghé qua để tìm hiểu thêm.</p><p>Về bài viết này dương nhiên, một bài viết khó có thể nói hết tất cả những kỹ thuật của một dự án. Hoặc bạn có thể tham khảo một dự án eCommerce Backend Api mà chúng tôi đang thiết kế. Còn bài viết này hy vọng nó sẽ trang bị cho bạn những kỹ năng có thể trả lời với những công ty muốn tìm hiểu về hệ thống</p><h4><strong>Tính sẵn sàng cao là gì?</strong></h4><p>Đầu tiên tôi nhớ cách đây không lâu tôi đã nói về định nghĩa là với một cụm từ đó là <a href=\"https://www.youtube.com/watch?v=EKLVEQs3USA&amp;t=517s\">\"Five nines\"</a> Tôi nghĩ bạn nên xem lại nó, rất hữu ích cho việc đọc bài viết này nhanh và hiểu nhiều hơn.</p><p>Ở đó cho phép một năm system được crash bao nhiêu thời gian. Tường mình hơn là ví dụ facebook có yêu cầu là 9999, tức là thời gian ngừng hoạt động hàng năm không được vượt quá 53 phút, trên thực tế, rất khó đạt được mục tiêu này và cần có sự hợp tác của nhiều đối tượng khác nhau trong trường hợp này. Vậy yếu tố nào ảnh hưởng đến sự ổn định của hệ thống thì tôi sẽ nói đến 3 yếu tố chính sau đây.</p><h2><strong>Hệ thống ổn định cần 3 yếu tố nào?</strong></h2><p>Bạn ngừng lại một chút đừng có đọc tiếp, hãy thử suy nghĩ xem... 3 yếu tố đó là gì? 1 phút bắt đầu ... Câu trả lời đối với tôi. Chú ý đối với bản thân tôi chính là:</p><ul><li>con người (lập trình viên, devops...).</li><li>Các công nghệ tham gia dự án.</li><li>phần cứng (server, network)</li></ul><p>Vậy giả sử hệ thống bị ảnh hưởng đột ngột thì làm thế nào để phản xạ tốt. Thì cũng có 2 vấn đề. Phòng ngừa, phục hồi đưa về trạng thái cũ. Câu hỏi ở đây tiếp tục làm thế nào để một lập trình viên có thể hiểu điều đó ngay khi bắt đầu. Thì tôi sẽ nói về phần thức hai ít hôm nữa..</p>');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_comment`
--

DROP TABLE IF EXISTS `blog_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_comment` (
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `id` bigint NOT NULL AUTO_INCREMENT,
  `desc` varchar(5000) NOT NULL,
  `blog_id` bigint DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2632c572d9bec4d0fc0028cdb20` (`email`),
  KEY `FK_a2e06d1f23800610fb9f3715c45` (`blog_id`),
  CONSTRAINT `FK_2632c572d9bec4d0fc0028cdb20` FOREIGN KEY (`email`) REFERENCES `users` (`email`),
  CONSTRAINT `FK_a2e06d1f23800610fb9f3715c45` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_comment`
--

LOCK TABLES `blog_comment` WRITE;
/*!40000 ALTER TABLE `blog_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('2024-03-19T16:58:52.736Z',NULL,3,'Technology',0,1,1,NULL),('2024-03-19T16:58:58.924Z',NULL,4,'AI',0,1,1,NULL),('2024-03-19T16:59:14.409Z',NULL,5,'News',0,1,1,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_course`
--

DROP TABLE IF EXISTS `course_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_course` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `slug` varchar(500) NOT NULL,
  `title` varchar(500) NOT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `credit` int NOT NULL,
  `email` varchar(500) NOT NULL,
  `summary` varchar(5000) NOT NULL,
  `level_id` bigint DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d5a21660a9849a7c40e8e545fe8` (`level_id`),
  CONSTRAINT `FK_d5a21660a9849a7c40e8e545fe8` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_course`
--

LOCK TABLES `course_course` WRITE;
/*!40000 ALTER TABLE `course_course` DISABLE KEYS */;
INSERT INTO `course_course` VALUES ('2024-03-19T16:05:53.343Z','2024-03-19T16:58:12.890Z',35,'kien-thuc-nhap-mon-it-f6y62','Kiến Thức Nhập Môn IT','https://lms-public.s3.us-east-005.backblazeb2.com/thumbnail-2024-03-19T16-58-08.159Zb2d632c3-26c5-4b93-94f1-987a76b4c0eb.png',500,'anhdung5c1@gmail.com','Bạn sẽ học được gì?  Các kiến thức cơ bản, nền móng của ngành IT .Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng Hiểu hơn về cách internet và máy vi tính hoạt động',1,0,1,1,1);
/*!40000 ALTER TABLE `course_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_docs`
--

DROP TABLE IF EXISTS `course_docs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_docs` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `course_id` bigint DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_af1268f725f51eb19be3163100e` (`course_id`),
  CONSTRAINT `FK_af1268f725f51eb19be3163100e` FOREIGN KEY (`course_id`) REFERENCES `course_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_docs`
--

LOCK TABLES `course_docs` WRITE;
/*!40000 ALTER TABLE `course_docs` DISABLE KEYS */;
INSERT INTO `course_docs` VALUES ('2024-03-19T16:45:18.722Z',NULL,4,'Doccument 1',35,0,1,1,1,'document-2024-03-19T16-45-35.784Za043349d-0bfd-422e-8758-0b90404d5d96.pdf');
/*!40000 ALTER TABLE `course_docs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_video`
--

DROP TABLE IF EXISTS `course_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_video` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `slug` varchar(500) NOT NULL,
  `summary` varchar(5000) NOT NULL,
  `video_name` varchar(500) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `timestamp` varchar(500) DEFAULT NULL,
  `title` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9d09e368c55625161ccdb65c900` (`course_id`),
  CONSTRAINT `FK_9d09e368c55625161ccdb65c900` FOREIGN KEY (`course_id`) REFERENCES `course_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_video`
--

LOCK TABLES `course_video` WRITE;
/*!40000 ALTER TABLE `course_video` DISABLE KEYS */;
INSERT INTO `course_video` VALUES ('2024-03-19T16:44:27.096Z',NULL,5,'khai-niem-ky-thuat-can-biet-yhfli','Mô hình Client - Server là gì?','video-2024-03-19T16-44-39.530Zf85712c7-6b4e-4e18-91bd-b72f5ad06d34.mp4',35,0,1,1,1,NULL,' Khái niệm kỹ thuật cần biết');
/*!40000 ALTER TABLE `course_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  `order` int NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8ca955843d28dd01385e8a9588` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES ('2024-03-19T15:30:44.067Z',NULL,1,'Beginner','Beginner level',1,0,1,1,NULL);
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_choice`
--

DROP TABLE IF EXISTS `quiz_choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_choice` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `choice` varchar(500) NOT NULL,
  `correct` tinyint NOT NULL DEFAULT '0',
  `question_id` bigint NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_31cf2940bd272dce20551e18bce` (`question_id`),
  CONSTRAINT `FK_31cf2940bd272dce20551e18bce` FOREIGN KEY (`question_id`) REFERENCES `quiz_question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_choice`
--

LOCK TABLES `quiz_choice` WRITE;
/*!40000 ALTER TABLE `quiz_choice` DISABLE KEYS */;
INSERT INTO `quiz_choice` VALUES ('2024-03-19T16:51:53.294Z','2024-03-19T16:51:53.293Z',24,'a',1,15,0,1,1,NULL),('2024-03-19T16:51:56.941Z','2024-03-19T16:51:56.940Z',25,'b',0,15,0,1,1,NULL),('2024-03-19T16:52:00.394Z','2024-03-19T16:52:00.394Z',26,'c',0,15,0,1,1,NULL),('2024-03-19T16:52:03.414Z','2024-03-19T16:52:03.413Z',27,'d',0,15,0,1,1,NULL),('2024-03-19T16:52:16.855Z','2024-03-19T16:52:16.853Z',28,'a',0,16,0,1,1,NULL),('2024-03-19T16:52:20.729Z','2024-03-19T16:52:20.728Z',29,'b',0,16,0,1,1,NULL),('2024-03-19T16:52:24.718Z','2024-03-19T16:52:24.717Z',30,'c',1,16,0,1,1,NULL),('2024-03-19T16:52:28.506Z','2024-03-19T16:52:28.505Z',31,'d',0,16,0,1,1,NULL),('2024-03-19T16:52:39.926Z','2024-03-19T16:52:39.925Z',32,'a',0,17,0,1,1,NULL),('2024-03-19T16:52:45.641Z','2024-03-19T16:52:45.640Z',33,'b',1,17,0,1,1,NULL),('2024-03-19T16:52:49.204Z','2024-03-19T16:52:49.203Z',34,'c',0,17,0,1,1,NULL),('2024-03-19T16:52:51.688Z','2024-03-19T16:52:51.688Z',35,'d',0,17,0,1,1,NULL);
/*!40000 ALTER TABLE `quiz_choice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_question`
--

DROP TABLE IF EXISTS `quiz_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_question` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `explanation` varchar(1000) DEFAULT NULL,
  `quiz_id` bigint NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `multiple_choice` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_77e8e87d9e707fabdb82bf227fc` (`quiz_id`),
  CONSTRAINT `FK_77e8e87d9e707fabdb82bf227fc` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_quiz` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question`
--

LOCK TABLES `quiz_question` WRITE;
/*!40000 ALTER TABLE `quiz_question` DISABLE KEYS */;
INSERT INTO `quiz_question` VALUES ('2024-03-19T16:51:47.027Z','2024-03-19T16:51:47.026Z',15,'question 1','Explanation for question 1',6,0,1,1,NULL,NULL,1),('2024-03-19T16:52:09.655Z','2024-03-19T16:52:09.654Z',16,'question 2','Explanation for question 2',6,0,1,1,NULL,NULL,1),('2024-03-19T16:52:35.671Z','2024-03-19T16:52:35.671Z',17,'question 3','Explanation for question 3',6,0,1,1,NULL,NULL,1);
/*!40000 ALTER TABLE `quiz_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_quiz`
--

DROP TABLE IF EXISTS `quiz_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_quiz` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `description` varchar(5000) DEFAULT '',
  `answers_at_end` tinyint DEFAULT '0',
  `random_order` tinyint DEFAULT '0',
  `single_attempt` tinyint DEFAULT '0',
  `deadline` varchar(255) DEFAULT '2024-03-19T15:30:44.070Z',
  `course_id` bigint NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `question_to_pass` int NOT NULL,
  `min_question` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_7372bcb0f8f51a1cf58be09fdd7` (`course_id`),
  CONSTRAINT `FK_7372bcb0f8f51a1cf58be09fdd7` FOREIGN KEY (`course_id`) REFERENCES `course_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_quiz`
--

LOCK TABLES `quiz_quiz` WRITE;
/*!40000 ALTER TABLE `quiz_quiz` DISABLE KEYS */;
INSERT INTO `quiz_quiz` VALUES ('2024-03-19T15:30:44.067Z','2024-03-19T16:52:55.731Z',6,'Quiz 1','description for quiz 1',0,0,0,'2024-03-22T12:21',35,0,1,1,1,2,3);
/*!40000 ALTER TABLE `quiz_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_sitting`
--

DROP TABLE IF EXISTS `quiz_sitting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_sitting` (
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `id` bigint NOT NULL AUTO_INCREMENT,
  `current_score` int DEFAULT '0',
  `user_answers` varchar(255) DEFAULT '',
  `course_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `quiz_id` bigint NOT NULL,
  `is_complete` tinyint NOT NULL DEFAULT '0',
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a97cd8907668f4d762be5857a06` (`course_id`),
  KEY `FK_2bc90ae5db329ed8ea0bf467dcf` (`user_id`),
  KEY `FK_80582c029470c34655c90ef151c` (`quiz_id`),
  CONSTRAINT `FK_2bc90ae5db329ed8ea0bf467dcf` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_80582c029470c34655c90ef151c` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_quiz` (`id`),
  CONSTRAINT `FK_a97cd8907668f4d762be5857a06` FOREIGN KEY (`course_id`) REFERENCES `course_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_sitting`
--

LOCK TABLES `quiz_sitting` WRITE;
/*!40000 ALTER TABLE `quiz_sitting` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_sitting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(500) NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('2024-02-18T09:30:35.105Z',NULL,1,'ADMIN',0,1,NULL,NULL),('2024-02-18T09:30:35.105Z',NULL,2,'STUDENT',0,1,NULL,NULL),('2024-02-18T09:30:35.105Z',NULL,3,'LECTURER',0,1,NULL,NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `created_at` varchar(255) DEFAULT '2024-03-19T15:30:44.067Z',
  `updated_at` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(500) NOT NULL,
  `last_name` varchar(500) NOT NULL,
  `is_super_user` tinyint NOT NULL DEFAULT '0',
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `last_login` varchar(255) DEFAULT '2024-03-19T15:30:44.071Z',
  `address` varchar(500) DEFAULT NULL,
  `picture` varchar(500) DEFAULT NULL,
  `date_joined` varchar(255) DEFAULT '2024-03-19T15:30:44.071Z',
  `is_deleted` tinyint DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `phone` varchar(12) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2024-01-17T15:40:53.312Z','',1,'admin','',1,'admin@gmail.com','$2b$10$RIP0.0UnWBL7kwNyJTgC3O.5X4Jo4XpMs/6UUMYvWpQyI/SqnnmWO','2024-01-17T15:40:53.343Z','a','https://lms-public.s3.us-east-005.backblazeb2.com/picture-2024-03-19T15-54-04.940Z2538424c-8576-4f8b-8d8d-de91fca48cc1.jpeg','2024-01-17T15:40:53.343Z',0,1,NULL,NULL,1),('2024-03-19T15:57:04.512Z',NULL,14,'Nguyễn ','Dũng',0,'anhdung5c1@gmail.com','$2b$10$ohx7NELqH.Y.uzB1a6v.y.uLF.EidPxGJ55QXlqOVGauJr6GPfAxW','2024-03-19T15:30:44.071Z','TPHCM',NULL,'2024-03-19T15:30:44.071Z',0,1,'0938995290',NULL,NULL),('2024-03-19T15:58:05.246Z',NULL,15,'Phạm','Quân',0,'quanpham48.dev@gmail.com','$2b$10$YSP8HdKB6LkQThYViwbRkOmC8snKNIZVY.RLNdy84/.0aidR7SEk.','2024-03-19T15:30:44.071Z','TPHCM',NULL,'2024-03-19T15:30:44.071Z',0,1,'0399551917',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_course`
--

DROP TABLE IF EXISTS `users_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_course` (
  `course_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`course_id`,`user_id`),
  KEY `IDX_714c74a33a4e036653dec554a5` (`course_id`),
  KEY `IDX_c0099c67198f3c4d25fc9f0517` (`user_id`),
  CONSTRAINT `FK_714c74a33a4e036653dec554a57` FOREIGN KEY (`course_id`) REFERENCES `course_course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_c0099c67198f3c4d25fc9f05171` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_course`
--

LOCK TABLES `users_course` WRITE;
/*!40000 ALTER TABLE `users_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_role` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_dff1fd3973cc325e58d8b1f500` (`user_id`),
  KEY `IDX_e3a658640780bef5ec4319c8a0` (`role_id`),
  CONSTRAINT `FK_dff1fd3973cc325e58d8b1f5007` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_e3a658640780bef5ec4319c8a0f` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_role`
--

LOCK TABLES `users_role` WRITE;
/*!40000 ALTER TABLE `users_role` DISABLE KEYS */;
INSERT INTO `users_role` VALUES (1,1),(14,3),(15,2);
/*!40000 ALTER TABLE `users_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-19 17:32:45
