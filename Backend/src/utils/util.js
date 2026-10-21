const generateOtp = () =>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const getOtpHtml = (otp) => {
    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @media only screen and (max-width: 600px) {
            .email-shell {
                padding: 24px 12px !important;
            }
            .email-card {
                padding: 28px 20px !important;
            }
            .otp-code {
                font-size: 28px !important;
                letter-spacing: 8px !important;
            }
        }
    </style>
</head>
<body style="margin:0; padding:0; background-color:#f3f7f4; font-family:Arial, Helvetica, sans-serif; color:#18251d;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
        Your NotesApp email verification code is ${otp}.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f7f4;">
        <tr>
            <td class="email-shell" align="center" style="padding:48px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
                    <tr>
                        <td align="center" style="padding:0 0 22px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td valign="middle" style="width:36px; height:36px; border-radius:10px; background-color:#16a34a; color:#ffffff; font-size:19px; font-weight:bold; text-align:center; line-height:36px;">N</td>
                                    <td valign="middle" style="padding-left:10px; color:#183324; font-size:21px; font-weight:bold; letter-spacing:-0.5px;">NotesApp</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-card" style="padding:40px; border:1px solid #e2ebe4; border-radius:18px; background-color:#ffffff; box-shadow:0 8px 28px rgba(27,72,43,0.08);">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" style="padding:0 0 12px; color:#15803d; font-size:12px; font-weight:bold; letter-spacing:1.6px; text-transform:uppercase;">Email verification</td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding:0 0 12px; color:#183324; font-size:28px; line-height:1.25; font-weight:bold;">One quick step</td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding:0 0 28px; color:#5d6b61; font-size:15px; line-height:1.65;">Use the verification code below to confirm your email address and get started with NotesApp.</td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding:0 0 24px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td class="otp-code" align="center" style="padding:16px 22px 16px 30px; border:1px solid #ccebd5; border-radius:12px; background-color:#f0faf2; color:#15803d; font-family:'Courier New', monospace; font-size:32px; line-height:1.2; font-weight:bold; letter-spacing:10px;">${otp}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding:0 0 24px; color:#5d6b61; font-size:14px; line-height:1.6;">Enter this code in the verification screen to continue.</td>
                                </tr>
                                <tr>
                                    <td style="padding:20px 0 0; border-top:1px solid #edf1ee; color:#79867d; font-size:12px; line-height:1.6;">If you didn’t request this code, you can safely ignore this email. For your security, don’t share your verification code with anyone.</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:20px 12px 0; color:#89958d; font-size:12px; line-height:1.5;">Sent by NotesApp · Your ideas, organized.</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

module.exports = { generateOtp, getOtpHtml }