import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const publicRoutes = ['/auth/student', '/auth/student', '/signup'];
const protectedRoutes = '/dashboard';
const studentRoutePrefix = '/dashboard/student';
const adminRoutePrefix = '/dashboard/admin';

export default async function middleware(req: NextRequest) {
   // 2. Check if the current route is protected or public
   const path = req.nextUrl.pathname
   const isPublicRoute = publicRoutes.includes(path);
   const isProtectedRoute = path.startsWith(protectedRoutes);
   const isStudentRoute = path.startsWith(studentRoutePrefix);
   const isAdminRoute = path.startsWith(adminRoutePrefix);

   // 3. Decrypt the session from the cookie
   const cookie = cookies().get('session')?.value
   const session = await decrypt(cookie)

   // 5. Redirect to /login if the user is not authenticated
   if (isProtectedRoute && !session?.id) {
      return NextResponse.redirect(new URL('/auth/student', req.nextUrl))
   }

   // 6. Redirect to /dashboard if the user is authenticated
   if (
      isPublicRoute &&
      session?.id &&
      !req.nextUrl.pathname.startsWith('/dashboard')
   ) {
      const userRole = session.role;
      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.nextUrl))
   }

   // // 7. check for sudent
   if (isAdminRoute && session?.id && session?.role === "student") {
      return NextResponse.redirect(new URL('/dashboard/student', req.nextUrl))
   }
   // // 8. check for admin
   if (isStudentRoute && session?.id && session?.role === "admin") {
      return NextResponse.redirect(new URL('/dashboard/admin', req.nextUrl))
   }

   return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
   matcher: ['/((?!api|_next/static|_next/image|images/.*|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$).*)'],
}