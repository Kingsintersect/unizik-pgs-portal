
import { remoteApiUrl } from '@/config';
import { apiCallerBeta } from '@/lib/utils/apiCaller';

export async function fetchAllStudentApplications(token: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/all-applications`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function fetchSingleStudentApplications(token: string, id: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/single-application?id=${id}`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function ApproveStudentAdmission(token: string, data: any) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/approve-application`,
      method: 'POST',
      data: { ...data },
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}


