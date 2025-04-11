-- ===== Seed Users =====
INSERT INTO Users (name, email, password, user_type, created_at) VALUES
('Admin One', 'admin1@example.com', 'adminpass', 'admin', datetime('now')),
('Customer One', 'cust1@example.com', 'custpass', 'customer', datetime('now')),
('Customer Two', 'cust2@example.com', 'custpass', 'customer', datetime('now')),
('Customer Three', 'cust3@example.com', 'custpass', 'customer', datetime('now'));
