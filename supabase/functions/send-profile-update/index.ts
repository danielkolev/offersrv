
import { Resend } from "npm:resend@2.0.0";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProfileUpdateRequest {
  email: string;
  firstName: string;
  lastName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName }: ProfileUpdateRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Profile Update <onboarding@resend.dev>",
      to: [email],
      subject: "Profile Update Confirmation",
      html: `
        <h1>Profile Update Confirmation</h1>
        <p>Hello ${firstName} ${lastName},</p>
        <p>Your profile has been successfully updated.</p>
        <p>If you did not make this change, please contact support immediately.</p>
        <p>Best regards,<br>The Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-profile-update function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
