CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,

    employment_type ENUM(
        'Full-time',
        'Part-time',
        'Contract',
        'Internship',
        'Temporary',
        'Remote'
    ) NOT NULL,

    description TEXT NOT NULL,
    requirements TEXT NOT NULL,

    salary DECIMAL(10,2) NOT NULL,
    currency CHAR(3) DEFAULT 'KES' NOT NULL,

    image_path VARCHAR(255) NOT NULL,

    deadline DATE NOT NULL,

    status ENUM(
        'Draft',
        'Open',
        'Closed',
        'Archived'
    ) DEFAULT 'Draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_jobs_status (status),
    INDEX idx_jobs_department (department),
    INDEX idx_jobs_location (location),
    INDEX idx_jobs_deadline (deadline)
);