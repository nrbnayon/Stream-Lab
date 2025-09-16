// middleware.js
import { NextResponse } from "next/server";

// =====================================================================
// CONSTANTS
// =====================================================================

// Protected routes - these require authentication
export const PROTECTED_ROUTES = [
  // User routes
  "/watch",
  "/my-library",
  "/my-titles",
  "/submit-film",
  "/film",
  "/reelbux",
  "/distro",
  "/ai-creator-lab",
  "/settings",

  // Admin routes
  "/admin/dashboard",
  "/admin/manage-users",
  "/admin/films",
  "/admin/subscribers",
  "/admin/payments",
  "/admin/distro",
  "/admin/settings",
];

// Authentication routes - redirect to dashboard if already logged in
const AUTH_ROUTES = ["/signin", "/signup", "/reset-password"];

// Public routes - accessible to everyone
const PUBLIC_ROUTES = [
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/help",
  "/faq",
  "/unauthorized",
];

// Admin-only routes
const ADMIN_ROUTES = [
  "/admin/dashboard",
  "/admin/manage-users",
  "/admin/films",
  "/admin/subscribers",
  "/admin/payments",
  "/admin/distro",
  "/admin/settings",
];

// =====================================================================
// UTILITY FUNCTIONS
// =====================================================================

/**
 * Check if the pathname matches any of the given route patterns
 */
function matchesRoutes(pathname, routes) {
  return routes.some((route) => {
    // Exact match
    if (pathname === route) return true;
    // Dynamic route match (e.g., /film/123 matches /film)
    if (pathname.startsWith(route + "/")) return true;
    return false;
  });
}

/**
 * Validate JWT token format (basic structure check)
 */
function isValidJWTFormat(token) {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    // Check if each part is valid base64
    parts.forEach((part) => {
      if (part) {
        atob(part.replace(/-/g, "+").replace(/_/g, "/"));
      }
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if JWT token is expired
 */
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
}

/**
 * Get user role from JWT token or cookies
 */
function getUserRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

/**
 * Get user role from cookies (faster method)
 */
function getUserRoleFromCookies(request) {
  return request.cookies.get("userRole")?.value || null;
}

/**
 * Check if user is authenticated and get their info
 */
function getAuthInfo(request) {
  const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";

  if (isDev) {
    console.log("🔍 [AUTH] Checking authentication...");
  }

  try {
    // Check for tokens in cookies (primary method)
    const tokenFromCookie = request.cookies.get("accessToken")?.value;

    // Check for Authorization header as fallback
    const authHeader = request.headers.get("authorization");
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    // Check for custom headers
    const tokenFromCustomHeader = request.headers.get("x-accessToken");

    const token = tokenFromCookie || tokenFromHeader || tokenFromCustomHeader;

    if (isDev) {
      console.log(
        "🍪 [AUTH] Token from cookie:",
        tokenFromCookie ? "✅ Present" : "❌ Missing"
      );
      console.log(
        "🍪 [AUTH] Token from header:",
        tokenFromHeader ? "✅ Present" : "❌ Missing"
      );
    }

    if (!token || token.trim().length === 0) {
      if (isDev) console.log("❌ [AUTH] No token found");
      return { isAuthenticated: false, role: null, token: null };
    }

    // Validate JWT format
    if (!isValidJWTFormat(token)) {
      if (isDev) console.log("❌ [AUTH] Invalid token format");
      return { isAuthenticated: false, role: null, token: null };
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      if (isDev) console.log("❌ [AUTH] Token is expired");
      return { isAuthenticated: false, role: null, token: null };
    }

    // Get user role (try cookies first for performance, then JWT)
    let role = getUserRoleFromCookies(request);
    if (!role && token) {
      role = getUserRoleFromToken(token);
    }

    if (isDev) console.log("✅ [AUTH] Authentication successful, role:", role);
    return { isAuthenticated: true, role, token };
  } catch (error) {
    console.error("💥 [AUTH] Authentication check failed:", error);
    return { isAuthenticated: false, role: null, token: null };
  }
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response) {
  // Prevent click jacking
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Control referrer information
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Add CORS headers for API routes
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-accessToken"
  );

  // Only in production, add HSTS
  if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }
}

/**
 * Create secure redirect response
 */
function createRedirectResponse(request, destination) {
  const url = new URL(destination, request.url);
  const response = NextResponse.redirect(url);
  addSecurityHeaders(response);
  return response;
}

/**
 * Create secure next response
 */
function createNextResponse() {
  const response = NextResponse.next();
  addSecurityHeaders(response);
  return response;
}

