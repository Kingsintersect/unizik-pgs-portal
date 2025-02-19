export interface SessionData {
  expiresAt: number;
  [key: string]: any;
}
export interface LoginSession {
  id: string;
  role: string;
  token: string;
}
export interface SSOAuthSession {
  authCode: string;
  clientId: string;
  expiresAt: number;
}
