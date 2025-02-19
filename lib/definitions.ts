export type SessionPayload<T = Record<string, any>> = T & {
  issuedAt?: number;
  expiresAt: number;
};

 export const ssoSessionKey = "sso_auth_session";
 export const loginSessionKey = "login_session";