// =====================================================================
// MAIN MIDDLEWARE FUNCTION
// =====================================================================

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";

  if (isDev) {
    console.log(`\n🚀 [MIDDLEWARE] ${method} ${pathname}`);
  }

  // Skip middleware for Next.js internals, static files, and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/public/") ||
    (pathname.includes(".") &&
      !pathname.endsWith("/") &&
      (pathname.includes(".js") ||
        pathname.includes(".css") ||
        pathname.includes(".png") ||
        pathname.includes(".jpg") ||
        pathname.includes(".svg") ||
        pathname.includes(".ico") ||
        pathname.includes(".gif") ||
        pathname.includes(".json")))
  ) {
    return NextResponse.next();
  }

  try {
    // Get authentication info
    const { isAuthenticated, role } = getAuthInfo(request);

    // Handle root path - PUBLIC (redirect based on auth status)
    if (pathname === "/") {
      if (isDev) console.log(`🏠 [MIDDLEWARE] Root path accessed`);

      if (isAuthenticated) {
        // Redirect authenticated users based on role
        if (role === "admin") {
          if (isDev)
            console.log(`🏠 [MIDDLEWARE] Admin user → admin dashboard`);
          return createRedirectResponse(request, "/admin/dashboard");
        } else {
          if (isDev) console.log(`🏠 [MIDDLEWARE] Regular user → watch`);
          return createRedirectResponse(request, "/watch");
        }
      } else {
        // Allow unauthenticated users to see homepage
        if (isDev)
          console.log(
            `🏠 [MIDDLEWARE] Unauthenticated user → homepage allowed`
          );
        return createNextResponse();
      }
    }

    // 🔒 ADMIN ROUTES - STRICT ENFORCEMENT
    if (matchesRoutes(pathname, ADMIN_ROUTES)) {
      if (isDev) console.log(`👑 [MIDDLEWARE] Admin route: ${pathname}`);

      if (!isAuthenticated) {
        if (isDev)
          console.log(
            `🚫 [MIDDLEWARE] Not authenticated → Redirecting to signin`
          );
        const signinUrl = new URL("/signin", request.url);
        signinUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(signinUrl);
      }

      if (role !== "admin") {
        if (isDev)
          console.log(
            `🚫 [MIDDLEWARE] Not admin → Redirecting to unauthorized`
          );
        return createRedirectResponse(request, "/unauthorized");
      }

      if (isDev) console.log(`✅ [MIDDLEWARE] Admin access granted`);
      return createNextResponse();
    }

    // 🔒 PROTECTED ROUTES - AUTHENTICATION REQUIRED
    if (matchesRoutes(pathname, PROTECTED_ROUTES)) {
      if (isDev) console.log(`🔒 [MIDDLEWARE] Protected route: ${pathname}`);

      if (!isAuthenticated) {
        if (isDev)
          console.log(`🚫 [MIDDLEWARE] Access denied → Redirecting to signin`);
        const signinUrl = new URL("/signin", request.url);
        signinUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(signinUrl);
      }

      if (isDev) console.log(`✅ [MIDDLEWARE] Access granted`);
      return createNextResponse();
    }

    // 🚪 AUTHENTICATION ROUTES
    if (matchesRoutes(pathname, AUTH_ROUTES)) {
      if (isDev) console.log(`🚪 [MIDDLEWARE] Auth route: ${pathname}`);

      if (isAuthenticated) {
        // Redirect based on role
        if (role === "admin") {
          if (isDev)
            console.log(
              `↩️  [MIDDLEWARE] Already authenticated admin → admin dashboard`
            );
          return createRedirectResponse(request, "/admin/dashboard");
        } else {
          if (isDev)
            console.log(`↩️  [MIDDLEWARE] Already authenticated user → watch`);
          return createRedirectResponse(request, "/watch");
        }
      }

      return createNextResponse();
    }

    // 🌍 PUBLIC ROUTES
    if (matchesRoutes(pathname, PUBLIC_ROUTES)) {
      if (isDev) console.log(`🌍 [MIDDLEWARE] Public route: ${pathname}`);
      return createNextResponse();
    }

    // 🛡️ UNKNOWN ROUTES - DEFAULT TO PROTECTED FOR SECURITY
    if (isDev)
      console.log(
        `❓ [MIDDLEWARE] Unknown route: ${pathname} - treating as protected`
      );

    if (!isAuthenticated) {
      if (isDev) console.log(`🚫 [MIDDLEWARE] Unknown route blocked`);
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signinUrl);
    }

    return createNextResponse();
  } catch (error) {
    console.error("💥 [MIDDLEWARE] Critical error:", error);
    return createNextResponse();
  }
}

// =====================================================================
// MIDDLEWARE CONFIG
// =====================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - files with extensions
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.).*)",
  ],
};
