import { NextResponse } from "next/server";
import { verifySession } from "@/lib/server.utils";
import { loginSessionKey } from "@/lib/definitions";

export const dynamic = "force-dynamic";

export async function GET() {
    const loginSession = await verifySession(loginSessionKey);
    return NextResponse.json(loginSession);
}
