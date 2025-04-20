import { useState } from 'react';
import '../css/Transfer.css';

function Transfer({ user, onBack, onTransfer }) {
    const [form, setForm] = useState({
        recipient: '',
        account: '',
        title: 'Przelew środków',
        amount: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { recipient, account, amount } = form;
        if (!recipient.trim() || !account.trim() || !amount) {
            return 'Uzupełnij wszystkie wymagane pola';
        }
        if (!/^\d{26}$/.test(account)) {
            return 'Numer rachunku musi mieć dokładnie 26 cyfr';
        }
        if (parseFloat(amount) <= 0) {
            return 'Kwota musi być większa niż 0';
        }
        return '';
    };

    const handleNext = () => {
        const validationError = validate();
        if (validationError) {
            setError(validationError);
        } else {
            setError('');
            setStep(2);
        }
    };

    const handleConfirm = async () => {
        const transferData = {
            from: user.login,
            toAccount: form.account,
            amount: parseFloat(form.amount),
            title: form.title,
            recipientName: form.recipient,
        };

        try {
            const res = await fetch('http://localhost:3001/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transferData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                onTransfer(form);
            } else {
                alert(data.message || 'Błąd wykonania przelewu');
            }
        } catch (err) {
            alert('Nie udało się połączyć z serwerem');
        }
    };

    return (
        <div className="transfer-form">
            <h2>Nowy przelew</h2>

            {step === 1 && (
                <div className="form-fields">
                    <div className="field">
                        <label>Do odbiorcy</label>
                        <input
                            name="recipient"
                            value={form.recipient}
                            onChange={handleChange}
                            placeholder="Wpisz imię i nazwisko"
                        />
                    </div>
                    <div className="field">
                        <label>Na rachunek</label>
                        <input
                            name="account"
                            value={form.account}
                            onChange={handleChange}
                            placeholder="Wpisz numer rachunku odbiorcy (26 cyfr)"
                        />
                    </div>
                    <div className="field">
                        <label>Tytuł</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label>Kwota</label>
                            <input
                                name="amount"
                                type="number"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="Wpisz kwotę"
                            />
                        </div>
                        <div className="field">
                            <label>Data przelewu</label>
                            <input
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="actions">
                        <button className="btn outline" onClick={onBack}>Anuluj</button>
                        <button className="btn red" onClick={handleNext}>Dalej</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="summary">
                    <h3>Potwierdzenie przelewu</h3>
                    <p><strong>Odbiorca:</strong> {form.recipient}</p>
                    <p><strong>Numer rachunku:</strong> {form.account}</p>
                    <p><strong>Kwota:</strong> {parseFloat(form.amount).toFixed(2)} PLN</p>
                    <p><strong>Data przelewu:</strong> {form.date}</p>
                    <p><strong>Tytuł:</strong> {form.title}</p>

                    <div className="actions">
                        <button className="btn outline" onClick={() => setStep(1)}>Wstecz</button>
                        <button className="btn red" onClick={handleConfirm}>Zatwierdź</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transfer;