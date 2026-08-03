BEGIN;

-- Insert administrator profile

INSERT INTO profiles (
    id,
    email,
    first_name,
    last_name,
    display_name,
    is_active
)
SELECT
    u.id,
    u.email,
    'Alexandre',
    'Twagirimana',
    'Alexandre',
    TRUE
FROM auth.users u
WHERE u.email = 'liteorbit01@gmail.com'
AND NOT EXISTS (
    SELECT 1
    FROM profiles p
    WHERE p.id = u.id
);

-- Assign ADMIN role

INSERT INTO profile_roles (
    profile_id,
    role_id
)
SELECT
    u.id,
    r.id
FROM auth.users u
JOIN roles r
    ON r.code = 'ADMIN'
WHERE u.email = 'liteorbit01@gmail.com'
AND NOT EXISTS (
    SELECT 1
    FROM profile_roles pr
    WHERE pr.profile_id = u.id
      AND pr.role_id = r.id
);

COMMIT;