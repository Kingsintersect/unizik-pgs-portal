
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

export async function RejectStudentAdmission(token: string, data: any) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/reject-application`,
      method: 'DELETE',
      data: { ...data },
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}


export async function GetAmissionApprovedStudentList(token: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/approved-applicants`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function GetAmissionRejectedStudentList(token: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/rejected-applicants`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function GetAppliedStudentList(token: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/applied-students`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function GetUnappliedStudentList(token: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/admin/unapplied-students`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}
