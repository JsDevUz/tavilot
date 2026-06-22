import { create } from 'zustand';
import { loadAuth, loadBookmarks, loadPreferences, saveAuth, saveBookmarks, savePreferences } from '../utils/storage';

export const useAppStore = create((set, get) => ({
  auth: loadAuth(),
  preferences: loadPreferences(),
  bookmarks: loadBookmarks(),
  get token() {
    const auth = get().auth;
    return auth?.access || auth?.access_token || auth?.token || null;
  },
  get lang() {
    return get().preferences.lang || 'uz';
  },
  setAuth: (auth) => {
    saveAuth(auth);
    set({ auth });
  },
  logout: () => {
    saveAuth(null);
    set({ auth: null });
  },
  setLang: (lang) =>
    set((state) => {
      const preferences = { ...state.preferences, lang };
      savePreferences(preferences);
      return { preferences };
    }),
  toggleBookmark: (bookmark) =>
    set((state) => {
      const exists = state.bookmarks.some((item) => item.chapterId === bookmark.chapterId && item.verse === bookmark.verse);
      const bookmarks = exists
        ? state.bookmarks.filter((item) => !(item.chapterId === bookmark.chapterId && item.verse === bookmark.verse))
        : [...state.bookmarks, bookmark];
      saveBookmarks(bookmarks);
      return { bookmarks };
    }),
}));

export function useAuthSnapshot() {
  const auth = useAppStore((state) => state.auth);
  return {
    auth,
    isAuthed: Boolean(auth),
    token: auth?.access || auth?.access_token || auth?.token || null,
  };
}
