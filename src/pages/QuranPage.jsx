import { useEffect, useMemo, useState } from 'react';
import { Bookmark, BookmarkCheck, BookOpen, Layers, Search } from 'lucide-react';
import BackButton from '../components/BackButton';
import ErrorState from '../components/ErrorState';
import Loading from '../components/Loading';
import RichContent from '../components/RichContent';
import { useAsync } from '../hooks/useAsync';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { getChapter, getJuz, listChapters, listJuz, searchQuran } from '../services/quranService';
import { useAppStore, useAuthSnapshot } from '../store/useAppStore';
import { getTitle, getVerseNumber, getVerses } from '../utils/content';
import { t } from '../utils/i18n';

export default function QuranPage({ search, setSearch, goHome }) {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  const bookmarks = useAppStore((state) => state.bookmarks);
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);
  const { token } = useAuthSnapshot();
  const [mode, setMode] = useState('chapter');
  const [selectedId, setSelectedId] = useState(1);
  const [searchType, setSearchType] = useState(1);
  const debouncedSearch = useDebouncedValue(search.trim(), 300);

  const requestParams = useMemo(() => ({ lang, token }), [lang, token]);
  const chapters = useAsync(() => listChapters(requestParams), [lang, token]);
  const juzes = useAsync(() => listJuz(requestParams), [lang, token]);
  const detail = useAsync(
    () => (mode === 'chapter' ? getChapter(selectedId, requestParams) : getJuz(selectedId, requestParams)),
    [mode, selectedId, lang, token],
  );
  const searchResults = useAsync(
    () => (debouncedSearch ? searchQuran(debouncedSearch, searchType, requestParams) : Promise.resolve([])),
    [debouncedSearch, searchType, lang, token],
  );

  useEffect(() => {
    if (!search) return;
    setMode('chapter');
  }, [search]);

  const menuItems = mode === 'chapter' ? chapters.data || [] : juzes.data || [];
  const verses = getVerses(detail.data);
  const results = Array.isArray(searchResults.data) ? searchResults.data : searchResults.data?.results || [];

  function pickSearchResult(result) {
    const chapterId = result.chapter_id || result.chapterId || result.chapter;
    if (chapterId) {
      setSelectedId(chapterId);
      setMode('chapter');
    }
  }

  return (
    <section className="quran-page">
      <aside className="reader-sidebar">
        <BackButton onClick={goHome} />
        <div className="segmented">
          <button className={mode === 'chapter' ? 'active' : ''} onClick={() => setMode('chapter')}>
            <BookOpen size={16} /> {t(lang, 'chapters')}
          </button>
          <button className={mode === 'juz' ? 'active' : ''} onClick={() => setMode('juz')}>
            <Layers size={16} /> {t(lang, 'juzes')}
          </button>
        </div>
        {(chapters.loading || juzes.loading) && <Loading />}
        <div className="reader-menu">
          {menuItems.map((item, index) => (
            <button key={item.id || index} className={selectedId === item.id ? 'active' : ''} onClick={() => setSelectedId(item.id || index + 1)}>
              <span>{item.id || index + 1}</span>
              {getTitle(item)}
            </button>
          ))}
        </div>
      </aside>
      <article className="reader-content">
        {search && (
          <div className="search-panel">
            <div className="segmented compact">
              <button className={searchType === 1 ? 'active' : ''} onClick={() => setSearchType(1)}>{t(lang, 'arabic')}</button>
              <button className={searchType === 2 ? 'active' : ''} onClick={() => setSearchType(2)}>{t(lang, 'translate')}</button>
              <button className={searchType === 3 ? 'active' : ''} onClick={() => setSearchType(3)}>{t(lang, 'surahDescription')}</button>
            </div>
            <div className="search-results">
              {searchResults.loading && <Loading />}
              {results.map((result, index) => (
                <button key={`${result.chapter_id}-${result.number}-${index}`} onClick={() => pickSearchResult(result)}>
                  <Search size={14} />
                  {getTitle(result)} {result.number ? `: ${result.number}` : ''}
                </button>
              ))}
              {!searchResults.loading && !results.length && <span className="muted">Natija topilmadi</span>}
              <button className="clear-search" onClick={() => setSearch('')}>Yopish</button>
            </div>
          </div>
        )}
        {detail.loading && <Loading />}
        {detail.error && <ErrorState error={detail.error} onRetry={detail.refresh} />}
        {!detail.loading && detail.data && (
          <div className="chapter-paper">
            <header className="chapter-head">
              <h1>{getTitle(detail.data)}</h1>
              <p>
                {detail.data.place || detail.data.type || ''} {verses.length ? ` • ${verses.length} ${t(lang, 'verse')}` : ''}
              </p>
            </header>
            {verses.map((verse, index) => {
              const number = getVerseNumber(verse, index);
              const marked = bookmarks.some((item) => item.chapterId === selectedId && item.verse === number);
              return (
                <section className="verse-row" key={`${selectedId}-${number}-${index}`}>
                  <button
                    className="verse-number"
                    onClick={() => toggleBookmark({ chapterId: selectedId, verse: number, title: getTitle(detail.data) })}
                    title="Bookmark"
                  >
                    <span>{number}</span>
                    {marked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </button>
                  <div className="verse-body">
                    <p className="arabic-text">{verse.text_arabic || verse.textArabic || verse.arabic || ''}</p>
                    {verse.text && <p className="translation-text">{verse.text}</p>}
                    {verse.description && (
                      <div className="tafsir-text">
                        <RichContent>{verse.description}</RichContent>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
}
