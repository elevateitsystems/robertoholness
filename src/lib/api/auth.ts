const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export const authApi = {
  async register(data: any) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: "omit", // No cookies needed for register
    });
    const result = await response.json();
    console.log("result", result);
    if (!response.ok) throw new Error(result.message || "Registration failed");
    return result;
  },

  async login(data: any) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: "include", // Important for cookies
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Login failed");
    return result;
  },

  async verifyEmail(data: { email: string; code: string }) {
    const response = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Verification failed");
    return result;
  },

  async resendEmailVerification(data: { email: string }) {
    const response = await fetch(`${API_URL}/auth/resend-email-verification`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: "omit",
    });
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || "Failed to resend code");
    return result;
  },

  async forgotPassword(data: { email: string }) {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: "omit",
    });
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || "Failed to send reset link");
    return result;
  },

  async resetPassword(data: {
    email: string;
    code: string;
    newPassword: string;
  }) {
    // Note: Based on backend, we have verify-reset-password-OTP and reset-password.
    // The reset-password takes { email, newPassword }, but wait, auth.service.ts says:
    // verifyResetPasswordOTP takes { email, code }
    // resetPassword takes { email, newPassword }
    // We can just call resetPassword if the backend checks the OTP, but auth.service.ts says:
    // `hasVerifiedOTP(email, OTPType.password_reset)`
    // So the frontend needs to call verify-reset-password-OTP first, THEN reset-password.

    // Step 1: verify
    const verifyRes = await fetch(`${API_URL}/auth/verify-reset-password-OTP`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email: data.email, code: data.code }),
    });
    const verifyResult = await verifyRes.json();
    if (!verifyRes.ok) throw new Error(verifyResult.message || "Invalid code");

    // Step 2: reset
    const resetRes = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        email: data.email,
        newPassword: data.newPassword,
      }),
    });
    const resetResult = await resetRes.json();
    if (!resetRes.ok)
      throw new Error(resetResult.message || "Failed to reset password");

    return resetResult;
  },

  async getProfile() {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || "Failed to fetch profile");
    return result.data; // BaseController wraps with { data: ... }
  },

  async logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: getHeaders(),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Logout failed");
    return true;
  },
};
