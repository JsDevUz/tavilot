const AUTH_KEY = 'tavilot_auth';
const PREF_KEY = 'tavilot_preferences';
const BOOKMARK_KEY = 'tavilot_bookmarks';

export function loadAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
  } catch {
    return null;
  }
}

export function saveAuth(auth) {
  if (!auth) localStorage.removeItem(AUTH_KEY);
  else localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function loadPreferences() {
  try {
    return JSON.parse(localStorage.getItem(PREF_KEY)) || { lang: 'uz' };
  } catch {
    return { lang: 'uz' };
  }
}

export function savePreferences(preferences) {
  localStorage.setItem(PREF_KEY, JSON.stringify(preferences));
}

export function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBookmarks(bookmarks) {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
}
