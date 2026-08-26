<?php
// Copy this file to `enquiry-config.php` in the same folder and fill in the real
// values. `enquiry-config.php` is gitignored so the password never reaches git.
//
// These are the same credentials the old Next.js nodemailer route used, and the
// same ones still listed in .env.local.

return [
    'smtp_host'   => 'smtp.hostinger.com',
    'smtp_port'   => 465,          // 465 = implicit SSL
    'smtp_user'   => 'you@example.com',
    'smtp_pass'   => 'your-mailbox-password',

    // Where enquiries are delivered.
    'admin_email' => 'you@example.com',
];
