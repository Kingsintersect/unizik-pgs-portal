import { signJWT } from '@/lib/sso-odic/jwt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const contentType = request.headers.get("content-type");

    let body: any;

    if (contentType === "application/json") {
        // Parse JSON body
        body = await request.json();
    } else if (contentType === "application/x-www-form-urlencoded") {
        // Parse URL-encoded body
        const textBody = await request.text();
        body = Object.fromEntries(new URLSearchParams(textBody));
    } else {
        return NextResponse.json(
            { error: "Unsupported content type" },
            { status: 400 }
        );
    }
    console.log("Parsed body:", body);

    const { email, client_id, client_secret, grant_type, code, redirect_uri } = body;

    // Validate input
    if (!client_id || !client_secret || !grant_type || !code || !redirect_uri || !email) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    console.log('token endpoint', body);

    // Ensure that the email is included in the payload for both tokens
    const idToken = signJWT({ email: email }, "1h");
    const accessToken = signJWT({
        email: email,
        scope: "openid profile email",
        aud: client_id,      // Audience
        iss: 'your-issuer',  // Issuer
    }, "1h");

    return NextResponse.json({
        id_token: idToken,
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: 3600,
    }, { status: 200 });
};





// import { signJWT } from '@/lib/sso-odic/jwt';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//     const contentType = request.headers.get("content-type");

//     let body: any;

//     if (contentType === "application/json") {
//         // Parse JSON body
//         body = await request.json();
//     } else if (contentType === "application/x-www-form-urlencoded") {
//         // Parse URL-encoded body
//         const textBody = await request.text();
//         body = Object.fromEntries(new URLSearchParams(textBody));
//     } else {
//         return NextResponse.json(
//             { error: "Unsupported content type" },
//             { status: 400 }
//         );
//     }
//     console.log("Parsed body:", body);

//     const { email, client_id, client_secret, grant_type, code, redirect_uri } = body;

//     // Validate input
//     if (!client_id || !client_secret || !grant_type || !code || !redirect_uri) {
//         return NextResponse.json(
//             { error: "Missing required fields" },
//             { status: 400 }
//         );
//     }

//     console.log('token endpoint', body)

//     // const idToken = signJWT({ sub: "1", email: email });
//     const idToken = signJWT({ email: email });
//     const accessToken = signJWT({ scope: "openid profile email" });

//     return NextResponse.json({
//         id_token: idToken,
//         access_token: accessToken,
//         token_type: "Bearer",
//         expires_in: 3600,
//     }, { status: 200 });

// }
