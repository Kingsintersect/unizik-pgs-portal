import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      authCode?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    authCode: string;
  }

  interface JWT {
    authCode?: string;
  }
}
