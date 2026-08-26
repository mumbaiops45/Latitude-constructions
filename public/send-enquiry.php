<?php
/**
 * Enquiry endpoint for the static site.
 *
 * The site is a Next.js static export (`output: 'export'`), so there is no Node
 * server to run the old nodemailer route. Hostinger serves PHP alongside the
 * static files, so this script takes its place: same JSON contract, same email
 * template, and mail is sent through the account's own SMTP so it arrives from
 * info@latitudeconstructions.in rather than a third-party relay.
 *
 * Deployed by uploading the `out/` folder — this file is copied there by the
 * build, since anything in `public/` becomes a static asset.
 */

declare(strict_types=1);

date_default_timezone_set('Asia/Kolkata');

header('Content-Type: application/json; charset=utf-8');

// ==========================================
// 0. Origin policy
// ==========================================
//
// Production is same-origin — the form and this script are served from
// latitudeconstructions.in — so no CORS headers are needed there and none are
// granted.
//
// The one exception is a developer machine: `next dev` runs the site on
// http://localhost:3000 and cannot execute PHP, so the form posts across
// origins to a PHP server (locally on :8000, or straight at the live site).
// Only loopback origins are allowed, and only for this endpoint, which does
// nothing but email the site owner. Delete this block to lock the endpoint
// down to same-origin entirely.

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '' && preg_match('~^https?://(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$~', $origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Max-Age: 600');
}

// A JSON POST is preflighted; answer before the method check below rejects it.
header('Vary: Origin');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$config = @include __DIR__ . '/enquiry-config.php';

if (!is_array($config)) {
    error_log('send-enquiry: enquiry-config.php missing or unreadable');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email configuration is incomplete.',
    ]);
    exit;
}

// ==========================================
// 1. Read and validate the submission
// ==========================================

$body = json_decode((string) file_get_contents('php://input'), true);

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

