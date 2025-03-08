import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

// Utility functions for token generation
const generateAccessToken = ({ id, email }: { id: string; email: string }) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Short-lived token (1 day)
  });
};

const generateRefreshToken = ({ id }: { id: string; email: string }) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "9d", // Longer-lived token (9 days)
  });
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    // Credentials Provider for Email/Password Authentication
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        // Generate tokens
        const accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
          email: user.email,
        });

        // Update user with tokens in the database
        await prisma.user.update({
          where: { id: user.id },
          data: { accessToken, refreshToken },
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return { ...rest, accessToken, refreshToken };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;
    },
    // JWT Callback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      const currInfo = { ...token, ...user };
      if (!currInfo?.accessToken) {
        const accessToken = generateAccessToken({
          id: currInfo.id,
          email: currInfo.email,
        });
        const refreshToken = generateRefreshToken({
          id: currInfo.id,
          email: currInfo.email,
        });

        await prisma.user.update({
          where: { email: currInfo.email },
          data: { accessToken, refreshToken },
        });
        currInfo.refreshToken = refreshToken;
        currInfo.accessToken = accessToken;
      }

      if (user) {
        // Initial sign-in
        return {
          ...currInfo,
          accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
        };
      }

      // Return previous token if the access token has not expired yet
      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(currInfo);
    },

    async redirect({ baseUrl }) {
      // Redirect to the root URL after sign-in
      return `${baseUrl}/`;
    },
    // Session Callback
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Function to refresh the access token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  console.info("Refreshing access token...");
  try {
    if (!token.sub || token.id) {
      throw new Error("User ID (sub) is missing in the token");
    }

    const user = await prisma.user.findUnique({
      where: { id: token.sub || token.id },
    });

    if (!user || user.refreshToken !== token.refreshToken) {
      throw new Error("Refresh token is invalid");
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Update tokens in the database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });

    console.info("Access token refreshed successfully");

    return {
      ...token,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
