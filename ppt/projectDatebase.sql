/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 8.0.19 : Database - project
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`project` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `project`;

/*Table structure for table `adress` */

DROP TABLE IF EXISTS `adress`;

CREATE TABLE `adress` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `addressMsg` varchar(500) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `adress` */

/*Table structure for table `discount` */

DROP TABLE IF EXISTS `discount`;

CREATE TABLE `discount` (
  `discountId` int NOT NULL AUTO_INCREMENT,
  `discountMsg` varchar(500) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`discountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `discount` */

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `goodsId` int NOT NULL AUTO_INCREMENT,
  `goodsName` varchar(100) DEFAULT NULL,
  `goodsPrice` decimal(10,0) DEFAULT NULL,
  `goodsImgSrc` varchar(100) DEFAULT NULL,
  `goodsDiscount` int DEFAULT '1',
  PRIMARY KEY (`goodsId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `goods` */

insert  into `goods`(`goodsId`,`goodsName`,`goodsPrice`,`goodsImgSrc`,`goodsDiscount`) values 
(1,'丽桑卓',60,'product-1.jpg',0),
(2,'黛安娜',60,'product-2.jpg',0),
(3,'瑟庄妮',60,'product-3.jpg',0),
(4,'奥丽安娜',60,'product-4.jpg',0),
(5,'皎月',60,'product-5.jpg',0),
(6,'凯特琳',60,'product-6.jpg',0),
(7,'伊芙琳',60,'product-7.jpg',0),
(8,'卡特琳娜',60,'product-8.jpg',0),
(9,'安妮',60,'product-9.jpg',0),
(10,'希维尔',60,'product-10.jpg',0),
(11,'萨拉芬妮',60,'product-11.jpg',0),
(12,'乐芙兰',60,'product-12.jpg',0),
(15,'约瑟芬',170,'product-13.jpg',0);

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `goodsAll` varchar(5000) DEFAULT NULL,
  `orderPrice` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `orderState` varchar(50) DEFAULT '待支付',
  `orderTime` datetime DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

insert  into `orders`(`orderId`,`goodsAll`,`orderPrice`,`userId`,`orderState`,`orderTime`) values 
(217,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"3\",\"cartId\":\"266\",\"goodsImgSrc\":\"product-1.jpg\"}]',180,2,'已支付','2022-12-26 16:52:51'),
(218,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"267\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,2,'已支付','2022-12-26 16:55:16'),
(219,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"268\",\"goodsImgSrc\":\"product-1.jpg\"},{\"goodsName\":\"黛安娜\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"269\",\"goodsImgSrc\":\"product-2.jpg\"}]',120,2,'已支付','2022-12-26 16:55:54'),
(220,'[{\"goodsName\":\"瑟庄妮\",\"goodsSize\":\"S\",\"goodsNum\":\"2\",\"cartId\":\"270\",\"goodsImgSrc\":\"product-3.jpg\"},{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"271\",\"goodsImgSrc\":\"product-1.jpg\"}]',180,2,'已支付','2022-12-26 17:11:58'),
(223,'[{\"goodsName\":\"瑟庄妮\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"275\",\"goodsImgSrc\":\"product-3.jpg\"},{\"goodsName\":\"奥丽安娜\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"276\",\"goodsImgSrc\":\"product-4.jpg\"}]',120,2,'已支付','2022-12-26 17:33:58'),
(224,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"277\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,2,'已支付','2022-12-26 19:28:44'),
(225,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"278\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,2,'已支付','2022-12-26 22:20:03'),
(227,'[{\"goodsName\":\"皎月\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"281\",\"goodsImgSrc\":\"product-5.jpg\"}]',60,2,'已支付','2022-12-27 10:27:13'),
(228,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"287\",\"goodsImgSrc\":\"product-1.jpg\"},{\"goodsName\":\"伊芙琳\",\"goodsSize\":\"S\",\"goodsNum\":\"5\",\"cartId\":\"288\",\"goodsImgSrc\":\"product-7.jpg\"}]',360,2,'已支付','2022-12-28 11:39:30'),
(242,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"302\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,2,'已支付','2022-12-28 20:53:52'),
(244,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"304\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,2,'已支付','2022-12-28 21:27:27'),
(245,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"305\",\"goodsImgSrc\":\"product-1.jpg\"},{\"goodsName\":\"瑟庄妮\",\"goodsSize\":\"S\",\"goodsNum\":\"3\",\"cartId\":\"306\",\"goodsImgSrc\":\"product-3.jpg\"}]',240,2,'已支付','2022-12-28 21:43:08'),
(246,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"307\",\"goodsImgSrc\":\"product-1.jpg\"},{\"goodsName\":\"瑟庄妮\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"308\",\"goodsImgSrc\":\"product-3.jpg\"}]',120,2,'已支付','2022-12-28 21:46:10'),
(247,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"3\",\"cartId\":\"309\",\"goodsImgSrc\":\"product-1.jpg\"},{\"goodsName\":\"瑟庄妮\",\"goodsSize\":\"S\",\"goodsNum\":\"2\",\"cartId\":\"310\",\"goodsImgSrc\":\"product-3.jpg\"}]',300,3,'已支付','2022-12-29 09:39:07'),
(248,'[{\"goodsName\":\"皎月\",\"goodsSize\":\"S\",\"goodsNum\":\"2\",\"cartId\":\"311\",\"goodsImgSrc\":\"product-5.jpg\"}]',120,3,'已支付','2022-12-29 09:39:14'),
(254,'[{\"goodsName\":\"瑟庄妮\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"312\",\"goodsImgSrc\":\"product-3.jpg\"}]',60,3,'已支付','2022-12-29 09:52:36'),
(255,'[{\"goodsName\":\"安妮\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"313\",\"goodsImgSrc\":\"product-9.jpg\"}]',60,3,'待支付','2022-12-29 09:54:47'),
(256,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"314\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,3,'待支付','2022-12-29 09:58:25'),
(257,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"314\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,3,'待支付','2022-12-29 09:58:27'),
(258,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"314\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,3,'待支付','2022-12-29 09:59:29'),
(259,'[{\"goodsName\":\"丽桑卓\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"315\",\"goodsImgSrc\":\"product-1.jpg\"}]',60,3,'已支付','2022-12-29 10:00:58'),
(260,'[{\"goodsName\":\"瑟庄妮\",\"goodsSize\":\"S\",\"goodsNum\":\"2\",\"cartId\":\"316\",\"goodsImgSrc\":\"product-3.jpg\"},{\"goodsName\":\"皎月\",\"goodsSize\":\"M\",\"goodsNum\":\"1\",\"cartId\":\"318\",\"goodsImgSrc\":\"product-5.jpg\"}]',180,2,'已支付','2022-12-29 21:05:13'),
(261,'[{\"goodsName\":\"黛安娜\",\"goodsSize\":\"S\",\"goodsNum\":\"1\",\"cartId\":\"317\",\"goodsImgSrc\":\"product-2.jpg\"},{\"goodsName\":\"皎月\",\"goodsSize\":\"XL\",\"goodsNum\":\"1\",\"cartId\":\"319\",\"goodsImgSrc\":\"product-5.jpg\"}]',120,2,'已支付','2022-12-29 21:05:27'),
(262,'[{\"goodsName\":\"约瑟芬\",\"goodsSize\":\"L\",\"goodsNum\":\"3\",\"cartId\":\"322\",\"goodsImgSrc\":\"product-13.jpg\"}]',510,2,'已支付','2022-12-29 21:34:37'),
(263,'[{\"goodsName\":\"约瑟芬\",\"goodsSize\":\"XL\",\"goodsNum\":\"4\",\"cartId\":\"323\",\"goodsImgSrc\":\"product-13.jpg\"}]',680,2,'已支付','2022-12-29 21:34:44');

/*Table structure for table `shopcart` */

DROP TABLE IF EXISTS `shopcart`;

CREATE TABLE `shopcart` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `goodsId` int DEFAULT NULL,
  `goodsNum` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `goodsPrice` decimal(10,0) DEFAULT NULL,
  `totalPrice` decimal(10,0) DEFAULT NULL,
  `goodsSize` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=utf8;

/*Data for the table `shopcart` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) DEFAULT NULL,
  `userPwd` varchar(30) DEFAULT NULL,
  `userSex` varchar(1) DEFAULT NULL,
  `userType` int DEFAULT '1',
  `userAddress` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`userId`,`userName`,`userPwd`,`userSex`,`userType`,`userAddress`) values 
(1,'llf','123','男',0,NULL),
(2,'zq','123','男',1,'北京市北京市市辖区朝阳区十里河街道民和兴   收件人：刘刘刘   联系电话：17679314954'),
(3,'zs','123','男',1,'北京市北京市市辖区朝阳区十里河街道民和兴   收件人：刘刘刘   联系电话：17679314954'),
(5,'zq','zq121212','男',1,NULL),
(9,'admin123','6666666','女',0,NULL),
(10,'aaa','123','男',1,NULL),
(11,'bbb','123','男',1,NULL),
(12,'ccc','123','女',1,NULL),
(13,'ddd1','123','男',1,NULL),
(14,'eee','123','男',1,NULL),
(17,'张三','123','男',1,NULL),
(26,'12121','21','女',1,NULL),
(27,'zhima','a12121212','女',1,NULL),
(28,'test222','a12121212','女',1,NULL),
(29,'zzzzz','a12121','女',1,NULL),
(31,'father','a12121212','女',1,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
