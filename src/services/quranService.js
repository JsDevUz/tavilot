import { apiRequest } from './api';

export const listChapters = (params) => apiRequest('/api/v1/chapters/', params);
export const getChapter = (id, params) => apiRequest(`/api/v1/chapter/${id}/`, params);
export const listJuz = (params) => apiRequest('/api/v1/juz/', params);
export const getJuz = (id, params) => apiRequest(`/api/v1/juz/${id}/`, params);
export const searchQuran = (q, searchType = 1, params = {}) =>
  apiRequest('/api/v1/search/', { ...params, query: { q, search_type: searchType } });
