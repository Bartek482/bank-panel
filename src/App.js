import './App.css';
import { useState } from 'react';
import Dashboard from './views/Dashboard';

function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (step === 1 && username.trim()) {
      setStep(2);
    }
  };

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setLoggedInUser(data.user);
    } else {
      setError(data.message);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUsername('');
    setPassword('');
    setStep(1);
    setError('');
  };

  if (loggedInUser) {
    return <Dashboard user={loggedInUser} onLogout={handleLogout} />;
  }

  return (
      <div className="app-container">
        <div className="card">
          <div className="card-header">
            <h2>Logowanie do Banku</h2>
          </div>

          {step === 1 && (
              <>
                <label className="label">Wpisz numer klienta</label>
                <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <a href="#" className="link">Pomoc w logowaniu</a>
                <button className="button" onClick={handleNext}>Dalej</button>
              </>
          )}

          {step === 2 && (
              <>
                <label className="label">Wpisz hasło</label>
                <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#" className="link">Nie pamiętasz hasła?</a>
                <button className="button" onClick={handleLogin}>Zaloguj się</button>
                {error && <div className="error-message">{error}</div>}
              </>
          )}

        </div>
      </div>
  );
}

export default App;
