import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/biography',
  '/create-biography',
  '/autobiography/declaration',
  '/deceased-biography/declaration',
];

const AUTH_COOKIE_NAME = 'sb-gckmusbozgbclokvbnwx-auth-token';

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

function hasAuthCookie(request: NextRequest): boolean {
  const cookie = request.cookies.get(AUTH_COOKIE_NAME);
  if (!cookie?.value) return false;

  try {
    const parsed = JSON.parse(decodeURIComponent(cookie.value));
    return Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string' && parsed[0].length > 0;
  } catch {
    return cookie.value.length > 0;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname) && !hasAuthCookie(request)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/biography/:path*',
    '/create-biography/:path*',
    '/autobiography/declaration/:path*',
    '/deceased-biography/declaration/:path*',
  ],
};
