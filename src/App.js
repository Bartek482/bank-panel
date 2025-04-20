import './App.css';
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    if (step === 1 && username.trim()) {
      setStep(2);
    }
  };

  return (
      <div className="app-container">
        <div className="card">
          <div className="card-header">
            <h2>Logowanie do Pekao24</h2>
            <div className="flags">
              <span role="img" aria-label="UK">🇬🇧</span>
              <span role="img" aria-label="UA">🇺🇦</span>
            </div>
          </div>

          {step === 1 && (
              <>
                <label className="label">Wpisz numer klienta / nazwę użytkownika</label>
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
                <button className="button">Zaloguj się</button>
              </>
          )}

          <div className="info">
            <p><span className="date">15.04.2025</span> Planujesz wyjazd na majówkę? Uważaj  oszuści szykują dla Ciebie ofertę. <a href="#">Więcej &gt;</a></p>
            <p><span className="date">03.03.2025</span> Bezpieczne hasło, czyli jakie? Sprawdź, jak stworzyć silne hasło. <a href="#">Więcej &gt;</a></p>
          </div>

          <div className="security">Bezpieczeństwo</div>
        </div>
      </div>
  );
}

export default App;

