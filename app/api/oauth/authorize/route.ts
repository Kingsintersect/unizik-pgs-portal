import { validateRedirectUri } from "@/lib/utils/OAuthValidation";
import { NextRequest, NextResponse } from "next/server";
import { parse } from 'url';

// Example in-memory user store
const users = [
   {
      id: 'user123',
      first_name: 'student1',
      reg_number: 'student_reg_number',
   },
];

const sessions: Record<string, any> = {};

export async function GET(req: NextRequest, res: NextResponse) {
   const baseUrl = req.nextUrl.origin; // Get the full origin (protocol + domain)
   const { query } = parse(req.url!, true);
   const { client_id, client_secret, redirect_uri, response_type, state } = query;

   if (!validateRedirectUri(client_id as string, redirect_uri as string)) {
      NextResponse.json({ message: 'Invalid client_id or redirect_uri' }, { status: 400 });
   }

   // Redirect to the Next.js login page with query params to keep OAuth context
   return NextResponse.redirect(`${baseUrl}/auth/lms/signon?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&state=${state}&base=${baseUrl}`);
}


export async function POST(req: Request, res: any) {
   const { client_id, reg_number, redirect_uri, state } = await req.json();

   // Validate the client and redirect URI
   if (!validateRedirectUri(client_id, redirect_uri)) {
      NextResponse.json({ message: 'Invalid client or redirect URI' }, { status: 400 });
   }

   // Validate the user credentials
   const user = users.find((u) => u.reg_number === reg_number);
   if (!user) {
      return NextResponse.json({ message: 'Invalid user Credentials' }, { status: 401 });
   }

   // Generate an authorization code and store it in the session
   const authCode = Math.random().toString(36).substring(2, 15);
   sessions[authCode] = { clientId: client_id, userId: user.id, redirectUri: redirect_uri };

   // return NextResponse.json({ redirect_to: `${red_url}?code=${authCode}&state=${state}` });

   // Debugging information to ensure parameters are correct
   console.log('Redirecting to Moodle with:', {
      authCode,
      state,
      redirect_uri,
   });
   return NextResponse.redirect(`${redirect_uri}?code=${encodeURIComponent(authCode)}&state=${encodeURIComponent(state)}`);
}
