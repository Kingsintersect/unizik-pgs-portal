import { remoteApiUrl } from "@/config";
import { apiCallerBeta } from "@/lib/utils/apiCaller";

export async function GetCoursesInAProgram(
  programe: string,
  departmentId: string
) {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/admin/course-assignment/program-courses?department_id=${departmentId}&program=${programe}`,
    method: "GET",
  })) as any;
  return response;
}
