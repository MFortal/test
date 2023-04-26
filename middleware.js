import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.has("token");
  const checkIndexOf = (path) => {
    return request.nextUrl.pathname.indexOf(path) > 0;
  };

  // если зареганный (токен есть)
  if (token) {
    if (checkIndexOf("registration")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // если незареганный (токена нет)
  if (!token) {
    if (
      checkIndexOf("personal_area") ||
      checkIndexOf("update_data") ||
      checkIndexOf("add_lot") ||
      checkIndexOf("my_lots") ||
      checkIndexOf("my_auctions") ||
      checkIndexOf("favorites")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: [
    "/registration/:path*",
    "/update_data/:path*",
    "/personal_area",
    "/add_lot",
    "/my_lots",
    "/my_auctions",
    "/favorites",
  ],
};
