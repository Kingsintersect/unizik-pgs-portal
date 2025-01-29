import { accessTokenSecret } from '@/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
   const authHeader = req.headers.get("authorization");
   if (!authHeader) {
      return NextResponse.json({ error: 'Authorization Invalid' }, { status: 401 });
   }

   const token = authHeader.split(' ')[1];

   try {
      const payload = jwt.verify(token, accessTokenSecret) as JwtPayload;
      return NextResponse.json({ id: payload.id, first_name: payload.reg_number });
   } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
   }
}