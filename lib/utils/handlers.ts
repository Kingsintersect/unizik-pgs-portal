import { accessTokenSecret } from '@/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function getExpiryDuration(duration: string): number {
   const timeValue = parseInt(duration.slice(0, -1), 10); // Get the numeric value
   const timeUnit = duration.slice(-1); // Get the unit (last character)

   switch (timeUnit) {
      case 's': // seconds
         return timeValue * 1000; // convert to milliseconds
      case 'm': // minutes
         return timeValue * 60 * 1000;
      case 'h': // hours
         return timeValue * 60 * 60 * 1000;
      case 'd': // days
         return timeValue * 24 * 60 * 60 * 1000;
      case 'w': // weeks
         return timeValue * 7 * 24 * 60 * 60 * 1000;
      case 'mn': // months
         return timeValue * 30 * 24 * 60 * 60 * 1000;
      case 'y': // years
         return timeValue * 365 * 24 * 60 * 60 * 1000;
      default:
         throw new Error('Invalid duration format');
   }
}

export async function encrypt(payload: any, expiry = "1h") {
   const expiresIn = getExpiryDuration(expiry);
   return jwt.sign(payload, accessTokenSecret, { expiresIn });
}

export async function decrypt(token: string) {
   return jwt.verify(token, accessTokenSecret) as JwtPayload;
}


export async function setSession(data: object, duration: string) {
   const session = await encrypt({ ...data }, duration);
   const timeRange = getExpiryDuration(duration);
   const expires = new Date(Date.now() + timeRange);

   cookies().set('session', session, { expires, httpOnly: true })
}

export async function getSession(sessionName: string) {
   const session = cookies().get(sessionName)?.value;
   if (!session) return null;
   return await decrypt(session);
}

export async function updateSession(request: NextRequest, sessionName: string, duration: string) {
   const session = cookies().get(sessionName)?.value;
   if (!session) return;

   // refresh the session
   const timeRange = getExpiryDuration(duration);
   const parsed = await decrypt(session);
   parsed.expires = new Date(Date.now() + timeRange);
   const res = NextResponse.next();
   res.cookies.set({
      name: sessionName,
      value: await encrypt(parsed, duration),
      httpOnly: true,
      expires: parsed.expires
   });

   return res;
}

export async function deleteSession() {
   cookies().set('session', "", { expires: new Date(0) });
}
