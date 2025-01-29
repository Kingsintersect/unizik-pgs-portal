"use server";
import { remoteApiUrl } from '@/config';
import { createSession, decrypt, deleteSession, getSession } from '@/lib/session';
import { apiCallerBeta } from '@/lib/utils/apiCaller';
import { cookies } from 'next/headers';

export async function logout() {
   const cookie = cookies().get('session')?.value
   const session = await decrypt(cookie)
   const role = session?.role;
   deleteSession();
   return { role: role };
}

export const adminSignin = async (data: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/admin-login`,
      method: 'POST',
      data: { ...data },
   }) as any;
   if (response.success) {
      response.success.user.role = "admin";
      await createSession({
         id: response.success.user.id,
         role: "admin",
         token: response.success.access_token,
      }, "1h");
   }
   return response;
}

export const studentSignin = async (data: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/login`,
      method: 'POST',
      data: { ...data },
   }) as any;
   if (response.success) {
      response.success.user.role = "student";
      await createSession({
         id: response.success.user.id,
         role: "student",
         token: response.success.access_token,
      }, "1h");
   }
   return response;
}

export const getUser = async () => {
   const session = await getSession("session");
   if (session?.token) {
      const res = await apiCallerBeta({
         url: `${remoteApiUrl}/application/profile`,
         method: 'GET',
         headers: {
            Authorization: `Bearer ${session.token}`,
         }
      }) as any;
      return res;
   } else {
      return { error: { message: "Token not found" }, success: null }
   }
}