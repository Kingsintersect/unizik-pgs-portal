import crypto from "crypto";
import { deleteSessionKey, getSession, setSession } from "../../session";

export function generateAuthCode(): string {
  return crypto.randomBytes(16).toString("hex");
}

export async function saveAuthCode(key: string, reqData: Record<string, any>) {
  const expiresAt = Math.floor(Date.now() / 1000) + 10 * 60; // Expires in 10 minutes
  const authCode = generateAuthCode();

  await setSession(
    key,
    {
      ...reqData,
      authCode,
      expiresAt,
    },
    "10m" // Set session expiration to 10 minutes
  );

  return authCode;
}

// Verifies the authentication code and ensures it has not expired
export async function verifyAuthCode<T = Record<string, any>>(
  key: string,
  code: string,
  clientId: string
): Promise<boolean> {
  const sessionData = await getSession<T>(key);
  console.log("Retrieved session data:", sessionData);

  if (!sessionData) {
    console.log(`Auth Session Error: No session found for key => ${key}`);
    return false;
  }

  const { authCode, expiresAt } = sessionData

  // Check if the auth code matches
  if (!authCode || authCode !== code) {
    console.log("Invalid auth code provided");
    return false;
  }

  // Check if the auth code has expired
  if (expiresAt && expiresAt < Math.floor(Date.now() / 1000)) {
    console.log("Auth code has expired");
    await deleteSessionKey(key); // Remove expired session
    return false;
  }

  await deleteSessionKey(key); // Prevent reuse of the auth code
  return true;
}
