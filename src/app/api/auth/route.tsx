import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getJWTSecretKey } from "@/lib/auth";
import cookie from "cookie";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();

    const { username, password } = body.loginCredentials;

    if (username === "admin" && password === "admin") {
      console.log(username, password);

      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(getJWTSecretKey()));

      const serializedCookie = cookie.serialize("user-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600, // Expires in 1 hour
        path: "/",
      });

      return new NextResponse("Login Successfuly", {
        status: 200,
        headers: {
          "Set-Cookie": serializedCookie,
          "Content-Type": "text/plain",
        },
      });
    } else {
      return new NextResponse("Login Unauthorized", { status: 401 });
    }
  } catch (error) {
    console.log("Error: ", error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
