import { createServerClient } from '@supabase/ssr'; // Or createClient from @supabase/supabase-js, ensure it's server-side
import { NextResponse, type NextRequest } from 'next/server';

// You might want to define a constant for your session cookie name
const SESSION_COOKIE_NAME = 'my-custom-session';

export async function middleware(request: NextRequest) {
// 1. Initialize Supabase client for server-side operations
// This client will be used to query your custom 'users' table
const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Use ANON key for initial read, or service role key if absolutely necessary and secured
{
cookies: {
getAll() {
return request.cookies.getAll();
},
setAll(cookiesToSet) {
// This part is crucial for making the cookies accessible on the client side
// and for handling potential updates if you store user info in the cookie
cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
},
},
}
);

let authenticatedUser = null;
const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

// 2. Validate Custom Session Token
if (sessionToken) {
try {
// Query your custom 'users' table to find the user by their session token
const { data: user, error: fetchError } = await supabase
.from('users') // Your custom users table
.select('*') // Select necessary user details
.eq('session_token', sessionToken) // Assuming you have a 'session_token' column
.single(); // Use single if you expect only one user per session token

if (fetchError) {
console.error("Error fetching user by session token:", fetchError);
// Handle database errors, perhaps clear the session cookie
// For simplicity, we'll just treat it as unauthenticated
} else if (user) {
authenticatedUser = user;
console.log("Custom session validated for user:", user.email);
// Optional: If you want to refresh the session token or its expiry, do it here
}
} catch (err) {
console.error("Unexpected error during custom session validation:", err);
}
}

// Define public routes that don't require authentication
const publicRoutes = ['/signin', '/signup', '/']; // '/auth' might be your custom auth endpoint, adjust as needed
const isPublicRoute = publicRoutes.some(route =>
request.nextUrl.pathname.startsWith(route)
);

// 3. Authentication Logic Based on Custom Session
let response = NextResponse.next({
request,
});

if (!authenticatedUser && !isPublicRoute) {
// No authenticated user from custom session, redirect to signin page
const url = request.nextUrl.clone();
url.pathname = '/signin';
return NextResponse.redirect(url);
}

// If user is logged in (via custom session) and trying to access signin/signup, redirect to dashboard
if (authenticatedUser && (request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup'))) {
const url = request.nextUrl.clone();
url.pathname = '/private'; // or wherever you want logged-in users to go
return NextResponse.redirect(url);
}

// If user is authenticated, you might want to pass user info to the request
// (e.g., as a header, or make it available through a context in client components)
// This is more advanced and depends on how you want to access user data on pages.
// For now, simply allowing access is enough.

return response; // Proceed to the requested page
}

// Important: Ensure you have a 'session_token' column in your 'public.users' table.
// And set up RLS on 'public.users' to allow 'SELECT' based on `session_token` for `anon` role.
// E.g., CREATE POLICY "Allow select by session token" ON public.users FOR SELECT USING (session_token = current_session_id_from_cookie);
// This is more complex than simple `true`, you'll need to define how the cookie value maps to RLS.
// For testing, you might still need a `true` RLS policy if your `session_token` isn't accessible via a session variable in RLS.

// A simpler RLS for initial testing if you're fetching by the exact token:
// CREATE POLICY "Allow read based on session_token" ON public.users FOR SELECT USING (true);
// (Then later refine this if you can securely pass the session token to RLS context)