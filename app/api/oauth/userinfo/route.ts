import { getUserFromToken } from "@/lib/utils/sso/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const user = await getUserFromToken(token);

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

   //   return NextResponse.json(user);
   return NextResponse.json({
     sub: user.id,
     first_name: user.first_name,
     last_name: user.last_name,
     username: user.username,
     email: user.email,
     role: user.role,
   });
}
