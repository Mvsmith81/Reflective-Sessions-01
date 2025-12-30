// Safe environment variable diagnostic logging
try {
  const env = (import.meta as any).env || {};
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;

  console.info(
    `ENV DIAG — URL set?: ${!!url}, ANON length: ${key ? key.length : 0}`
  );
} catch (e) {
  console.error("ENV DIAG failed", e);
}

export {};