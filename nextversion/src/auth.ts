import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email!;
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existing.length === 0) {

        await db.insert(users).values({
          email,
          name: user.name ?? "No Name",
          image: user.image,
          createdAt: new Date(),
        });
        console.log("✅ New user signed up:", email);
      } else {
        console.log("✅ Existing user signed in:", email);
      }

      return true; 
    },
  },
});
