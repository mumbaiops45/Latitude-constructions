import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Route Handlers must not be cached or statically evaluated: this one
// reads request data and env vars at request time.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Netlify Functions default to a 10s wall clock. Give the SMTP
// handshake + send room to finish inside a bounded window.
export const maxDuration = 20;

export async function POST(req) {
  try {
    // ==========================================
    // 1. Get form data
    // ==========================================

    const body = await req.json();

    const {
      name,
      email,
      phone,
      message,
    } = body;


    // ==========================================
    // 2. Validate required fields
    // ==========================================

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }


    // ==========================================
    // 3. Validate environment variables
    // ==========================================

    const requiredEnv = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "ADMIN_EMAIL",
    ];

    const missingEnv = requiredEnv.filter(
      (key) => !process.env[key]
    );

    if (missingEnv.length > 0) {
      console.error(
        "Missing environment variables:",
        missingEnv
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email configuration is incomplete.",

          // Names only, never values. Makes a misconfigured
          // deploy diagnosable without reading platform logs.
          missing: missingEnv,
        },
        {
          status: 500,
        }
      );
    }


    // ==========================================
    // 4. Create Gmail SMTP transporter
    // ==========================================

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,

      port: Number(process.env.SMTP_PORT),

      secure:
        Number(process.env.SMTP_PORT) === 465,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      // Serverless cold starts can hang on a silent SMTP socket.
      // Fail fast instead of burning the function timeout.
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });


    // ==========================================
    // 6. Send email
    // ==========================================

    await transporter.sendMail({

      // Sender
      from: `"Latitude Constructions" <${process.env.SMTP_USER}>`,

      // Receiver
      to: process.env.ADMIN_EMAIL,

      // When admin clicks Reply,
      // reply will go to the customer
      replyTo: email,

      // Email subject
      subject: `New Website Enquiry - ${name}`,

      // Email content
      html: `
        <!DOCTYPE html>

        <html>

        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>
            Latitude Constructions Enquiry
          </title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f5f7f5;
            font-family:Arial,Helvetica,sans-serif;
          "
        >

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              padding:40px 15px;
              background:#f5f7f5;
            "
          >

            <tr>

              <td align="center">

                <table
                  width="650"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    width:100%;
                    max-width:650px;
                    background:#ffffff;
                    border-radius:16px;
                    overflow:hidden;
                    box-shadow:
                      0 10px 40px
                      rgba(0,0,0,0.08);
                  "
                >

                  <!-- HEADER -->

                  <tr>

                    <td
                      style="
                        background:#041423;
                        padding:35px;
                        text-align:center;
                      "
                    >

                      <h1
                        style="
                          margin:0;
                          color:#7CEB1D;
                          font-size:30px;
                        "
                      >
                        Latitude Constructions
                      </h1>

                      <p
                        style="
                          margin:10px 0 0;
                          color:#d1d5db;
                          font-size:16px;
                        "
                      >
                        New Website Enquiry
                      </p>

                    </td>

                  </tr>


                  <!-- BODY -->

                  <tr>

                    <td
                      style="
                        padding:35px;
                      "
                    >

                      <h2
                        style="
                          margin:0 0 15px;
                          color:#041423;
                        "
                      >
                        New Contact Request
                      </h2>


                      <p
                        style="
                          color:#6b7280;
                          font-size:15px;
                          line-height:1.7;
                        "
                      >
                        A new customer has submitted
                        an enquiry through the
                        Latitude Constructions website.
                      </p>


                      <!-- CUSTOMER DETAILS -->

                      <table
                        width="100%"
                        cellpadding="12"
                        cellspacing="0"
                        style="
                          border-collapse:collapse;
                          margin-top:25px;
                        "
                      >

                        <!-- NAME -->

                        <tr
                          style="
                            background:#f8faf8;
                          "
                        >

                          <td
                            style="
                              width:170px;
                              font-weight:bold;
                              color:#374151;
                            "
                          >
                            Customer Name
                          </td>

                          <td
                            style="
                              color:#111827;
                            "
                          >
                            ${name}
                          </td>

                        </tr>


                        <!-- EMAIL -->

                        <tr>

                          <td
                            style="
                              font-weight:bold;
                              color:#374151;
                            "
                          >
                            Email
                          </td>

                          <td>

                            <a
                              href="mailto:${email}"
                              style="
                                color:#16a34a;
                                text-decoration:none;
                              "
                            >
                              ${email}
                            </a>

                          </td>

                        </tr>


                        <!-- PHONE -->

                        <tr
                          style="
                            background:#f8faf8;
                          "
                        >

                          <td
                            style="
                              font-weight:bold;
                              color:#374151;
                            "
                          >
                            Phone
                          </td>

                          <td>

                            <a
                              href="tel:${phone}"
                              style="
                                color:#16a34a;
                                text-decoration:none;
                              "
                            >
                              ${phone}
                            </a>

                          </td>

                        </tr>


                        <!-- MESSAGE -->

                        <tr>

                          <td
                            style="
                              font-weight:bold;
                              color:#374151;
                              vertical-align:top;
                            "
                          >
                            Message
                          </td>

                          <td
                            style="
                              color:#111827;
                              line-height:1.6;
                            "
                          >
                            ${message}
                          </td>

                        </tr>


                        <!-- DATE -->

                        <tr
                          style="
                            background:#f8faf8;
                          "
                        >

                          <td
                            style="
                              font-weight:bold;
                              color:#374151;
                            "
                          >
                            Date & Time
                          </td>

                          <td
                            style="
                              color:#111827;
                            "
                          >
                            ${new Date().toLocaleString(
                              "en-IN",
                              {
                                dateStyle: "full",
                                timeStyle: "short",
                              }
                            )}
                          </td>

                        </tr>

                      </table>


                      <!-- ACTION BOX -->

                      <div
                        style="
                          margin-top:30px;
                          padding:20px;
                          background:#f0fdf4;
                          border-left:
                            5px solid #7CEB1D;
                          border-radius:8px;
                        "
                      >

                        <h3
                          style="
                            margin:0 0 8px;
                            color:#166534;
                          "
                        >
                          New Lead Received
                        </h3>

                        <p
                          style="
                            margin:0;
                            color:#4b5563;
                            line-height:1.6;
                          "
                        >
                          Please contact the customer
                          regarding their farmhouse
                          construction enquiry.
                        </p>

                      </div>


                      <!-- CALL BUTTON -->

                      <div
                        style="
                          text-align:center;
                          margin-top:30px;
                        "
                      >

                        <a
                          href="tel:${phone}"
                          style="
                            display:inline-block;
                            background:#7CEB1D;
                            color:#041423;
                            text-decoration:none;
                            padding:14px 30px;
                            border-radius:30px;
                            font-weight:bold;
                          "
                        >
                          Call Customer
                        </a>

                      </div>

                    </td>

                  </tr>


                  <!-- FOOTER -->

                  <tr>

                    <td
                      style="
                        background:#041423;
                        padding:25px;
                        text-align:center;
                      "
                    >

                      <p
                        style="
                          margin:0;
                          color:#7CEB1D;
                          font-weight:bold;
                        "
                      >
                        Latitude Constructions
                      </p>

                      <p
                        style="
                          margin:8px 0 0;
                          color:#9ca3af;
                          font-size:13px;
                        "
                      >
                        Farmhouse Design & Construction
                      </p>

                      <p
                        style="
                          margin:15px 0 0;
                          color:#6b7280;
                          font-size:12px;
                        "
                      >
                        This email was automatically
                        generated from the website.
                      </p>

                    </td>

                  </tr>

                </table>

              </td>

            </tr>

          </table>

        </body>

        </html>
      `,
    });


    // ==========================================
    // 7. Success response
    // ==========================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Your enquiry has been submitted successfully.",
      },
      {
        status: 200,
      }
    );


  } catch (error) {

    // ==========================================
    // 8. Error handling
    // ==========================================

    console.error("Email Error:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });


    let errorMessage =
      "Unable to send your enquiry. Please try again later.";


    if (error.code === "EAUTH") {

      errorMessage =
        "Email authentication failed. Please check your Gmail App Password.";

    } else if (
      error.code === "ECONNECTION" ||
      error.code === "ESOCKET"
    ) {

      errorMessage =
        "Unable to connect to the email server.";

    }


    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}