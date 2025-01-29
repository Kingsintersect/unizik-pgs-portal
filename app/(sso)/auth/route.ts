import { validateUser } from '@/lib/sso-odic/users';
import { NextResponse } from 'next/server';

const codes: Record<string, string> = {}; // Stores auth codes

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password, redirectUri, state, code } = body;
    console.log('Login endpoint', body);

    // Ensure all necessary parameters are present
    if (!email || !password || !redirectUri || !state) {
        console.error('Missing required fields:', { email, password, redirectUri, state });
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    console.log('Processing login for:', email);

    // Verify credentials (can be from a database)
    const user = validateUser(email, password);
    if (!user) {
        console.error('Invalid credentials for:', email);
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Redirect to the authorize endpoint with the state to complete the OAuth flow
    console.log('User successfully authenticated:', email);
    return NextResponse.redirect(`${redirectUri}?state=${state}&code=${code}`);

}
