import { verifyJWT } from "@/lib/sso-odic/jwt";

export async function GET(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        return new Response('Unauthorized', { status: 401 });
    }
    console.log('userinfo endpoint', authHeader)

    const token = authHeader.replace('Bearer ', '');
    try {
        const user = verifyJWT(token);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch {
        return new Response('Unauthorized', { status: 401 });
    }

}
