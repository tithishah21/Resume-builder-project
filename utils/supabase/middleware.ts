import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Initialize Supabase client for server-side operations
  // This client will be used to query your custom 'users' table
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        },
      },
    }
  );

  let authenticatedUser = null;
  let customSessionToken: string | null = null;

  // Attempt to retrieve the session token from the Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    customSessionToken = authHeader.substring(7); // Extract the token after 'Bearer '
    console.log("Token found in Authorization header:", customSessionToken ? 'Yes' : 'No');
  }

  // If a custom session token is found, validate it against your custom 'users' table
  if (customSessionToken) {
    try {
      const { data: user, error: fetchError } = await supabase
        .from('users') // Your custom users table
        .select('*') // Select necessary user details
        .eq('session_token', customSessionToken) // Assuming you have a 'session_token' column
        .single(); // Use single if you expect only one user per session token

      if (fetchError) {
        console.error("Error fetching user by session token:", fetchError.message);
        // Handle database errors, e.g., token not found or invalid
        // For simplicity, we'll just treat it as unauthenticated
      } else if (user) {
        authenticatedUser = user;
        console.log("Custom session validated for user:", user.email);
        // Optional: If you want to refresh the session token or its expiry, do it here
      }
    } catch (err) {
      console.error("Unexpected error during custom session validation:", err);
    }
  } else {
    console.log("No custom session token found in Authorization header.");
  }

  // Define public routes that don't require authentication
  const publicRoutes = ['/signin', '/signup', '/'];
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  let response = NextResponse.next({ request });

  // Authentication Logic Based on Custom Session
  if (!authenticatedUser && !isPublicRoute) {
    // No authenticated user from custom session, redirect to signin page
    console.log("Redirecting to signin: User not authenticated and not a public route.");
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  // If user is logged in (via custom session) and trying to access signin/signup, redirect to dashboard
  if (authenticatedUser && (request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup'))) {
    console.log("Redirecting to /private: User authenticated and trying to access signin/signup.");
    const url = request.nextUrl.clone();
    url.pathname = '/private'; // or wherever you want logged-in users to go (e.g., '/dashboard')
    return NextResponse.redirect(url);
  }

  return response; // Proceed to the requested page
}

// Important: Ensure you have a 'session_token' column in your 'public.users' table
// and that it's populated and invalidated correctly on login/logout.