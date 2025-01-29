import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { encodedKey } from '@/config';

// function getExpiryDuration(duration: string): number {
//    const timeValue = parseInt(duration.slice(0, -1), 10); // Get the numeric value
//    const timeUnit = duration.slice(-1); // Get the unit (last character)

//    switch (timeUnit) {
//       case 's': // seconds
//          return timeValue * 1000; // convert to milliseconds
//       case 'm': // minutes
//          return timeValue * 60 * 1000;
//       case 'h': // hours
//          return timeValue * 60 * 60 * 1000;
//       case 'd': // days
//          return timeValue * 24 * 60 * 60 * 1000;
//       case 'w': // weeks
//          return timeValue * 7 * 24 * 60 * 60 * 1000;
//       case 'mn': // months
//          return timeValue * 30 * 24 * 60 * 60 * 1000;
//       case 'y': // years
//          return timeValue * 365 * 24 * 60 * 60 * 1000;
//       default:
//          throw new Error('Invalid duration format');
//    }
// }

function getExpiryDuration(duration: string) {
   const match = duration.match(/^(\d+)([smhd]?)$/);
   if (!match) throw new Error('Invalid duration format');

   const value = parseInt(match[1], 10);
   const unit = match[2];

   switch (unit) {
      case 's': return Math.floor(Date.now() / 1000) + value; // seconds
      case 'm': return Math.floor(Date.now() / 1000) + value * 60; // minutes
      case 'h': return Math.floor(Date.now() / 1000) + value * 3600; // hours
      case 'd': return Math.floor(Date.now() / 1000) + value * 86400; // days
      default: return Math.floor(Date.now() / 1000) + value * 3600; // default to hours
   }
}

export async function encrypt(payload: JWTPayload | undefined, duration = "1h") {
   const expiry = getExpiryDuration(duration);

   return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiry)
      .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
   if (session) {
      try {
         const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
         })
         return payload
      } catch (error: any) {
         console.log('Failed to verify session:', error.message);
      }
   } else console.log('session is empty', session);
}

export async function createSession(userData: User, duration: string) {
   const timeRange = getExpiryDuration(duration);
   const expiresAt = new Date(Date.now() + timeRange);
   const session = await encrypt({ ...userData, expiresAt: expiresAt.toISOString() }, duration);

   cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
   })
}


export async function getSession(sessionName: string) {
   const session = cookies().get(sessionName)?.value;
   if (!session) return null;
   return await decrypt(session);
}


export async function updateSession(duration: string) {
   const session = cookies().get('session')?.value
   const payload = await decrypt(session);
   const timeRange = getExpiryDuration(duration);

   if (!session || !payload) {
      return null
   }

   const expires = new Date(Date.now() + timeRange)
   cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
   })
}

export function deleteSession() {
   cookies().delete('session')
}