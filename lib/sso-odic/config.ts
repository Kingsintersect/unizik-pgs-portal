// lib/config.ts
export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID ?? "your-moodle-client-id";
export const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "your-moodle-client-secret";
export const REDIRECT_URI = "http://localhost/qverse/moodle/auth/oidc/";
// export const REDIRECT_URI = "https://moodletest.qverselearning.org/auth/oidc/";
// export const REDIRECT_URI = "http://moodle.local/auth/oidc/redirect";
export const ISSUER = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
export const JWKS = {
    keys: [
        {
            kty: "RSA",
            alg: "RS256",
            use: "sig",
            kid: "key1",
            n: "base64url-modulus", // Replace with your actual RSA public key modulus
            e: "AQAB", // RSA public exponent
        },
    ],
};
