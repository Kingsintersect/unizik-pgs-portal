import 'server-only';
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
   const cookie = cookies().get('session')?.value
   const session = await decrypt(cookie)

   if (!session?.id) redirect('/auth/student');
   const id = session.id as string;
   const role = session.role as string;
   const token = session.token as string;
   return { isAuthenticated: true, id: id, role: role, token: token }
})