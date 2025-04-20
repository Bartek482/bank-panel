DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE,
    password TEXT,
    name TEXT,
    accountNumber TEXT UNIQUE,
    balance REAL
);

DROP TABLE IF EXISTS transfers;

CREATE TABLE transfers (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           sender TEXT,
                           recipient TEXT,
                           recipientName TEXT,
                           title TEXT,
                           amount REAL,
                           date TEXT
);

INSERT INTO users (login, password, name, accountNumber, balance)
VALUES ('12345678', 'haslo123', 'Jan Kowalski', '12124063481111001012345678', 1459.11);

INSERT INTO users (login, password, name, accountNumber, balance)
VALUES ('87654321', 'abc123', 'Anna Nowak', '12124063481111001099998888', 800.00);
