// Phase 0 scaffold: deploy and invoke this to verify Edge Functions are live.
// supabase functions deploy health
// curl https://<project-ref>.supabase.co/functions/v1/health

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve((_req: Request) => {
  return new Response(
    JSON.stringify({ ok: true, timestamp: new Date().toISOString() }),
    { headers: { "Content-Type": "application/json" } },
  );
});
