CREATE TABLE IF NOT EXISTS users 
(
    device_id VARCHAR(255) PRIMARY KEY, 
    location_x FLOAT DEFAULT 0,
    location_y FLOAT DEFAULT 0,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);