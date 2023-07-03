import { jwtVerify, SignJWT } from "jose";

interface UserJWTPayload {
  jti: string;
  iat: number;
}

export const getJWTSecretKey = () => {
  const secret: string = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("JWT_SECRET_KEY is not set");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );

    return verified.payload as UserJWTPayload;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};
