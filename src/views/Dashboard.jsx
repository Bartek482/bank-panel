import { useState } from 'react';
import Transfer from './Transfer';
import '../css/Dashboard.css';

function Dashboard({ user, onLogout }) {
    const [showTransfer, setShowTransfer] = useState(false);
    const [account, setAccount] = useState(user);

    const handleTransfer = (form) => {
        const amount = parseFloat(form.amount);
        const updatedBalance = account.balance - amount;
        const newHistory = [
            {
                date: new Date().toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                title: form.recipient,
                category: 'Przelew wychodzący',
                amount: -amount,
            },
            ...account.history,
        ];
        setAccount({ ...account, balance: updatedBalance, history: newHistory });
        setShowTransfer(false);
    };

    if (showTransfer) {
        return <Transfer user={account} onBack={() => setShowTransfer(false)} onTransfer={handleTransfer} />;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <nav className="menu">
                        <span>Bank</span>
                        <span>Płatności</span>
                        <span>Historia</span>
                        <span>Twoje produkty</span>
                    </nav>
                </div>
                <div className="header-right">
                    <span className="username">{account.name}</span>
                    <button className="logout" onClick={onLogout}>Wyloguj</button>
                </div>
            </header>

            <main className="account-panel">
                <section className="account-box">
                    <h2>Konto</h2>
                    <p className="account-number">{account.accountNumber}</p>
                    <p className="balance-label">Dostępne środki</p>
                    <p className="balance-value">{account.balance.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN</p>
                    <div className="actions">
                        <button className="btn red" onClick={() => setShowTransfer(true)}>Nowy przelew</button>
                        <button className="btn outline">Historia rachunku</button>
                    </div>
                </section>

                <section className="history-box">
                    <h3>Historia operacji</h3>
                    <table className="transactions">
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Odbiorca / Nadawca / Tytuł</th>
                            <th>Kategoria</th>
                            <th>Kwota</th>
                        </tr>
                        </thead>
                        <tbody>
                        {account.history.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.date}</td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td className={item.amount < 0 ? 'negative' : 'positive'}>
                                    {item.amount.toFixed(2)} PLN
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;