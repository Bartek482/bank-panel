const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// logowanie
app.post('/login', (req, res) => {
    const { login, password } = req.body;
    db.get(
        'SELECT * FROM users WHERE login = ? AND password = ?',
        [login, password],
        (err, row) => {
            if (err) return res.status(500).json({ message: 'Błąd serwera' });
            if (!row) return res.status(401).json({ message: 'Niepoprawny login lub hasło' });

            db.all(
                'SELECT * FROM transfers WHERE sender = ? OR recipient = ? ORDER BY date DESC',
                [row.login, row.accountNumber],
                (err2, history) => {
                    if (err2) return res.status(500).json({ message: 'Błąd historii przelewów' });
                    res.json({ user: { ...row, history } });
                }
            );
        }
    );
});

// przelew z zapisem historii
app.post('/transfer', (req, res) => {
    const { from, toAccount, amount, title, recipientName } = req.body;
    const date = new Date().toISOString().split('T')[0];

    db.serialize(() => {
        db.get('SELECT * FROM users WHERE accountNumber = ?', [toAccount], (err, recipient) => {
            if (err || !recipient) return res.status(404).json({ message: 'Nie znaleziono odbiorcy' });

            db.run('UPDATE users SET balance = balance - ? WHERE login = ?', [amount, from]);
            db.run('UPDATE users SET balance = balance + ? WHERE accountNumber = ?', [amount, toAccount]);

            db.run(
                `INSERT INTO transfers (sender, recipient, recipientName, title, amount, date)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [from, toAccount, recipientName, title, amount, date],
                (err2) => {
                    if (err2) return res.status(500).json({ message: 'Błąd zapisu przelewu' });
                    res.json({ success: true });
                }
            );
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server działa na http://localhost:${PORT}`);
});
