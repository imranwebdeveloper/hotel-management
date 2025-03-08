import jwt from "jsonwebtoken";

/**
 * Verifies an access token.
 * @param token - The access token to verify.
 * @returns The decoded token payload if valid, otherwise throws an error.
 */
export function verifyAccessToken(token: string): {
  id: string;
  email: string;
} {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
    };

    // Return the decoded payload
    return decoded;
  } catch (error) {
    console.error("Error verifying access token:", error);
    throw new Error("Invalid or expired access token");
  }
}
