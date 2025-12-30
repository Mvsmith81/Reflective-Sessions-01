import { createClient } from '@supabase/supabase-js';

// Access environment variables with type assertion to avoid TS errors
// Use fallback object to prevent runtime errors if import.meta.env is undefined
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

let client;

if (!supabaseUrl || !supabaseKey) {
  // In production, strictly enforce environment variables
  if (env.PROD) {
    const msg = "Critical Error: Supabase URL and Key are required in production mode.";
    console.error(msg);
    // Replace body content with error message to ensure visibility
    document.body.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8fafc; font-family: system-ui, sans-serif;">
        <div style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; max-width: 400px; text-align: center;">
          <div style="color: #ef4444; margin-bottom: 1rem; display: flex; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h1 style="font-size: 1.25rem; font-weight: bold; color: #0f172a; margin-bottom: 0.5rem;">Configuration Error</h1>
          <p style="color: #64748b; font-size: 0.875rem;">${msg}</p>
        </div>
      </div>
    `;
    throw new Error(msg);
  }

  // In development, fallback to mock client with warning
  console.warn('Missing Supabase environment variables. Running in fallback mode with mock client.');
  
  // Mock response that simulates a failed DB request
  const mockResponse = { data: null, error: { message: 'Missing Supabase credentials (Fallback Mode)' } };

  // A simple mock builder that allows chaining and resolves to an error
  const mockBuilder: any = {
    select: () => mockBuilder,
    order: () => mockBuilder,
    eq: () => mockBuilder,
    single: async () => mockResponse,
    maybeSingle: async () => mockResponse,
    upsert: async () => mockResponse,
    delete: () => mockBuilder,
    // Make the builder thenable so 'await query' resolves to the mock response
    then: (resolve: (val: any) => void) => resolve(mockResponse)
  };

  client = {
    from: () => mockBuilder,
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: { session: null }, error: { message: 'Auth not configured (Fallback Mode)' } }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      updateUser: async () => ({ error: { message: 'Auth not configured (Fallback Mode)' } })
    }
  } as any;

} else {
  client = createClient(supabaseUrl, supabaseKey);
}

export const supabase = client;