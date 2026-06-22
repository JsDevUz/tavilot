import { librarySections } from '../services/libraryService';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/i18n';

const icons = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

export default function HomePage({ openLibrary, openQuran }) {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  const cards = [
    { title: t(lang, librarySections[0].titleKey), action: () => openLibrary(librarySections[0]) },
    { title: t(lang, 'tavilotAlQuran'), action: openQuran },
    ...librarySections.slice(1).map((section) => ({ title: t(lang, section.titleKey), action: () => openLibrary(section) })),
  ];

  return (
    <section className="home-page">
      <div className="home-hero">
        <img src="/assets/png/blog_logo.png" alt="Ta'vilot Al-Quran" />
      </div>
      <div className="home-grid">
        {cards.map((card, index) => (
          <button className="home-card" key={card.title} onClick={card.action}>
            <img src={`/assets/svg/${icons[index] || 'book'}.svg`} alt="" />
            <span>{card.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
