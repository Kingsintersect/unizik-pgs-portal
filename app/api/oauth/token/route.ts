import { accessTokenSecret, refreshTokenSecret } from '@/config';
import { clientConfig } from '@/config/authconstants';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

const sessions: Record<string, any> = {}; // Reuse sessions from authorization endpoint


export async function POST(req: NextRequest, res: NextResponse) {
   const { code, client_id, client_secret, redirect_uri, grant_type } = await req.json();


   // if (grant_type !== 'authorization_code') {
   //    return NextResponse.json({ error: 'Invalid grant type' }, { status: 400 });
   // }

   // Validate the client credentials
   const client = clientConfig.find(
      (client) => client.clientId === client_id && client.clientSecret === client_secret
   );
   if (!client) {
      return NextResponse.json({ error: 'Invalid client credentials' }, { status: 400 });
   }

   // Validate the authorization code
   const session = sessions[code];
   if (!session || session.clientId !== client_id) {
      return NextResponse.json({ error: 'Invalid authorization code' }, { status: 400 });
   }

   // Generate access and refresh tokens
   const accessToken = jwt.sign({ id: session.id, reg_number: session.reg_number }, accessTokenSecret, { expiresIn: '1d' });
   const refreshToken = jwt.sign({ id: session.id, reg_number: session.reg_number }, refreshTokenSecret, { expiresIn: '7d' });

   // Remove the used authorization code from session store
   delete sessions[code];

   // Respond with access token
   return NextResponse.json({ access_token: accessToken, refrech_token: refreshToken, token_type: 'Bearer' });
}