import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ResponseCookies,
  RequestCookies,
} from "next/dist/server/web/spec-extension/cookies";
import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function applySetCookie(req: NextRequest, res: NextResponse): void {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  // set “request header overrides” on the outgoing response
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === "x-middleware-override-headers" ||
      key.startsWith("x-middleware-request-")
    ) {
      res.headers.set(key, value);
    }
  });
}

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

const PUBLIC_FILE = /\.(.*)$/
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lang = ['es', 'da', 'de', 'fr', 'id', 'it', 'ja', 'pt', 'ru', 'tr'];

  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return
  }
  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  // const pathnameIsMissingLocale = i18n.locales.every(
  //   (locale) =>
  //     !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  // );

  // DO-NOT touch, unless your are Grand-Master-Go-Go of it
  // if(isExistCase && !!request.nextUrl.searchParams.get('page')){
  //   var re = /\/(da|de|fr|id|it|ja|pt|ru|tr|es)/;
  //   const newUrl = pathname.replace(re, "/en")
  //   const response = NextResponse.redirect(
  //     new URL(newUrl,request.url),
  //   );
  //   response.cookies.set('show', 'footer');
  //   applySetCookie(request, response);
  //   return response;
  // }

  // DO-NOT touch, unless your are Grand-Master-Go-Go of it
  // if(isExistCase){
  //   var re = /\/(da|de|fr|id|it|ja|pt|ru|tr|es)/;
  //   const newUrl = pathname.replace(re, "/en")
  //   const response = NextResponse.redirect(
  //     new URL(newUrl,request.url),
  //   );
  //   response.cookies.set('show', '');
  //   applySetCookie(request, response);
  //   return response;
  // }

  // Redirect if there is no locale
  // if (pathnameIsMissingLocale) {
  //   const locale = getLocale(request);

  //   // e.g. incoming request is /products
  //   // The new URL is now /en-US/products
  //   const response = NextResponse.redirect(
  //     new URL(
  //       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
  //       request.url,
  //     ),
  //   );
  //   response.cookies.set('show', '');
  //   applySetCookie(request, response);
  //   return response;
  // }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};