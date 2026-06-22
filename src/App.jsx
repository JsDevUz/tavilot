import { useState } from 'react';
import { LogOut, Search } from 'lucide-react';
import { useAppStore, useAuthSnapshot } from './store/useAppStore';
import { primaryNav } from './data/nav';
import { t } from './utils/i18n';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import LibraryPage from './pages/LibraryPage';
import QuranPage from './pages/QuranPage';
import PremiumPage from './pages/PremiumPage';
import AboutPage from './pages/AboutPage';
import Button from './components/Button';
import Logo from './components/Logo';
import LanguageMenu from './components/LanguageMenu';

const initialView = { name: 'home' };

export default function App() {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  const logout = useAppStore((state) => state.logout);
  const { isAuthed } = useAuthSnapshot();
  const [view, setView] = useState(initialView);
  const [search, setSearch] = useState('');

  const openLibrary = (section) => setView({ name: 'library', section });
  const openQuran = () => setView({ name: 'quran' });

  function renderPage() {
    if (view.name === 'login') return <AuthPage mode="login" goHome={() => setView(initialView)} onRegister={() => setView({ name: 'register' })} />;
    if (view.name === 'register') return <AuthPage mode="register" goHome={() => setView(initialView)} onLogin={() => setView({ name: 'login' })} />;
    if (view.name === 'library') return <LibraryPage section={view.section} goHome={() => setView(initialView)} />;
    if (view.name === 'quran') return <QuranPage search={search} setSearch={setSearch} goHome={() => setView(initialView)} />;
    if (view.name === 'premium') return <PremiumPage goHome={() => setView(initialView)} />;
    if (view.name === 'about') return <AboutPage goHome={() => setView(initialView)} />;
    return <HomePage openLibrary={openLibrary} openQuran={openQuran} />;
  }

  const activeKey = view.name === 'library' ? view.section.key : view.name;

  return (
    <div className="app-shell">
      {view.name !== 'login' && view.name !== 'register' && (
        <header className="topbar">
          <button className="logo-button" onClick={() => setView(initialView)} aria-label="Home">
            <Logo />
          </button>
          <nav className="nav-list">
            {primaryNav.map((item) => (
              <button
                key={item.type === 'quran' ? 'quran' : item.section.key}
                className={`nav-item ${activeKey === (item.section?.key || 'quran') ? 'active' : ''}`}
                onClick={() => (item.type === 'quran' ? openQuran() : openLibrary(item.section))}
              >
                {t(lang, item.titleKey || item.section.titleKey)}
              </button>
            ))}
          </nav>
          {view.name === 'quran' ? (
            <label className="top-search">
              <Search size={18} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t(lang, 'search')} />
            </label>
          ) : (
            <div className="top-actions">
              <LanguageMenu />
              <Button variant="ghost" onClick={() => setView({ name: isAuthed ? 'premium' : 'login' })}>
                {isAuthed ? t(lang, 'premiumVersion') : t(lang, 'enterWithPassword')}
              </Button>
              {isAuthed ? (
                <button className="icon-button" onClick={logout} title="Logout">
                  <LogOut size={20} />
                </button>
              ) : (
                <Button onClick={() => setView({ name: 'login' })}>{t(lang, 'continueForApp')}</Button>
              )}
            </div>
          )}
        </header>
      )}
      <main className={view.name === 'quran' ? 'reader-main' : 'page-main'}>{renderPage()}</main>
    </div>
  );
}
