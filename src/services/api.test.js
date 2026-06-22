import { describe, expect, it, vi } from 'vitest';
import { ApiError, apiRequest, normalizeEnvelope, normalizePhone } from './api';

describe('api helpers', () => {
  it('unwraps successful Tavilot response envelopes', () => {
    expect(normalizeEnvelope({ ok: true, result: [{ id: 1 }] })).toEqual([{ id: 1 }]);
  });

  it('throws ApiError for failed response envelopes', () => {
    expect(() =>
      normalizeEnvelope({ ok: false, detail: 'Unauthorized', error_code: 401, result: '' }),
    ).toThrow(ApiError);
  });

  it('normalizes Uzbek phone numbers the same way as the Flutter client', () => {
    expect(normalizePhone('+998 90 123 45 67')).toBe('+998901234567');
  });

  it('sends language and bearer token headers', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, result: { id: 7 } }),
    });

    const result = await apiRequest('/api/v1/chapters/', {
      token: 'access-token',
      lang: 'kr',
      fetcher,
    });

    expect(result).toEqual({ id: 7 });
    expect(fetcher).toHaveBeenCalledWith(
      'http://38.242.217.124:5001/api/v1/chapters/',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Accept-Language': 'kr',
          Authorization: 'Bearer access-token',
        }),
      }),
    );
  });
});
