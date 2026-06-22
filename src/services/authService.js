import { apiRequest, normalizePhone } from './api';

export function login(phoneNumber, password) {
  return apiRequest('/api/v1/auth/login/', {
    method: 'POST',
    body: { phone_number: normalizePhone(phoneNumber), password },
  });
}

export function register(phoneNumber, password) {
  return apiRequest('/api/v1/auth/register/', {
    method: 'POST',
    body: { phone_number: normalizePhone(phoneNumber), password },
  });
}

export function verifyOtp(otpKey, otpCode) {
  return apiRequest('/api/v1/auth/verify/', {
    method: 'POST',
    body: { otp_key: otpKey, otp_code: Number(otpCode) },
  });
}

export function checkSubscription(token) {
  return apiRequest('/api/v1/auth/check/subscription/', { token });
}
