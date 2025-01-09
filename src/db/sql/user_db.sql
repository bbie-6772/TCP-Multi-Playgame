-- users 테이블이 없을 경우 초기화 설정 
CREATE TABLE IF NOT EXISTS users 
(
    id VARCHAR(36) PRIMARY KEY, 
    device_id VARCHAR(255) NOT NULL UNIQUE,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- game_end 테이블이 없을 경우 초기화 설정 
CREATE TABLE IF NOT EXISTS game_end
(
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);