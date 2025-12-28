import { createClient } from '@supabase/supabase-js';

// Use optional chaining (?.) to access env safely
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

let client;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables. Running in fallback mode with mock client.');
  
  // Mock response that simulates a failed DB request
  const mockResponse = { data: null, error: { message: 'Missing Supabase credentials (Fallback Mode)' } };

  // A simple mock builder that allows chaining and resolves to an error
  const mockBuilder: any = {
    select: () => mockBuilder,
    order: () => mockBuilder,
    eq: () => mockBuilder,
    single: async () => mockResponse,
    upsert: async () => mockResponse,
    delete: () => mockBuilder,
    // Make the builder thenable so 'await query' resolves to the mock response
    then: (resolve: (val: any) => void) => resolve(mockResponse)
  };

  client = {
    from: () => mockBuilder,
  } as any;

} else {
  client = createClient(supabaseUrl, supabaseKey);
}

export const supabase = client;