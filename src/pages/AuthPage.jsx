import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login, register } from '../services/authService';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/i18n';
import Button from '../components/Button';
import ErrorState from '../components/ErrorState';

export default function AuthPage({ mode = 'login', goHome, onRegister, onLogin }) {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  const setAuth = useAppStore((state) => state.setAuth);
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = mode === 'login' ? await login(phone, password) : await register(phone, password);
      setAuth(result);
      goHome();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-panel" onSubmit={submit}>
        <img className="auth-logo" src="/assets/png/logo.png" alt="Tavilot" />
        <div>
          <h1>{mode === 'login' ? t(lang, 'hi') : t(lang, 'registerToContinue')}</h1>
          <p>{t(lang, 'enterLoginAndPassword')}</p>
        </div>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={t(lang, 'phoneNumber')} />
        <label className="password-field">
          <input
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t(lang, 'password')}
          />
          <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </label>
        {error && <ErrorState error={error} />}
        <Button className="wide-button" disabled={loading}>
          {loading ? '...' : t(lang, 'continueForApp')}
        </Button>
        {mode === 'login' ? (
          <Button type="button" variant="ghost" className="wide-button" onClick={onRegister}>
            {t(lang, 'register')}
          </Button>
        ) : (
          <Button type="button" variant="ghost" className="wide-button" onClick={onLogin}>
            {t(lang, 'enterWithPassword')}
          </Button>
        )}
      </form>
      <aside className="auth-art">
        <button className="skip-button" onClick={goHome}>
          {t(lang, 'skip')} <span>›</span>
        </button>
        <div className="book-cover" />
      </aside>
    </section>
  );
}
