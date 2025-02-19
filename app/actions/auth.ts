"use server";

import { remoteApiUrl } from "@/config";
import { loginSessionKey } from "@/lib/definitions";
import {
  deleteSession,
  deleteSessionKey,
  getSession,
  setSession,
} from "@/lib/session";
import { apiCallerBeta } from "@/lib/utils/apiCaller";
import { LoginSession, SessionData } from "@/types/auth";

export async function logout() {
  const loginSession = (await getSession(
    loginSessionKey
  )) as SessionData | null;
  if (loginSession) {
    const role = loginSession.role ?? "";
    await deleteSessionKey(loginSessionKey);
    deleteSession();
    return { role };
  }
  
  console.log("No login session found");
  return { role: null };
}

export const Signin = async (data: any) => {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/login`,
    method: "POST",
    data: { ...data },
  })) as any;
  if (response.success) {
    const user = response.success.user;
    await setSession(
      loginSessionKey,
      {
        id: user.id,
        role: user.role,
        token: response.success.access_token,
      },
      "1h"
    );
  }
  return response;
};

export const SSOSignin = async (data: any) => {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/login`,
    method: "POST",
    data: { ...data },
  })) as any;
  if (response.success) {
    const user = response.success.user;
    await setSession(
      loginSessionKey,
      {
        id: user.id,
        role: user.role,
        token: response.success.access_token,
      } as LoginSession,
      "1h"
    );
  }
  return response;
};

export const Signup = async (data: any) => {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/register`,
    method: "POST",
    data: { ...data },
  })) as any;
  // if (response.success) {
  //   const user = response.success.user;
  //   await createSession(
  //     {
  //       id: user.id,
  //       role: user.role,
  //       token: response.success.access_token,
  //     },
  //     "24h"
  //   );
  // }
  return response;
};

export const getUser = async () => {
  const session = await getSession("session");

  const loginSession = (await getSession(loginSessionKey)) as SessionData;
  if (loginSession) {
    const res = (await apiCallerBeta({
      url: `${remoteApiUrl}/application/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginSession.token}`,
      },
    })) as any;
    return res;
  } else {
    return { error: { message: "Token not found" }, success: null };
  }
};
