// middleware.js

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Get the token from cookies
  const token = req.cookies.get('token');
  
  // Log the token for debugging
  console.log('Token:', token);

  // Define the paths that should be protected
  const protectedPaths = ['/', '/account', '/transaction', '/top-up'];

  // Check if the request is for a protected path
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));
  
  // Log the pathname for debugging
  console.log('Requested Path:', req.nextUrl.pathname);

  // Allow access to the login page regardless of the token
  if ((req.nextUrl.pathname === '/login' && !token) ||
    (req.nextUrl.pathname === '/registration' && !token)) {
    return NextResponse.next();
  }

  // If the request is for a protected path and no token is found, redirect to the login page
  if (isProtectedPath && !token) {
    console.log('No token found, redirecting to login.');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token exists or path is not protected, allow the request to proceed
  return NextResponse.next();
}

// Specify the paths to which the middleware applies
export const config = {
  matcher: ['/', '/account', '/transaction', '/top-up', '/login', '/registration'],
};