import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/i18n';

export default function PremiumPage({ goHome }) {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  const [payment, setPayment] = useState('payme');

  return (
    <section className="premium-page">
      <BackButton onClick={goHome} />
      <div className="premium-card">
        <div className="premium-banner">
          <h1>{t(lang, 'premiumVersion')}</h1>
        </div>
        <p className="premium-copy">{t(lang, 'withPremiumUWillGEt')}</p>
        <ul className="premium-list">
          <li><CheckCircle2 size={20} /> Tafsir matnlari to‘liq ochiladi</li>
          <li><CheckCircle2 size={20} /> Tafsir bo‘yicha qidiruv ishlaydi</li>
          <li><CheckCircle2 size={20} /> Xatcho‘plar brauzerda saqlanadi</li>
        </ul>
        <div className="payment-row">
          <span>{t(lang, 'chooseForSell')}</span>
          {['payme', 'click'].map((name) => (
            <button key={name} className={`payment-card ${payment === name ? 'active' : ''}`} onClick={() => setPayment(name)}>
              <img src={`/assets/flet/${name}.png`} alt={name} />
            </button>
          ))}
        </div>
        <Button variant="ghost" className="buy-button">{t(lang, 'buy')}</Button>
      </div>
    </section>
  );
}
