import { librarySections } from '../services/libraryService';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/i18n';

const cardArt = [
  'category-moturudiy.svg',
  'category-quran.png',
  'category-manuscript.png',
  'category-studies.png',
  'category-resources.png',
  'category-refusal.png',
];

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
        <img src="/assets/flet/tavilot-logo.png" alt="Ta'vilot Al-Quran" />
      </div>
      <div className="home-grid">
        {cards.map((card, index) => (
          <button className="home-card" key={card.title} onClick={card.action}>
            <div className="home-card-art">
              <img className="home-card-book" src="/assets/flet/book-open.svg" alt="" />
              <img src={`/assets/flet/${cardArt[index]}`} alt="" />
            </div>
            <span>{card.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
