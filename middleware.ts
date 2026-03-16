import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/biography',
  '/create-biography',
  '/autobiography/declaration',
  '/deceased-biography/declaration',
];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const accessToken =
    request.cookies.get('sb-access-token')?.value ||
    request.cookies.get('supabase-auth-token')?.value ||
    (() => {
      for (const [name, value] of request.cookies.getAll().map(c => [c.name, c.value] as const)) {
        if (name.startsWith('sb-') && name.endsWith('-auth-token')) return value;
      }
      return null;
    })();

  if (!accessToken) {
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
