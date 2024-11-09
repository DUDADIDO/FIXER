-- 데이터베이스 초기화
DROP DATABASE IF EXISTS fixer;
CREATE DATABASE fixer;
USE fixer;

-- 공통 코드 테이블 생성
CREATE TABLE common_codes (
    code_id INT AUTO_INCREMENT PRIMARY KEY,
    code_group VARCHAR(50) NOT NULL, 
    code_value VARCHAR(50) NOT NULL, 
    code_name VARCHAR(100) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 사용자 테이블 생성
CREATE TABLE `users` (
  `user_num` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(100) NOT NULL,
  `user_pw` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(50) NOT NULL,
  `user_email` VARCHAR(100) DEFAULT NULL,
  `user_state` INT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_num`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 회사 정보 테이블 생성
CREATE TABLE `companiesinfo` (
  `info_bord_id` INT NOT NULL AUTO_INCREMENT,
  `logo` VARCHAR(255) DEFAULT NULL,
  `description` MEDIUMTEXT,
  `content` MEDIUMTEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`info_bord_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 회사 테이블 생성
CREATE TABLE `companies` (
  `company_id` INT NOT NULL AUTO_INCREMENT,
  `info_bord_id` INT NOT NULL,
  `tag` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `repair_count` INT NOT NULL DEFAULT '0',
  `score` DECIMAL(3,2) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`company_id`),
  KEY `info_bord_id` (`info_bord_id`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`info_bord_id`) REFERENCES `companiesinfo` (`info_bord_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 기기 테이블 생성
CREATE TABLE `devices` (
  `device_id` INT NOT NULL AUTO_INCREMENT,
  `brand_id` INT NOT NULL, -- 공통 코드의 브랜드 참조
  `device_type_id` INT NOT NULL, -- 공통 코드의 기기 타입 참조
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`device_id`),
  FOREIGN KEY (brand_id) REFERENCES common_codes (code_id),
  FOREIGN KEY (device_type_id) REFERENCES common_codes (code_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 회사-기기 연결 테이블 (다대다 관계)
CREATE TABLE `company_devices` (
  `company_device_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `device_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`company_device_id`),
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  FOREIGN KEY (`device_id`) REFERENCES `devices` (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 관심 업체 테이블
CREATE TABLE `intereststore` (
  `wishlist_id` INT NOT NULL AUTO_INCREMENT,
  `user_num` INT NOT NULL,
  `company_id` INT NOT NULL,
  `pick_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wishlist_id`),
  FOREIGN KEY (`user_num`) REFERENCES `users` (`user_num`),
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 지원서 테이블
CREATE TABLE `application_forms` (
  `form_id` INT NOT NULL AUTO_INCREMENT,
  `user_num` INT NOT NULL,
  `company_id` INT DEFAULT NULL,
  `application_path` MEDIUMTEXT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`form_id`),
  FOREIGN KEY (`user_num`) REFERENCES `users` (`user_num`),
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 지원서 파일 테이블
CREATE TABLE `application_files` (
  `file_id` INT NOT NULL AUTO_INCREMENT,
  `form_id` INT NOT NULL,
  `file_path` MEDIUMTEXT NOT NULL,
  `uploaded_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`),
  FOREIGN KEY (`form_id`) REFERENCES `application_forms` (`form_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 공지사항 테이블
CREATE TABLE `notices` (
  `notice_id` INT NOT NULL AUTO_INCREMENT,
  `content` MEDIUMTEXT NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `updated_at` DATETIME(6) DEFAULT NULL,
  `company_id` INT NOT NULL,
  `file_path` MEDIUMTEXT DEFAULT NULL,
  PRIMARY KEY (`notice_id`),
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 질문 테이블
CREATE TABLE `question` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `user_num` INT NOT NULL,
  `title` VARCHAR(30) DEFAULT NULL,
  `content` MEDIUMTEXT,
  `file_path` MEDIUMTEXT DEFAULT NULL,
  `answer_check` TINYINT(1) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_id`),
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  FOREIGN KEY (`user_num`) REFERENCES `users` (`user_num`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 답변 테이블
CREATE TABLE `answer` (
  `answer_id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `user_num` INT NOT NULL,
  `content` MEDIUMTEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`answer_id`),
  FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`),
  FOREIGN KEY (`user_num`) REFERENCES `users` (`user_num`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 리뷰 테이블
CREATE TABLE `reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `user_num` INT NOT NULL,
  `company_id` INT NOT NULL,
  `comment` MEDIUMTEXT,
  `images_url` MEDIUMTEXT DEFAULT NULL,
  `score` DOUBLE DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  FOREIGN KEY (`user_num`) REFERENCES `users` (`user_num`),
  FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 질문 이미지 테이블
CREATE TABLE `questionimage` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `board_img_url` MEDIUMTEXT DEFAULT NULL,
  `display_order` TINYINT DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE device_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE brand_device_map (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand_id INT,
  device_type_id INT,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (device_type_id) REFERENCES device_types(id),
  UNIQUE (brand_id, device_type_id)
);

-- 브랜드 데이터 삽입
INSERT INTO brands (name) VALUES
('삼성'), 
('LG'), 
('애플');

-- 기기 유형 데이터 삽입
INSERT INTO device_types (name) VALUES
('TV'), 
('스마트폰'), 
('노트북'), 
('태블릿');

-- 브랜드와 기기 유형 매핑 데이터 삽입
INSERT INTO brand_device_map (brand_id, device_type_id) VALUES
(1, 1),  -- 삼성 - TV
(1, 2),  -- 삼성 - 스마트폰
(1, 3),  -- 삼성 - 노트북
(1, 4),  -- 삼성 - 태블릿
(2, 1),  -- LG - TV
(2, 3),  -- LG - 노트북
(3, 2),  -- 애플 - 스마트폰
(3, 3);  -- 애플 - 노트북
