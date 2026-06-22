import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import BackButton from '../components/BackButton';
import ErrorState from '../components/ErrorState';
import Loading from '../components/Loading';
import { useAsync } from '../hooks/useAsync';
import { getLibraryDetail, getLibraryList } from '../services/libraryService';
import { useAppStore, useAuthSnapshot } from '../store/useAppStore';
import { getDescription, getItems, getTitle } from '../utils/content';
import { t } from '../utils/i18n';

export default function LibraryPage({ section, goHome }) {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  const { token } = useAuthSnapshot();
  const [selected, setSelected] = useState(null);
  const list = useAsync(() => getLibraryList(section, { lang, token }), [section.key, lang, token]);

  useEffect(() => setSelected(null), [section.key]);

  const detail = useAsync(
    () => (selected ? getLibraryDetail(section, selected.id, { lang, token }) : Promise.resolve(null)),
    [section.key, selected?.id, lang, token],
  );

  const items = getItems(list.data);
  const active = detail.data || selected;

  return (
    <section className="library-page">
      <BackButton onClick={goHome} />
      <div className="section-heading">
        <h1>{t(lang, section.titleKey)}</h1>
      </div>
      {list.loading && <Loading />}
      {list.error && <ErrorState error={list.error} onRetry={list.refresh} />}
      {!list.loading && !list.error && (
        <div className="library-layout">
          <aside className="library-list">
            {items.map((item) => (
              <button key={item.id || getTitle(item)} className={selected?.id === item.id ? 'active' : ''} onClick={() => setSelected(item)}>
                {getTitle(item)}
              </button>
            ))}
            {!items.length && <div className="muted">Ma'lumot topilmadi</div>}
          </aside>
          <article className="library-detail">
            {detail.loading && selected && <Loading />}
            {!selected && <div className="empty-reader">{t(lang, 'open')}</div>}
            {active && !detail.loading && (
              <>
                <h2>{getTitle(active)}</h2>
                <ReactMarkdown>{getDescription(active)}</ReactMarkdown>
              </>
            )}
          </article>
        </div>
      )}
    </section>
  );
}
