CREATE TABLE applications (
    id INT NOT NULL AUTO_INCREMENT,
    job_id INT NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    national_id VARCHAR(50) NOT NULL,
    gender ENUM(
        'Male',
        'Female',
        'Other'
    ) NOT NULL,
    location VARCHAR(100) NOT NULL,

    skills JSON NOT NULL,

    previous_position TEXT NOT NULL,
    previous_workplace TEXT NOT NULL,
    years_of_experience INT NOT NULL,
    position_description TEXT NOT NULL,

    highest_education ENUM(
        'High School',
        'Diploma',
        'Bachelor\'s Degree',
        'Master\'s Degree',
        'Doctorate'
    ) NOT NULL,
    major VARCHAR(100) NOT NULL,
    education_institution VARCHAR(255) NOT NULL,
    graduation_year YEAR,

    supporting_links JSON NULL,

    cover_letter TEXT NOT NULL,

    resume_filename VARCHAR(255) NOT NULL,

    status ENUM(
        'Pending',
        'Reviewing',
        'Interview',
        'Accepted',
        'Rejected'
    ) NOT NULL DEFAULT 'Pending',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_applications_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE
);