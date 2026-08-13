USE career_portal;

INSERT INTO users (
    first_name,
    last_name,
    email,
    password_hash,
    role
)
VALUES (
    'Victor',
    'Kamau',
    'admin@example.com',
    '$2b$12$iEcZabc6TZA5JrTz1BcFiuoTv06VsQfUqvGYH.X18MpxQTGDlQBFO',
    'admin'
);