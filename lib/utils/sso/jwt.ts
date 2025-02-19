import { getSession } from "@/lib/session";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretkey"
);

export async function generateAccessToken(
  client_id: string,
  sub: string,
  nonce: string,
  issuer: string
) {
  const payload = {
    iss: issuer,
    sub: sub,
    aud: client_id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    nonce: nonce,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.exp)
    .sign(secret);

  return token;
}

export async function validateAccessToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return !!payload.clientId;
  } catch (error) {
    return false;
  }
}

export async function getUserFromToken(token: string): Promise<any | null> {
  const ssoAuthSession = await getSession("sso_auth_token");
  if (!ssoAuthSession) return null;

  return {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    role: "student",
    email: "johndoe@example.com",
  };
}