import jwt from "jsonwebtoken";
import { CLIENT_ID, ISSUER, JWKS } from "./config";
import fs from "fs";
import path from "path";

// const privateKeyPath = path.join(process.cwd(), 'keys', 'private.pem');
// const publicKeyPath = path.join(process.cwd(), 'keys', 'private.pem');
// const PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf8"); // Path to private key
// const PUBLIC_KEY = fs.readFileSync(publicKeyPath, "utf8"); // Path to public key

const loadKey = (keyType: 'private' | 'public') => {
    const keyPath = path.join(process.cwd(), 'keys', `${keyType}.pem`);

    if (fs.existsSync(keyPath)) {
        console.log(`${keyType.charAt(0).toUpperCase() + keyType.slice(1)} key loaded from:`, keyPath);
        return fs.readFileSync(keyPath, 'utf8');
    } else {
        console.error(`${keyType.charAt(0).toUpperCase() + keyType.slice(1)} key file not found at:`, keyPath);
        throw new Error(`${keyType.charAt(0).toUpperCase() + keyType.slice(1)} key file missing. Please check the keys directory.`);
    }
};

const PRIVATE_KEY = loadKey('private');
const PUBLIC_KEY = loadKey('public');

export interface JWTPayload {
    email: string;
    scope?: string,
    aud?: any,
    iss?: string,
}

export const signJWT = (payload: JWTPayload, expiresIn: string = "1h") => {
    return jwt.sign(payload, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn,
        keyid: JWKS.keys[0].kid,
        issuer: ISSUER,
        audience: CLIENT_ID,
    });
};

export const verifyJWT = (token: string): JWTPayload => {
    try {
        const payload = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"],
            issuer: ISSUER,
            audience: CLIENT_ID,
        });

        if (typeof payload === "string") {
            throw new Error("Unexpected token format");
        }

        return payload as JWTPayload;
    } catch (error: any) {
        console.error("Token verification failed:", error.message);
        throw new Error("Invalid token");
    }
};






// import jwt from "jsonwebtoken";
// import { CLIENT_ID, ISSUER, JWKS } from "./config";
// import { accessTokenSecret } from "@/config";

// const PRIVATE_KEY = accessTokenSecret || 'supersecretkey';

// export interface JWTPayload {
//     // sub: string; // Subject (user ID)
//     email: string; // User email
//     // name?: string; // Optional user name
// }

// export const signJWT = (payload: object, expiresIn: string = "1h") => {
//     return jwt.sign(payload, PRIVATE_KEY, {
//         algorithm: "RS256",
//         expiresIn,
//         keyid: JWKS.keys[0].kid,
//         issuer: ISSUER,
//         audience: CLIENT_ID,
//     });
// };

// export const verifyJWT = (token: string): JWTPayload => {
//     const payload = jwt.verify(token, PRIVATE_KEY, {
//         algorithms: ["RS256"],
//         issuer: ISSUER,
//     });

//     if (typeof payload === "string") {
//         throw new Error("Unexpected token format");
//     }

//     return payload as JWTPayload;
// };