$name    = trim((string) ($body['name'] ?? ''));
$email   = trim((string) ($body['email'] ?? ''));
$phone   = trim((string) ($body['phone'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// A submitted value must never be able to inject headers into the message.
$email = str_replace(["\r", "\n"], '', $email);
$name  = str_replace(["\r", "\n"], '', $name);

// ==========================================
// 2. Build the email
// ==========================================

$safeName    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone   = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

// Matches the old route's toLocaleString("en-IN", {dateStyle:"full", timeStyle:"short"})
$dateTime = date('l, j F Y \a\t g:i a');

$html = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Latitude Constructions Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f5f7f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;background:#f5f7f5;">
    <tr>
      <td align="center">
        <table width="650" cellpadding="0" cellspacing="0" style="width:100%;max-width:650px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#041423;padding:35px;text-align:center;">
              <h1 style="margin:0;color:#7CEB1D;font-size:30px;">Latitude Constructions</h1>
              <p style="margin:10px 0 0;color:#d1d5db;font-size:16px;">New Website Enquiry</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:35px;">
              <h2 style="margin:0 0 15px;color:#041423;">New Contact Request</h2>
              <p style="color:#6b7280;font-size:15px;line-height:1.7;">
                A new customer has submitted an enquiry through the Latitude Constructions website.
              </p>

              <!-- CUSTOMER DETAILS -->
              <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse:collapse;margin-top:25px;">
                <tr style="background:#f8faf8;">
                  <td style="width:170px;font-weight:bold;color:#374151;">Customer Name</td>
                  <td style="color:#111827;">$safeName</td>
                </tr>
                <tr>
                  <td style="font-weight:bold;color:#374151;">Email</td>
                  <td><a href="mailto:$safeEmail" style="color:#16a34a;text-decoration:none;">$safeEmail</a></td>
                </tr>
                <tr style="background:#f8faf8;">
                  <td style="font-weight:bold;color:#374151;">Phone</td>
                  <td><a href="tel:$safePhone" style="color:#16a34a;text-decoration:none;">$safePhone</a></td>
                </tr>
                <tr>
                  <td style="font-weight:bold;color:#374151;vertical-align:top;">Message</td>
                  <td style="color:#111827;line-height:1.6;">$safeMessage</td>
                </tr>
                <tr style="background:#f8faf8;">
                  <td style="font-weight:bold;color:#374151;">Date &amp; Time</td>
                  <td style="color:#111827;">$dateTime</td>
                </tr>
              </table>

              <!-- ACTION BOX -->
              <div style="margin-top:30px;padding:20px;background:#f0fdf4;border-left:5px solid #7CEB1D;border-radius:8px;">
                <h3 style="margin:0 0 8px;color:#166534;">New Lead Received</h3>
                <p style="margin:0;color:#4b5563;line-height:1.6;">
                  Please contact the customer regarding their farmhouse construction enquiry.
                </p>
              </div>

              <!-- CALL BUTTON -->
              <div style="text-align:center;margin-top:30px;">
                <a href="tel:$safePhone" style="display:inline-block;background:#7CEB1D;color:#041423;text-decoration:none;padding:14px 30px;border-radius:30px;font-weight:bold;">Call Customer</a>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#041423;padding:25px;text-align:center;">
              <p style="margin:0;color:#7CEB1D;font-weight:bold;">Latitude Constructions</p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:13px;">Farmhouse Design &amp; Construction</p>
              <p style="margin:15px 0 0;color:#6b7280;font-size:12px;">This email was automatically generated from the website.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

// ==========================================
// 3. Send it
// ==========================================

try {
    smtp_send_mail($config, $email, $name, $html);

    echo json_encode([
        'success' => true,
        'message' => 'Your enquiry has been submitted successfully.',
    ]);
} catch (Throwable $e) {
    // Log the detail, return something a visitor can act on.
    error_log('send-enquiry SMTP failure: ' . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send your enquiry. Please try again later.',
    ]);
}

// ==========================================
// Minimal SMTP client
// ==========================================
//
// Hostinger's SMTP on port 465 is implicit SSL. This speaks just enough of the
// protocol to authenticate and post one message — no dependency to install or
// keep updated on the server.

/**
 * @param array<string,mixed> $config
 * @throws RuntimeException
 */
function smtp_send_mail(array $config, string $replyTo, string $customerName, string $html): void
{
    $host = (string) $config['smtp_host'];
    $port = (int) $config['smtp_port'];
    $user = (string) $config['smtp_user'];
    $pass = (string) $config['smtp_pass'];
    $to   = (string) $config['admin_email'];

    $transport = $port === 465 ? 'ssl' : 'tcp';

    $fp = @stream_socket_client(
        "$transport://$host:$port",
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT
    );

    if ($fp === false) {
        throw new RuntimeException("connect failed: $errstr ($errno)");
    }

    stream_set_timeout($fp, 20);

    try {
        smtp_expect($fp, 220, 'greeting');

        $hostname = $_SERVER['SERVER_NAME'] ?? 'localhost';
        smtp_write($fp, "EHLO $hostname");
        smtp_expect($fp, 250, 'EHLO');

        // STARTTLS path, for the port 587 case.
        if ($port !== 465) {
            smtp_write($fp, 'STARTTLS');
            smtp_expect($fp, 220, 'STARTTLS');

            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('TLS negotiation failed');
            }

            smtp_write($fp, "EHLO $hostname");
            smtp_expect($fp, 250, 'EHLO after STARTTLS');
        }

        smtp_write($fp, 'AUTH LOGIN');
        smtp_expect($fp, 334, 'AUTH LOGIN');

        smtp_write($fp, base64_encode($user));
        smtp_expect($fp, 334, 'username');

        smtp_write($fp, base64_encode($pass));
        smtp_expect($fp, 235, 'password');

        smtp_write($fp, "MAIL FROM:<$user>");
        smtp_expect($fp, 250, 'MAIL FROM');

        smtp_write($fp, "RCPT TO:<$to>");
        smtp_expect($fp, [250, 251], 'RCPT TO');

        smtp_write($fp, 'DATA');
        smtp_expect($fp, 354, 'DATA');

        fwrite($fp, smtp_message($user, $to, $replyTo, $customerName, $html));
        fwrite($fp, "\r\n.\r\n");
        smtp_expect($fp, 250, 'message body');

        smtp_write($fp, 'QUIT');
    } finally {
        fclose($fp);
    }
}

function smtp_write($fp, string $command): void
{
    fwrite($fp, $command . "\r\n");
}

/**
 * @param int|int[] $expected
 * @throws RuntimeException
 */
function smtp_expect($fp, $expected, string $stage): string
{
    $response = '';

    while (($line = fgets($fp, 515)) !== false) {
        $response .= $line;

        // A multi-line reply has '-' as the fourth character; the final line has ' '.
        if (strlen($line) < 4 || $line[3] !== '-') {
            break;
        }
    }

    if ($response === '') {
        throw new RuntimeException("$stage: no response (timed out)");
    }

    $code = (int) substr($response, 0, 3);

    if (!in_array($code, (array) $expected, true)) {
        throw new RuntimeException("$stage rejected: " . trim($response));
    }

    return $response;
}

function smtp_message(string $from, string $to, string $replyTo, string $customerName, string $html): string
{
    $subject = "New Website Enquiry - $customerName";

    // RFC 2047-encode the subject only when it needs it, so plain ASCII
    // subjects stay readable in every client.
    if (preg_match('/[^\x20-\x7E]/', $subject)) {
        $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    }

    $headers = [
        'From: "Latitude Constructions" <' . $from . '>',
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . $subject,
        'Date: ' . date('r'),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . substr(strrchr($from, '@') ?: '@localhost', 1) . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    // Normalise to CRLF, then dot-stuff so a line of "." cannot end the message early.
    $body = preg_replace('/\r\n|\r|\n/', "\r\n", $html);
    $body = preg_replace('/^\./m', '..', (string) $body);

    return implode("\r\n", $headers) . "\r\n\r\n" . $body;
}
