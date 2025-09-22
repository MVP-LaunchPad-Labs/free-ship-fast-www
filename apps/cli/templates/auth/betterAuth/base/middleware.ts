import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	if (
		request.nextUrl.pathname.startsWith('/_next') ||
		request.nextUrl.pathname.startsWith('/api')
	) {
		return NextResponse.next();
	}

	const { pathname } = request.nextUrl;
	const sessionCookie = getSessionCookie(request);
	const isAuthenticated = !!sessionCookie;

	// Define route patterns
	const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];
	const publicRoutes = ["/", ...authRoutes];
	
	const isAuthRoute = authRoutes.includes(pathname);
	const isPublicRoute = publicRoutes.includes(pathname);

	// Redirect authenticated users away from auth pages to dashboard
	if (isAuthenticated && isAuthRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Redirect unauthenticated users from protected routes to sign-in
	if (!isAuthenticated && !isPublicRoute) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
