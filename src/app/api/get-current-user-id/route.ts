// src/app/api/get-current-user-id/route.ts

import { NextResponse } from 'next/server';
// Remove 'cookies' import from here, as createClient will handle it internally
// import { cookies } from 'next/headers'; // <--- REMOVE THIS LINE
import { createClient } from '../../../../utils/supabase/server'; // This path is correct

export async function GET() {
  try {
    // 1. Remove the cookieStore = cookies() line here
    // 2. Await the createClient() call because your server.ts function is async
    const supabase = await createClient(); // Call without arguments, as defined in your server.ts

    // Get the session from Supabase Auth
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting Supabase session:', sessionError);
      return NextResponse.json({ error: 'Session error' }, { status: 500 });
    }

    if (!session) {
      console.log('No active Supabase session found.');
      return NextResponse.json({ userId: null, message: 'User not authenticated' }, { status: 401 });
    }

    const supabaseAuthId = session.user.id;

    // Query your custom 'users' table to find the corresponding int8 user ID
    const { data: customUserData, error: customUserError } = await supabase
      .from('users')
      .select('id')
      .eq('supabase_uuid', supabaseAuthId) // Assuming 'supabase_uuid' column exists and is populated
      .single();

    if (customUserError) {
      console.error('Error fetching custom user ID from users table:', customUserError);
      return NextResponse.json({ error: 'Failed to retrieve custom user ID' }, { status: 500 });
    }

    if (!customUserData) {
      console.warn('Custom user entry not found for Supabase UUID:', supabaseAuthId);
      return NextResponse.json({ userId: null, message: 'Custom user data not found for authenticated UUID' }, { status: 404 });
    }

    return NextResponse.json({ userId: customUserData.id }, { status: 200 });

  } catch (error) {
    console.error('Unhandled error in get-current-user-id API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}