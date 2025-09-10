-- YumBook 데이터베이스 초기화 스크립트

-- 데이터베이스 생성 (이미 docker-compose에서 생성됨)
-- CREATE DATABASE IF NOT EXISTS yumbook;
-- USE yumbook;

-- 사용자 생성 및 권한 부여
CREATE USER IF NOT EXISTS 'yumbook_user'@'%' IDENTIFIED BY 'yumbook_pass_2024';
GRANT ALL PRIVILEGES ON yumbook.* TO 'yumbook_user'@'%';
FLUSH PRIVILEGES;

-- 테이블 생성 (Spring Boot JPA가 자동 생성하지만 명시적으로 작성)
USE yumbook;

-- 레시피 테이블
CREATE TABLE IF NOT EXISTS recipe (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT,
    instructions TEXT,
    difficulty VARCHAR(50),
    cooking_time VARCHAR(100),
    servings VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
