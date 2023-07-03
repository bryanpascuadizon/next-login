import { verifyAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("user-token")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err: Error) => {
      console.log(err);
    }));

  /* Accessing Login page without verified token */
  // if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
  //   return;
  // }

  /* Accessing Login page with verified token */
  // if (req.url.includes("/login") && verifiedToken) {
  //   return NextResponse.redirect(
  //     new URL(process.env.NEXTAUTH_URL + "/test", req.url)
  //   );
  // }

  /* Accessing any page without verified token */
  if (!verifiedToken) {
    return NextResponse.redirect(
      new URL(process.env.NEXTAUTH_URL + "/", req.url)
    );
  }
};

export const config = {
  matcher: ["/dashboard", "/login"],
};
