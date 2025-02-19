import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";
import { SessionData } from "@/types/auth";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Helper function to calculate token expiration time.
 */
export function getExpiryDuration(
  duration: string,
  timezoneOffset: number = 0
): number {
  const match = duration.match(/^(\d+)([smhd]?)$/);
  if (!match)
    throw new Error(
      "Invalid duration format. Use format like '10s', '5m', '2h', or '1d'."
    );

  const value = parseInt(match[1], 10);
  const unit = match[2] || "h"; // Default to hours if no unit is provided

  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const timezoneAdjustment = timezoneOffset * 3600; // Convert hours to seconds

  const unitMultipliers: Record<string, number> = {
    s: 1, // Seconds
    m: 60, // Minutes
    h: 3600, // Hours
    d: 86400, // Days
  };

  const multiplier = unitMultipliers[unit] || unitMultipliers["h"];

  return currentTime + timezoneAdjustment + value * multiplier;
}

/**
 * Encrypts session data into a JWT token.
 */
export async function encrypt(
  payload: SessionPayload,
  duration: string = "1h"
) {
  const expiry = getExpiryDuration(duration, 1); // Adjust for WAT (UTC+1)

  return new SignJWT({ ...payload, exp: expiry })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(encodedKey);
}

/**
 * Decrypts and verifies a JWT token.
 */
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

/**
 * Retrieves the full session from cookies.
 */
export async function getFullSession() {
  const cookie = cookies().get("zikpg_session")?.value;
  if (!cookie) {
    console.log("zikpg_session could not be found");
    return null;
  }
  return await decrypt(cookie);
}

/**
 * Retrieves a specific session key.
 */
export async function getSession<T = Record<string, any>>(
  key: string
) {
  const allSession = await getFullSession();
  if (!allSession || !allSession[key]) {
    console.log(`${key} could not be found!`);
    return null;
  }

  return allSession[key];
}

/**
 * Sets a session cookie with the given key, value, and expiration duration.
 */
export async function setSession(
  key: string,
  value: any,
  duration: string = "1h"
) {
  const allSession = (await getFullSession()) || {};
  const timeRange = getExpiryDuration(duration, 1);
  const expiresAt = new Date(timeRange * 1000); // Convert to milliseconds

  // Store session payload
  const sessionData = await encrypt(
    {
      ...allSession,
      [key]: value,
      expiresAt: timeRange,
    },
    duration
  );

  const cookieStore = await cookies();
  cookieStore.set("zikpg_session", sessionData, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    // sameSite: "lax",
    sameSite: "none",
    // domain: ".yourdomain.com", // to maitain the data accross multile sites
    path: "/",
  });
}

export async function deleteSessionKey(key: string) {
  const allSession = await getFullSession();
  if (!allSession || !allSession[key]) {
    console.log(`${key} could not be found!`);
    return;
  }

  // Remove the key from the session object
  delete allSession[key];

  // Re-encrypt the updated session and update the cookie
  const expiresAt = getExpiryDuration("1h"); // Keep the expiration time consistent
  const sessionData = await encrypt({ ...allSession, expiresAt }, "1h");

  const cookieStore = cookies();
  cookieStore.set("zikpg_session", sessionData, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt * 1000), // Convert Unix timestamp to Date
    sameSite: "lax",
    path: "/",
  });

  console.log(`Deleted session key: ${key}`);
}

export async function deleteSession() {
  const cookieStore = cookies();

  // Delete the session cookie by setting an expired date
  cookieStore.set("zikpg_session", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // Expire immediately
    sameSite: "lax",
    path: "/",
  });
  cookieStore.delete("session");
  console.log("Session deleted successfully!");
}

// export async function createSession(key: string, value: any, duration: string) {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//   const expiry = getExpiryDuration(duration);

//   const session = await encrypt();
//   const cookieStore = await cookies();

//   cookieStore.set("session", session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });
// }

// import "server-only";
// import { JWTPayload, SignJWT, jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { encodedKey } from "@/config";
// import { SessionData } from "@/types/auth";

// function getExpiryDuration(duration: string) {
//   const match = duration.match(/^(\d+)([smhd]?)$/);
//   if (!match) throw new Error("Invalid duration format");

//   const value = parseInt(match[1], 10);
//   const unit = match[2];

//   switch (unit) {
//     case "s":
//       return Math.floor(Date.now() / 1000) + value; // seconds
//     case "m":
//       return Math.floor(Date.now() / 1000) + value * 60; // minutes
//     case "h":
//       return Math.floor(Date.now() / 1000) + value * 3600; // hours
//     case "d":
//       return Math.floor(Date.now() / 1000) + value * 86400; // days
//     default:
//       return Math.floor(Date.now() / 1000) + value * 3600; // default to hours
//   }
// }

// export async function encrypt(
//   payload: JWTPayload | undefined,
//   duration = "1h"
// ) {
//   const expiry = getExpiryDuration(duration);

//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime(expiry)
//     .sign(encodedKey);
// }

// export async function decrypt(session: string | undefined = "") {
//   if (session) {
//     try {
//       const { payload } = await jwtVerify(session, encodedKey, {
//         algorithms: ["HS256"],
//       });
//       return payload;
//     } catch (error: any) {
//       console.log("Failed to verify session:", error.message);
//     }
//   } else {
//     console.log("session is empty", session);
//     return null;
//   }
// }

// export async function getFullSession() {
//   const sessionToken = cookies().get("session")?.value;
//   if (!sessionToken) return null;

//   return await decrypt(sessionToken);
// }

// export async function setSession(key: string, value: any, duration: string) {
//   const fullSession = await getFullSession();
//   console.log("SETTING SESSION:", key, value);

//   const timeRange = getExpiryDuration(duration);
//   const expiresAt = new Date(Date.now() + timeRange);
//   const updatedSession = { ...fullSession, [key]: { ...value, expiresAt } };

//   const sessionToken = await encrypt(
//     { ...updatedSession, expiresAt: expiresAt.toISOString() },
//     duration
//   );
//   cookies().set("session", sessionToken, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });
// }

// export async function getSession(key: string) {
//   const fullSession = await getFullSession();
//   if (!fullSession || !fullSession[key]) return null;

//   const sessionData = fullSession[key] as SessionData;
//   const expiresAt = sessionData.expiresAt;

//   const currentTime = Date.now();
//   if (expiresAt && expiresAt < currentTime) {
//     await deleteSessionKey(key);
//     return null;
//   }

//   // const session = cookies().get(sessionName)?.value;
//   if (!sessionData) {
//     await deleteSessionKey(key);
//     return null;
//   }
//   return sessionData;
// }

// export async function deleteSessionKey(key: string): Promise<void> {
//   const fullSession = await getFullSession();
//   if (!fullSession || !fullSession[key]) return;

//   delete fullSession[key];

//   if (Object.keys(fullSession).length === 0) {
//     cookies().delete("session");
//   } else {
//     const sessionToken = await encrypt(fullSession, "1h");
//     cookies().set("session", sessionToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });
//   }
// }

// export function deleteSession() {
//   cookies().delete("session");
// }
