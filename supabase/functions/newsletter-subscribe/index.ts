import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Nom et email requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, confirmed")
      .eq("email", email)
      .maybeSingle();

    if (existing?.confirmed) {
      return new Response(
        JSON.stringify({ message: "Vous êtes déjà inscrit à notre newsletter." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let token: string;

    if (existing && !existing.confirmed) {
      // Resend confirmation
      const { data: updated } = await supabase
        .from("newsletter_subscribers")
        .update({ confirmation_token: crypto.randomUUID(), name })
        .eq("id", existing.id)
        .select("confirmation_token")
        .single();
      token = updated!.confirmation_token;
    } else {
      const { data: inserted, error } = await supabase
        .from("newsletter_subscribers")
        .insert({ name, email })
        .select("confirmation_token")
        .single();

      if (error) throw error;
      token = inserted!.confirmation_token;
    }

    // Send confirmation email via Resend
    const confirmUrl = `https://upgoma.lovable.app/confirmer-newsletter?token=${token}`;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "UPG Newsletter <onboarding@resend.dev>",
        to: [email],
        subject: "Confirmez votre inscription à la newsletter UPG",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
    <div style="background:#1a2b5f;padding:24px;text-align:center;">
      <h1 style="color:#f97316;margin:0;font-size:28px;">UPG</h1>
      <p style="color:#ffffffcc;margin:4px 0 0;font-size:13px;">Université Polytechnique de Goma</p>
    </div>
    <div style="padding:24px;">
      <p>Bonjour <strong>${name}</strong>,</p>
      <p>Merci pour votre inscription à la newsletter de l'UPG ! Veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${confirmUrl}" style="background:#f97316;color:#fff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
          Confirmer mon inscription
        </a>
      </div>
      <p style="color:#666;font-size:13px;">Si vous n'avez pas demandé cette inscription, ignorez simplement cet email.</p>
    </div>
    <div style="background:#f4f4f4;padding:12px;text-align:center;font-size:11px;color:#999;">
      © ${new Date().getFullYear()} Université Polytechnique de Goma
    </div>
  </div>
</body>
</html>`,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      throw new Error(`Resend API error [${emailRes.status}]: ${errBody}`);
    }
    await emailRes.json();

    return new Response(
      JSON.stringify({ message: "Un email de confirmation vous a été envoyé." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    const msg = error instanceof Error ? error.message : "Erreur inconnue";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
