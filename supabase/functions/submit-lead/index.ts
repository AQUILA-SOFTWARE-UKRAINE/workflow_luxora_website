import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  // Honeypot — bots fill this hidden field
  if (body._trap) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const name    = typeof body.name    === "string" ? body.name.trim()    : "";
  const phone   = typeof body.phone   === "string" ? body.phone.trim()   : "";
  const city    = typeof body.city    === "string" ? body.city.trim()    : "";
  const address = typeof body.address === "string" ? body.address.trim() : null;
  const message = typeof body.message === "string" ? body.message.trim() : null;
  const services = Array.isArray(body.services)
    ? (body.services as unknown[]).filter((s): s is string => typeof s === "string")
    : [];

  if (!name || !phone || !city) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 422,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: lead, error: dbError } = await supabase
    .from("leads")
    .insert({ name, phone, city, address: address || null, message: message || null, services })
    .select("id")
    .single();

  if (dbError) {
    console.error("DB insert error:", dbError);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, id: lead.id }), {
    status: 201,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
});
