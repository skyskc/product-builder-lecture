export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const to = String(body?.to || '').trim();
    const subject = String(body?.subject || '').trim();
    const text = String(body?.text || '').trim();

    if (!to || !subject || !text) {
      return jsonResponse(400, { error: 'Invalid payload' });
    }
    if (!isLikelyEmail(to)) {
      return jsonResponse(400, { error: 'Invalid email address' });
    }

    if (!env.RESEND_API_KEY || !env.MAIL_FROM) {
      return jsonResponse(500, { error: 'Server email config missing (RESEND_API_KEY / MAIL_FROM)' });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: [to],
        subject,
        text
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return jsonResponse(502, { error: `Resend API error: ${errorText}` });
    }

    return jsonResponse(200, { ok: true });
  } catch (error) {
    return jsonResponse(500, { error: error?.message || 'Internal server error' });
  }
}

function isLikelyEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
