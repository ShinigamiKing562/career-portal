CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    job_id INT NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,

    cover_letter TEXT,

    resume_filename VARCHAR(255),

    status ENUM(
        'Submitted',
        'Under Review',
        'Interview',
        'Offer',
        'Rejected',
        'Withdrawn'
    ) DEFAULT 'Submitted',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_application_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_job_email
        UNIQUE (job_id, email),

    INDEX idx_applications_job (job_id),
    INDEX idx_applications_email (email),
    INDEX idx_applications_status (status)
);