import { describe, expect, it, vi } from "vitest";
import {
  API_BASE_URL,
  ApiError,
  apiRequest,
  normalizeEnvelope,
  normalizePhone,
} from "./api";
import {
  getLibraryDetail,
  getLibraryList,
  librarySections,
} from "./libraryService";
import { getChapter, listChapters } from "./quranService";

describe("api helpers", () => {
  it("uses the Flet app API host as the default base URL", () => {
    expect(API_BASE_URL).toBe("http://alquran.zerodev.uz");
  });

  it("unwraps successful Tavilot response envelopes", () => {
    expect(normalizeEnvelope({ ok: true, result: [{ id: 1 }] })).toEqual([
      { id: 1 },
    ]);
  });

  it("throws ApiError for failed response envelopes", () => {
    expect(() =>
      normalizeEnvelope({
        ok: false,
        detail: "Unauthorized",
        error_code: 401,
        result: "",
      }),
    ).toThrow(ApiError);
  });

  it("normalizes Uzbek phone numbers the same way as the Flutter client", () => {
    expect(normalizePhone("+998 90 123 45 67")).toBe("+998901234567");
  });

  it("sends language and bearer token headers", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, result: { id: 7 } }),
    });

    const result = await apiRequest("/api/v1/chapters/", {
      token: "access-token",
      lang: "kr",
      fetcher,
    });

    expect(result).toEqual({ id: 7 });
    expect(fetcher).toHaveBeenCalledWith(
      "http://38.242.217.124:5001/api/v1/chapters/",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Accept-Language": "kr",
          Authorization: "Bearer access-token",
        }),
      }),
    );
  });
});

describe("Flet-aligned service routes", () => {
  it("uses api v2 for Quran and library content", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, result: [] }),
    });

    await listChapters({ fetcher });
    await getChapter(3, { fetcher });
    await getLibraryList(librarySections[0], { fetcher });
    await getLibraryDetail(librarySections[2], 8, { fetcher });

    expect(fetcher.mock.calls.map(([url]) => url)).toEqual([
      "http://38.242.217.124:5001/api/v1/chapters/",
      "http://38.242.217.124:5001/api/v1/chapter/3/",
      "http://38.242.217.124:5001/api/v1/moturudiy/?page_size=30",
      "http://38.242.217.124:5001/api/v1/studies/8/",
    ]);
  });
});
