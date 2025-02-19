import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { SessionData } from "@/types/auth";

export async function verifySession(key: string) {
  if (typeof window === "undefined") {
    try {
      const loginSession = (await getSession(key)) as SessionData;
      if (!loginSession) {
        redirect("/auth/signin");
      }
      return loginSession;
    } catch (error) {
      console.error("Could Not Get login Session!:", error);
      redirect("/auth/signin");
    }
  } else {
    try {
      const res = await fetch("/api/session", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch session");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching session:", error);
      redirect("/auth/signin");
    }
  }
}
