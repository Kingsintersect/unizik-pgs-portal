import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
import { verifyAuthCode } from "@/lib/utils/sso/authCode";
import { generateAccessToken } from "@/lib/utils/sso/jwt";
import { ssoSessionKey } from "@/lib/definitions";

export async function POST(req: NextRequest) {
  let body;

  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      body = qs.parse(text); // Try qs.parse()

      // Fallback if qs.parse() fails
      if (!body || Object.keys(body).length === 0) {
        body = Object.fromEntries(new URLSearchParams(text));
      }
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Check for required fields
  const { code, client_id, client_secret, grant_type } = body;

  if (!code || !client_id || !client_secret) {
    console.error("Missing parameters:", { code, client_id, client_secret });
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Ensure grant_type is correct
  if (grant_type !== "authorization_code") {
    console.error("INVALIDE GRANT TYPE", grant_type);
    return NextResponse.json({ error: "Invalid grant type" }, { status: 400 });
  }

  const isCodeValid = await verifyAuthCode(ssoSessionKey, code, client_id);
  console.log("Auth Code Valid:", isCodeValid);
  if (!isCodeValid) {
    return NextResponse.json(
      { error: "Invalid authorization code" },
      { status: 400 }
    );
  }

  // Generate an access token

  const sub = "23";
  const nonce = "sessionData?.nounce";
  const issuer = "http://127.0.0.1:3100";

  console.log({ client_id, sub, nonce, issuer });

  const accessToken = await generateAccessToken(client_id, sub, nonce, issuer);
  // const accessToken = await generateAccessToken(client_id);
  const idToken = await generateAccessToken(client_id, sub, nonce, issuer);
  console.log("GEREATED ACCESS TOKEN", accessToken);
  return NextResponse.json({
    id_token: idToken,
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 3600,
  });
}
