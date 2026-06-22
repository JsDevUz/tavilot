import { apiRequest } from './api';

export const librarySections = [
  { key: 'moturudiy', titleKey: 'abuMansurMotrudiy', path: '/api/v1/moturudiy/' },
  { key: 'manuscript', titleKey: 'manuscriptAndComments', path: '/api/v1/manuscript/' },
  { key: 'studies', titleKey: 'modernStudies', path: '/api/v1/studies/' },
  { key: 'resources', titleKey: 'resources', path: '/api/v1/resources/' },
  { key: 'refusal', titleKey: 'rebuttalsToFanaticism', path: '/api/v1/refusal/' },
];

export function getLibraryList(section, params = {}) {
  return apiRequest(section.path, { ...params, query: { page_size: 30 } });
}

export function getLibraryDetail(section, id, params = {}) {
  return apiRequest(`${section.path}${id}/`, params);
}

export const getAbout = (params) => apiRequest('/api/v1/about/', params);
