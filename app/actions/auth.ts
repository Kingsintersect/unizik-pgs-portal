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
import { redirect } from "next/navigation";

export async function logoutAction() {
  const loginSession = (await getSession(
    loginSessionKey
  )) as SessionData | null;
  if (loginSession) {
    try {
      await deleteSessionKey(loginSessionKey);
      deleteSession();
    } catch (error) {
      console.error(error);
      return false;
    }
  } else console.log("No login session found");

  redirect("/auth/signin");
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

export const Signup = async (data: any) => {
  const response = (await apiCallerBeta({
    url: `${remoteApiUrl}/account/register`,
    method: "POST",
    data: { ...data },
  })) as any;
  return response;
};

export const getUser = async () => {
  const loginSession = (await getSession(loginSessionKey)) as SessionData;
  if (loginSession) {
    const res = (await apiCallerBeta({
      url: `${remoteApiUrl}/account/user/${loginSession.id}`,
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
