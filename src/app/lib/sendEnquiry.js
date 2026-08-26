// Enquiry submission.
//
// Posts to public/send-enquiry.php, which sends the branded HTML email through
// Hostinger SMTP. PHP is used rather than a Next.js route handler because the
// site builds with `output: 'export'` to produce the out/ folder — a static
// export has no Node server, so a route handler would break the build.
//
// The old nodemailer route is recoverable if ever needed:
//   git show HEAD:src/app/api/enquiry/route.js
//
// ── Where the POST goes ──────────────────────────────────────────────────────
//
// In production the endpoint is same-origin: the form and the PHP script are
// both served from latitudeconstructions.in.
//
// `next dev` cannot execute PHP, so a same-origin POST there returns 405. In
// development the default therefore points at the local PHP server started by
// `npm run php` (see package.json), which serves public/ on port 8000.
//
// Override either default with NEXT_PUBLIC_ENQUIRY_ENDPOINT in .env.local — set
// it to https://latitudeconstructions.in/send-enquiry.php to drive the live
// endpoint from localhost. send-enquiry.php grants CORS to localhost origins
// for exactly this case.

const ENDPOINT =
  process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8000/send-enquiry.php"
    : "/send-enquiry.php");

/**
 * Sends an enquiry. Resolves on a confirmed send, throws otherwise — the same
 * contract callers have always used.
 *
 * @param {{ name: string, email: string, phone: string, message: string }} formData
 */
export async function sendEnquiry(formData) {
  let response;

  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch {
    // Network-level failure — offline, or in development the PHP server on
    // port 8000 isn't running.
    throw new Error(
      process.env.NODE_ENV === "development"
        ? `Could not reach ${ENDPOINT} — is the enquiry server running? Start it with: npm run php`
        : "Unable to send your enquiry. Please try again later."
    );
  }

  // A misconfigured server can return an HTML error page instead of JSON;
  // don't let that surface as a JSON parse error.
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Unable to send your enquiry. Please try again later.");
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to send enquiry.");
  }

  return data;
}
