import axios from "axios";

export const API_BASE_URL = "https://api-dev-tavilot.kitobzor.uz";

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
  },
});

export class ApiError extends Error {
  constructor(message, status = 0, code = null, payload = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

export function normalizeEnvelope(payload, status = 200) {
  if (payload && typeof payload === "object" && "ok" in payload) {
    if (payload.ok) return payload.result;
    throw new ApiError(
      payload.detail || "Request failed",
      status,
      payload.error_code,
      payload,
    );
  }
  return payload;
}

export function normalizePhone(phone) {
  return String(phone || "").replace(/\s+/g, "");
}

function makeUrl(path, query) {
  const url = new URL(path, API_BASE_URL);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      url.searchParams.set(key, value);
  });
  return url.toString();
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    query,
    token,
    lang = "uz",
    fetcher = fetch,
    headers = {},
  } = options;
  const requestHeaders = {
    Accept: "application/json",
    "Accept-Language": lang,
    ...headers,
  };

  const init = { method, headers: requestHeaders };
  if (token) requestHeaders.Authorization = `Bearer ${token}`;
  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  if (fetcher !== fetch) {
    const response = await fetcher(makeUrl(path, query), init);
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        payload.detail || payload.message || "Request failed",
        response.status,
        payload.error_code,
        payload,
      );
    }

    return normalizeEnvelope(payload, response.status);
  }

  try {
    const response = await http.request({
      url: path,
      method,
      params: query,
      data: body,
      headers: requestHeaders,
    });
    return normalizeEnvelope(response.data, response.status);
  } catch (error) {
    const status = error.response?.status || 0;
    const payload = error.response?.data || null;
    if (payload?.ok === false) normalizeEnvelope(payload, status);
    throw new ApiError(
      payload?.detail || error.message || "Request failed",
      status,
      payload?.error_code,
      payload,
    );
  }
}
