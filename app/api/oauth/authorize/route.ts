import { ssoSessionKey } from "@/lib/definitions";
import { saveAuthCode } from "@/lib/utils/sso/authCode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const clientId = url.searchParams.get("client_id");
  const request_state = url.searchParams.get("state");
  const redirectUri = url.searchParams.get("redirect_uri");
  const nonce = url.searchParams.get("nonce");

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Missing client_id or redirect_uri" },
      { status: 400 }
    );
  }

  // Generate a temporary authorization code
  const clientData = { clientId: clientId, nonce: nonce };
  const authCode = await saveAuthCode(ssoSessionKey, clientData);

  const decodedRedirectUri = decodeURIComponent(
    url.searchParams.get("redirect_uri") || ""
  );

  // Redirect back to Moodle with the auth code
  const redirect = `${decodedRedirectUri}?code=${authCode}&state=${request_state}`;
  return NextResponse.redirect(redirect);
}
// http://127.0.0.1:3100
