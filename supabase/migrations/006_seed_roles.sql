BEGIN;

INSERT INTO roles (code, name, description)
VALUES
(
    'ADMIN',
    'Administrator',
    'Full access to Lite Orbit administration'
),
(
    'MANAGER',
    'Manager',
    'Manage products, inventory and orders'
),
(
    'CUSTOMER_SERVICE',
    'Customer Service',
    'Manage customers and orders'
)
ON CONFLICT (code) DO NOTHING;

COMMIT;