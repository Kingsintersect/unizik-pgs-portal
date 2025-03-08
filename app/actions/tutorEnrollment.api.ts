import { remoteApiUrl } from "@/config";
import { apiCallerBeta } from "@/lib/utils/apiCaller";
import {
  GetAllActiveFaculties,
  GetAllDepartmentInAFaculty,
} from "./server.admin";
import { GetCoursesInAProgram } from "./courses.api";

export async function EnrollTutorToCourse(
  token: string,
  enrollment: Record<string, any>
) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/admin/course-assignment/tutor`,
    method: "POST",
    data: { ...enrollment },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as any;
  return response;
}

// src/lib/api.ts
export const fetchPrograms = async () => {
  return [
    { label: "Masters", value: "masters" },
    { label: "PhD", value: "phd" },
    { label: "PGD", value: "pgd" },
  ];
};

export const fetchFaculties = async (program: string) => {
  const { error, success } = await GetAllActiveFaculties();
  if (success.data) return success.data;
  if (error) console.error("Fetch Faculty Error!", error);
  return [];
};

export const fetchDepartments = async (facultyId: string) => {
  const { error, success } = await GetAllDepartmentInAFaculty(facultyId);
  if (success.data) return success.data;
  if (error) console.error("Fetch Department Error!", error);
  return [];
};

export const fetchCourses = async (programe: string, departmentId: string) => {
  const { error, success } = await GetCoursesInAProgram(programe, departmentId);
  if (success.data) return success.data;
  if (error) console.error("Fetch Department Error!", error);
  return [];
};
