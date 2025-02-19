// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import jwt from "jsonwebtoken";

// interface User {
//   id: number;
//   email: string;
//   name: string;
//   authCode?: string;
// }

// async function getUserFromDatabase(email: string): Promise<User | null> {
//   if (email === "test@example.com") {
//     const authCode = jwt.sign({ email }, process.env.JWT_SECRET!, {
//       expiresIn: "5m",
//     });
//     return { id: 1, email, name: "Test User", authCode };
//   }
//   return null;
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", required: true },
//         password: { label: "Password", type: "password", required: true },
//       },
//       async authorize(credentials, req) {
//         if (!credentials) return null;
//         const user = await getUserFromDatabase(credentials.email);
//         if (!user) throw new Error("User not found");

//         return {
//           id: user.id.toString(),
//           email: user.email,
//           name: user.name,
//           authCode: user.authCode,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.authCode = token.authCode as string;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.authCode = user.authCode;
//       }
//       return token;
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl + "/dashboard/student";
//     },
//   },
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// };
