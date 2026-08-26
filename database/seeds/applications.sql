INSERT INTO applications (
    job_id,
    first_name,
    last_name,
    email,
    phone,
    national_id,
    skills,
    supporting_links,
    cover_letter,
    resume_filename,
    status
)
VALUES
(
    1,
    'Victor',
    'Kamau',
    'victor@example.com',
    '0712345678',
    '12345678',
    '["JavaScript", "Node.js", "Express"]',
    '{"portfolio": "https://victor-portfolio.com", "github": "https://github.com/victor-kamau"}',
    'I am interested in the Backend Developer role.',
    'victor-kamau.pdf',
    'Pending'
),
(
    1,
    'Jane',
    'Mwangi',
    'jane@example.com',
    '0723456789',
    '87654321',
    '["Python", "Django", "REST APIs"]',
    '{"portfolio": "https://jane-portfolio.com", "github": "https://github.com/jane-mwangi"}',
    'I have three years of backend experience.',
    'jane-mwangi.pdf',
    'Reviewed'
),
(
    2,
    'John',
    'Otieno',
    'john@example.com',
    '0734567890',
    '11223344',
    '["React", "Redux", "TypeScript"]',
    '{"portfolio": "https://john-portfolio.com", "github": "https://github.com/john-otieno"}',
    'React developer with five years of experience.',
    'john-otieno.pdf',
    'Shortlisted'
);