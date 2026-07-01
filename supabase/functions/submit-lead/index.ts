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

  // Cloudflare Turnstile verification
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!turnstileToken || !turnstileSecret) {
    return new Response(JSON.stringify({ error: "Missing CAPTCHA token" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
  const verifyForm = new FormData();
  verifyForm.append("secret", turnstileSecret);
  verifyForm.append("response", turnstileToken);
  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: verifyForm,
  });
  const verifyData = await verifyRes.json() as { success: boolean };
  if (!verifyData.success) {
    return new Response(JSON.stringify({ error: "CAPTCHA verification failed" }), {
      status: 403,
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
  const photosB64 = Array.isArray(body.photos)
    ? (body.photos as unknown[]).filter((p): p is string => typeof p === "string").slice(0, 5)
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

  // Upload photos to Storage and collect public URLs
  const photoUrls: string[] = [];
  for (const b64 of photosB64) {
    try {
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const filename = `${crypto.randomUUID()}.jpg`;
      const { error } = await supabase.storage
        .from("lead-photos")
        .upload(filename, bytes, { contentType: "image/jpeg" });
      if (error) {
        console.error("Storage upload error:", error.message);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from("lead-photos")
          .getPublicUrl(filename);
        photoUrls.push(publicUrl);
      }
    } catch (e) {
      console.error("Photo processing error:", e);
    }
  }

  const { data: lead, error: dbError } = await supabase
    .from("leads")
    .insert({
      name,
      phone,
      city,
      address: address || null,
      message: message || null,
      services,
      ...(photoUrls.length > 0 ? { photos: photoUrls } : {}),
    })
    .select()
    .single();

  if (dbError) {
    console.error("DB insert error:", dbError);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  // Notify the bot directly (replaces pg_net trigger — no extension needed)
  const botUrl    = Deno.env.get("BOT_WEBHOOK_URL");
  const botSecret = Deno.env.get("BOT_WEBHOOK_SECRET");
  if (botUrl && botSecret && lead) {
    fetch(botUrl, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${botSecret}`,
      },
      body: JSON.stringify({
        type:       "INSERT",
        table:      "leads",
        schema:     "public",
        record:     lead,
        old_record: null,
      }),
    }).catch((err) => console.error("Bot notification failed:", err));
  }

  return new Response(JSON.stringify({ ok: true, id: lead.id }), {
    status: 201,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
});
