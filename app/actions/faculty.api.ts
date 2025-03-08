import { remoteApiUrl } from "@/config";
import { apiCallerBeta } from "@/lib/utils/apiCaller";

export async function GetAllProgram() {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/getprograms`,
    method: "GET",
  })) as any;
  return response;
}
