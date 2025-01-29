import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { CLIENT_ID } from "@/lib/sso-odic/config";
import { baseUrl } from '@/config';

const codes: Record<string, string> = {}; // Stores auth codes

export async function GET(request: Request) {
    const url = new URL(request.url);
    console.log('authorizarion endpoint', url)
    const clientId = url.searchParams.get('client_id');
    const responseType = url.searchParams.get('response_type');
    const redirectUri = url.searchParams.get('redirect_uri');
    const state = url.searchParams.get('state');
    const scope = url.searchParams.get('scope');

    if (!clientId || !redirectUri || responseType !== "code") {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    console.log('res.query', url.searchParams)

    const code = nanoid();
    codes[code] = clientId;

console.log('am herererererr')
    // If user is authenticated, generate and send the auth code
    // if (req.session.user) {
    //     const authCode = generateAuthCode(); // Generate auth code logic
    //     return res.redirect(`${redirect_uri}?code=${authCode}&state=${state}`);
    // }

    // return NextResponse.redirect(`${redirectUri}?code=${code}`);

    // If not authenticated, redirect to the login page

    // If user is not authenticated, redirect to login page
    return NextResponse.redirect(`${baseUrl}/login?redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${scope}&code=${code}`);
}

