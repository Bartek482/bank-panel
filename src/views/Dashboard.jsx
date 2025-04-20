import '../css/Dashboard.css';

function Dashboard({ user, onLogout }) {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="https://www.pekao24.pl/pekao/img/logo.svg" alt="Bank Pekao" className="logo" />
                    <nav className="menu">
                        <span>Pekao24</span>
                        <span>Płatności</span>
                        <span>Historia</span>
                        <span>Twoje produkty</span>
                    </nav>
                </div>
                <div className="header-right">
                    <span className="username">{user.name}</span>
                    <button className="logout" onClick={onLogout}>Wyloguj</button>
                </div>
            </header>

            <main className="account-panel">
                <section className="account-box">
                    <h2>EUROKONTO INTRO</h2>
                    <p className="account-number">{user.accountNumber}</p>
                    <p className="balance-label">Dostępne środki</p>
                    <p className="balance-value">{user.balance.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN</p>
                    <div className="actions">
                        <button className="btn red">Nowy przelew</button>
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
                        {user.history.map((item, idx) => (
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