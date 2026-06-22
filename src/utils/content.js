export function getTitle(item) {
  return item?.title || item?.name || item?.chapter_name || item?.chapterName || item?.translation?.title || `#${item?.id || ''}`;
}

export function getDescription(item) {
  return item?.description || item?.text || item?.content || item?.body || item?.translation?.description || '';
}

export function getItems(payload) {
  if (Array.isArray(payload)) return payload;
  return payload?.results || payload?.items || payload?.data || [];
}

export function getVerseNumber(verse, fallback) {
  return verse?.number || verse?.verse_number || verse?.verseNumber || fallback + 1;
}

export function getVerses(payload) {
  return payload?.verses || payload?.ayahs || payload?.chapters?.flatMap((chapter) => chapter.verses || []) || [];
}
