import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";

interface User {
  id: number;
  email: string;
    name: string;
    // last_name: string;
  authCode: string;
}

async function getUserFromDatabase(email: string): Promise<User | null> {
    // Simulated database lookup
  if (email === "test@example.com") {
    const user = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
    };
      const authCode = jwt.sign({ email }, process.env.JWT_SECRET!, {
          expiresIn: "5m",
      });
      return {...user, authCode};
  }
  return null;
}

export const authOptions: NextAuthOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
          if (!credentials) return null

        const user = await getUserFromDatabase(credentials.email);
        if (!user) throw new Error("User not found");

        return {
          id: user.id.toString(), // Convert id to string (NextAuth expects a string)
          email: user.email,
          name: user.name,
          authCode: user.authCode, // Include authCode for SSO
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.authCode = token.authCode as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.authCode = user.authCode;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard/student"; // Change if needed
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

