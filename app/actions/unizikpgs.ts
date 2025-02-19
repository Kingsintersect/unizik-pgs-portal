import { remoteApiUrl } from "@/config";
import { apiCallerBeta } from "@/lib/utils/apiCaller";

export async function FetchAllUsers(token: string) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/allusers`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}

export async function FetchAllTeachers(token: string) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/allteachers`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}

export async function FetchAllStudents(token: string) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/allstudents`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}

export async function FetchAllManagers(token: string) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/allmanagers`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}

export async function FetchSigleUser(token: string, id: string) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/user/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}

export async function GetRoles(token: string, data: any) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/getroles`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}

export async function UpdateUserRole(token: string, id: string, data: any) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/user/${id}`,
    method: "PUT",
    data: { ...data },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}
